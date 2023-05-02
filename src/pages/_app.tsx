import type { AppProps } from 'next/app';

import MyMoviesProvider from '@/context/MyMoviesContext';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyMoviesProvider>
      <Component {...pageProps} />
    </MyMoviesProvider>
  );
}
