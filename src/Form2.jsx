import React, { useState } from 'react';
import { useMutation } from 'react-query';

const submitForm2 = async (formData) => {
  let offlineData = JSON.parse(localStorage.getItem('formData2')) || [];
  offlineData.push(formData);
  localStorage.setItem('formData2', JSON.stringify(offlineData));
  return { message: 'Form2 data saved offline' };
};

const Form2 = () => {
  const [formData, setFormData] = useState({ address: '', phone: '' });

  const { mutate } = useMutation(submitForm2, {
    onError: (error) => {
      console.log('Error saving Form2 data to localStorage:', error);
    },
    onSuccess: async () => {
      try {
        let offlineData = JSON.parse(localStorage.getItem('formData2')) || [];
        if (offlineData.length > 0) {
          console.log('Syncing offline Form2 data to API 2...');
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(offlineData),
          });

          if (response.ok) {
            localStorage.removeItem('formData2');
            console.log('Successfully synced Form2 data to API 2');
          }
        }
      } catch (error) {
        console.log('Error syncing offline Form2 data:', error);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      address: e.target.address.value,
      phone: e.target.phone.value,
    };

    setFormData(formData);
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Form 2</h2>
      <input type="text" name="address" placeholder="Address" required />
      <input type="text" name="phone" placeholder="Phone" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form2;
