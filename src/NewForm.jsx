import React, { useState } from 'react';
import { useMutation } from 'react-query';
import localforage from 'localforage';

const submitNewForm = async (formData) => {
  // Retrieve existing submissions for the new form from LocalForage
  let offlineData = (await localforage.getItem('newFormData')) || [];

  // Add the new formData to the offline data
  offlineData.push(formData);

  // Save the updated data back to LocalForage
  await localforage.setItem('newFormData', offlineData);
  alert('Hurra..! New form data saved to localforage');

  return { message: "New form data saved to localforage" };
};

const NewForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });

  const { mutate } = useMutation(submitNewForm, {
    onError: async (error) => {
      console.log('Error saving new form data to localforage:', error);
      alert('Error saving new form data to localforage:', error);
      // Handle error by saving data to LocalForage
      let offlineData = (await localforage.getItem('newFormData')) || [];
      offlineData.push(formData);
      await localforage.setItem('newFormData', offlineData);
    },
    onSuccess: async () => {
      // Attempt to sync all offline data when online
      try {
        let offlineData = (await localforage.getItem('newFormData')) || [];

        if (offlineData.length > 0) {
          console.log('Syncing new form offline data to the server:', offlineData);
          alert('Syncing new form offline data to the server:', offlineData);

          // Sync all offline data to the server in a batch
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(offlineData),
          });

          if (response.ok) {
            // If sync is successful, clear the offline data
            await localforage.removeItem('newFormData');
            console.log('New form data synced successfully');
            alert('New form data synced successfully');
            alert('so New form data deleting from local forage');
          } else {
            console.log('Failed to sync new form data');
            alert('Failed to sync new form data');
          }
        }
      } catch (error) {
        console.log('Error syncing new form offline data:', error);
        alert('Error syncing new form offline data:', error);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
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
        name="title"
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        required
      ></textarea>
      <button type="submit">Submit New Form</button>
    </form>
  );
};

export default NewForm;
