import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthContext from '@/context/context-auth';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContext.Provider value={{ updateTaskId: false }}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
