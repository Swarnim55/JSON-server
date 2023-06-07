import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthContext from '@/context/context-auth';
import { useContext, useState } from 'react';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [updateTaskId, setUpdateTaskID] = useState(0);
  return (
    <AuthContext.Provider value={{ updateTaskId, setUpdateTaskID }}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
