import React, { useState } from 'react';
import { useMutation } from 'react-query';

const submitForm1 = async (formData) => {
  let offlineData = JSON.parse(localStorage.getItem('formData')) || [];
  offlineData.push(formData);
  localStorage.setItem('formData', JSON.stringify(offlineData));
  return { message: 'Form1 data saved offline' };
};

const Form1 = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const { mutate } = useMutation(submitForm1, {
    onError: (error) => {
      console.log('Error saving data to localStorage:', error);
    },
    onSuccess: async () => {
      try {
        let offlineData = JSON.parse(localStorage.getItem('formData')) || [];
        if (offlineData.length > 0) {
          console.log('Syncing offline Form1 data to API 1...');
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(offlineData),
          });

          if (response.ok) {
            localStorage.removeItem('formData');
            console.log('Successfully synced Form1 data to API 1');
          }
        }
      } catch (error) {
        console.log('Error syncing offline data:', error);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
    };

    setFormData(formData);
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Form 1</h2>
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form1;
