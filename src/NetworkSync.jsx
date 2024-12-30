import React, { useEffect } from 'react';

const NetworkSync = () => {
  useEffect(() => {
    const syncOfflineData = async () => {
      // Check if there's any offline data in localStorage
      const offlineData = JSON.parse(localStorage.getItem('formData')) || [];

      if (offlineData.length > 0) {
        console.log('App is online, syncing offline data...');

        try {
          // Sync all offline data to the server (batch request)
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(offlineData),
          });

          if (response.ok) {
            // If the sync is successful, clear the offline data from localStorage
            localStorage.removeItem('formData');
            console.log('Successfully synced all offline data to the server');
          } else {
            console.log('Failed to sync offline data');
          }
        } catch (error) {
          console.log('Error during sync:', error);
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
