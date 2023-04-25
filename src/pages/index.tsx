import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Liteflix - The best place to watch movies online</title>
        <meta
          name='description'
          content='With Liteflix, you have access to a wide variety of movies online. From the latest releases to timeless classics, we have everything you need to enjoy a movie night from the comfort of your own home'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1>Liteflix</h1>
      </main>
    </>
  );
}
