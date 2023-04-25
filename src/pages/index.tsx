import Head from 'next/head';
import bebasFont from 'next/font/local';

import useMedia from '@/hooks/useMedia';

import { APP_DESCRIPTION, APP_TITLE } from '@/constants/strings';

import Navbar from '@/components/Navbar';
import FeaturedMovie from '@/components/FeaturedMovie';

import styles from './Home.module.scss';

const bebas = bebasFont({
  src: [
    { path: './BebasNeueBook.woff2', weight: '400', style: 'normal' },
    { path: './BebasNeueBold.woff2', weight: '700', style: 'normal' },
  ],
});

export default function Home() {
  const isDesktop = useMedia('desktop');
  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
        <meta name='description' content={APP_DESCRIPTION} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        className={`${styles.container} ${bebas.className} ${
          isDesktop ? styles.desktop : ''
        }`}
      >
        <Navbar />
        <div className={styles['main-content']}>
          <div className={styles['featured-movie-wrapper']}>
            <FeaturedMovie />
          </div>
          <div className={styles['movies-list-wrapper']}>
            {/* REPLACE WITH REAL MOVIES */}
            <div className={styles.movie}></div>
            <div className={styles.movie}></div>
            <div className={styles.movie}></div>
            <div className={styles.movie}></div>
          </div>
        </div>
      </main>
    </>
  );
}
