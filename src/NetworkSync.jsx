import React, { useEffect } from 'react';

const NetworkSync = () => {
  useEffect(() => {
    const syncOfflineData = async () => {
      // Get offline data for Form 1 and Form 2
      const form1OfflineData = JSON.parse(localStorage.getItem('formData')) || [];
      const form2OfflineData = JSON.parse(localStorage.getItem('formData2')) || [];

      if (form1OfflineData.length > 0) {
        console.log('Syncing Form 1 offline data to API 1...');
        try {
          // Sync Form 1 data to API 1
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form1OfflineData),
          });

          if (response.ok) {
            localStorage.removeItem('formData');
            console.log('Form 1 data synced to API 1');
          } else {
            console.log('Failed to sync Form 1 data to API 1');
          }
        } catch (error) {
          console.log('Error syncing Form 1 offline data:', error);
        }
      }

      if (form2OfflineData.length > 0) {
        console.log('Syncing Form 2 offline data to API 2...');
        try {
          // Sync Form 2 data to API 2
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form2OfflineData),
          });

          if (response.ok) {
            localStorage.removeItem('formData2');
            console.log('Form 2 data synced to API 2');
          } else {
            console.log('Failed to sync Form 2 data to API 2');
          }
        } catch (error) {
          console.log('Error syncing Form 2 offline data:', error);
        }
      }
    };

    window.addEventListener('online', syncOfflineData);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('online', syncOfflineData);
    };
  }, []);

  return null;  // This component doesn't render anything
};

export default NetworkSync;
