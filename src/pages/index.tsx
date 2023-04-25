import Head from 'next/head';
import bebasFont from 'next/font/local';

import { APP_DESCRIPTION, APP_TITLE } from '@/constants/strings';

import Navbar from '@/components/Navbar';

import styles from './Home.module.scss';

const bebas = bebasFont({
  src: [
    { path: './BebasNeueBook.woff2', weight: '400', style: 'normal' },
    { path: './BebasNeueBold.woff2', weight: '700', style: 'normal' },
  ],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
        <meta name='description' content={APP_DESCRIPTION} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${styles.container} ${bebas.className}`}>
        <Navbar />
      </main>
    </>
  );
}
