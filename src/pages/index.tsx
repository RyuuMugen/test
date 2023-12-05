
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Headers from './components/Header/Header';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Headers />
    </QueryClientProvider>
  );
}

