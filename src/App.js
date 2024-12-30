

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import Form from './Form';
import NetworkSync from './NetworkSync';
import Form1 from './Form1';
import Form2 from './Form2';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Offline Form Handling with Sync</h1>
        <Form1 />
        <Form2 />
        <NetworkSync />
      </div>
    </QueryClientProvider>
  );
}

export default App;
