

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Form from './Form';
import NetworkSync from './NetworkSync';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Offline Form Handling with Sync</h1>
        <Form />
        <NetworkSync />
      </div>
    </QueryClientProvider>
  );
}

export default App;
