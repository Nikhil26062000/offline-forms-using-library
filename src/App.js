

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Form from './Form';
import NetworkSync from './NetworkSync';
import NewForm from './NewForm';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Offline Form Handling with Sync</h1>
        <Form />
        <NewForm/>
        <NetworkSync />
      </div>
    </QueryClientProvider>
  );
}

export default App;
