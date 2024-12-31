// import React, { useEffect } from 'react';
// import localforage from 'localforage';

// const NetworkSync = () => {
//   useEffect(() => {
//     const syncOfflineData = async () => {
//       // Check if there's any offline data in localforage
//       const offlineData = (await localforage.getItem('formData')) || [];

//       if (offlineData.length > 0) {
//         console.log('App is online, syncing offline data...');

//         try {
//           // Sync all offline data to the server (batch request)
//           const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(offlineData),
//           });

//           if (response.ok) {
//             // If the sync is successful, clear the offline data from localforage
//             await localforage.removeItem('formData');
//             console.log('Successfully synced all offline data to the server');
//           } else {
//             console.log('Failed to sync offline data');
//           }
//         } catch (error) {
//           console.log('Error during sync:', error);
//         }
//       }
//     };

//     window.addEventListener('online', syncOfflineData);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener('online', syncOfflineData);
//     };
//   }, []);

//   return null; // This component doesn't render anything
// };

// export default NetworkSync;











// import React, { useEffect } from 'react';
// import localforage from 'localforage';

// const NetworkSync = () => {
//   const syncOfflineData = async () => {
//     try {
//       // Check for unsynced data in LocalForage
//       const offlineData = (await localforage.getItem('formData')) || [];

//       if (offlineData.length > 0) {
//         console.log('Found unsynced data. Attempting to sync:', offlineData);

//         // Attempt to sync data to the server
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(offlineData), // Send all unsynced data in a batch
//         });

//         if (response.ok) {
//           console.log('Successfully synced all data to the server');
//           // Clear synced data from LocalForage
//           await localforage.removeItem('formData');
//         } else {
//           console.log('Failed to sync data to server. Will retry later.');
//         }
//       } else {
//         console.log('No unsynced data found.');
//       }
//     } catch (error) {
//       console.error('Error during sync:', error);
//     }
//   };

//   useEffect(() => {
//     // Check for offline data when the app starts
//     syncOfflineData();

//     // Sync data when the internet connection is restored
//     window.addEventListener('online', syncOfflineData);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener('online', syncOfflineData);
//     };
//   }, []);

//   return null; // This component does not render anything
// };

// export default NetworkSync;










import React, { useEffect } from 'react';
import localforage from 'localforage';

const syncDataFromKey = async (key) => {
  try {
    // Check for unsynced data in LocalForage for the given key
    const offlineData = (await localforage.getItem(key)) || [];

    if (offlineData.length > 0) {
      console.log(`Found unsynced data for ${key}. Attempting to sync:`, offlineData);
      alert(`Found unsynced data for ${key}. Attempting to sync:`);
      alert(JSON.stringify(offlineData,null,2))

      // Attempt to sync data to the server
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(offlineData), // Send all unsynced data in a batch
      });

      if (response.ok) {
        console.log(`Successfully synced all data for ${key} to the server`);
        alert(`Successfully synced all data for ${key} to the server`);
        // Clear synced data from LocalForage
        await localforage.removeItem(key);
        alert(`Successfully synced all data for ${key} to the server and cleared from local forage.`);
      } else {
        console.log(`Failed to sync data for ${key} to server. Will retry later.`);
        alert(`Failed to sync data for ${key} to server. Will retry later.`);
      }
    } else {
      console.log(`No unsynced data found for ${key}.`);
      alert(`No unsynced data found for ${key}.`);
    }
  } catch (error) {
    console.error(`Error during sync for ${key}:`, error);
    alert(`Error during sync for ${key}:`, error);
  }
};

const NetworkSync = () => {
  const syncAllOfflineData = async () => {
    // Sync data for both forms
    await syncDataFromKey('formData'); // Sync data for the first form
    await syncDataFromKey('newFormData'); // Sync data for the second form
  };

  useEffect(() => {
    // Check for offline data when the app starts
    syncAllOfflineData();

    // Sync data when the internet connection is restored
    window.addEventListener('online', syncAllOfflineData);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('online', syncAllOfflineData);
    };
  }, []);

  return null; // This component does not render anything
};

export default NetworkSync;
