import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PRCommandCenter from './components/PRCommandCenter';
import './styles/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark">
        <PRCommandCenter />
      </div>
    </QueryClientProvider>
  );
}

export default App;
