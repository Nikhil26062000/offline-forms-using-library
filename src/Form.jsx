import React, { useState } from 'react';
import { useMutation } from 'react-query';
import localforage from 'localforage';

const submitForm = async (formData) => {
  // Retrieve existing form submissions from localforage
  let offlineData = (await localforage.getItem('formData')) || [];

  // Add the new formData to the offline data
  offlineData.push(formData);

  // Save the updated offline data back to localforage
  await localforage.setItem('formData', offlineData);
  alert('Huraah...! Data saved to localforage');

  return { message: "Form data saved to localforage" };
};

const Form = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const { mutate } = useMutation(submitForm, {
    onError: async (error) => {
      console.log('Error saving data to localforage:', error);
      alert('Error saving data to localforage:', error);
      // Handle error by saving data to localforage
      let offlineData = (await localforage.getItem('formData')) || [];
      offlineData.push(formData); // Push the latest formData
      await localforage.setItem('formData', offlineData);
    },
    onSuccess: async () => {
      // Try to sync all offline data when online
      try {
        let offlineData = (await localforage.getItem('formData')) || [];

        if (offlineData.length > 0) {
          console.log('Syncing offline data to the server:', offlineData);
          alert('Syncing offline data to the server:', offlineData);

          // Sync all offline data to the server at once (batch request)
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(offlineData),
          });

          if (response.ok) {
            // If the sync is successful, clear the offline data from localforage
            await localforage.removeItem('formData');
            console.log('All offline data synced to server');
            alert('All offline data synced to server');
            alert('so now Deleting data from localforage');
            

          } else {
            console.log('Failed to sync data to server');
            alert('Failed to sync data to server');
          }
        }
      } catch (error) {
        console.log('Error syncing offline data:', error);
        alert('Error syncing offline data:', error);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
    };

    // Update local state
    setFormData(formData);

    // Submit the form data
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
