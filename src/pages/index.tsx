import { FunctionComponent } from 'react';
import c from 'classnames';
import Head from 'next/head';
import bebasFont from 'next/font/local';

import { fetchLiteflixMovies } from '@/server/externalApis';

import MyMoviesProvider from '@/context/MyMoviesProvider';

import useMedia from '@/hooks/useMedia';

import { Movie } from '@/types/movies';

import { APP_DESCRIPTION, APP_TITLE } from '@/constants/strings';

import { Device } from '@/types/devices';

import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import FeaturedMovie from '@/components/FeaturedMovie';
import MoviesList from '@/components/MoviesList';

import styles from './Home.module.scss';

const bebas = bebasFont({
  src: [
    { path: './BebasNeueBook.woff2', weight: '400', style: 'normal' },
    { path: './BebasNeueBold.woff2', weight: '700', style: 'normal' },
  ],
});

interface HomeProps {
  featuredMovie: Movie;
  popularMovies: Movie[];
}

const Home: FunctionComponent<HomeProps> = ({
  featuredMovie,
  popularMovies,
}) => {
  const isDesktop = useMedia(Device.DESKTOP);

  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
        <meta name='description' content={APP_DESCRIPTION} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MyMoviesProvider>
        <main
          id='app-wrapper'
          className={c(
            styles['app-wrapper'],
            bebas.className,
            isDesktop && styles.desktop
          )}
        >
          <Background
            backdropImage={featuredMovie.backdropImage}
            posterImage={featuredMovie.posterImage}
          />
          <Navbar />
          <div className={styles['main-content']}>
            <div className={styles['featured-movie-wrapper']}>
              <FeaturedMovie movie={featuredMovie} />
            </div>
            <div className={styles['movies-list-wrapper']}>
              <MoviesList popularMovies={popularMovies} />
            </div>
          </div>
        </main>
      </MyMoviesProvider>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const featuredMovie: Movie[] = await fetchLiteflixMovies('featured', 1);
  const popularMovies: Movie[] = await fetchLiteflixMovies('popular', 4);
  return {
    props: {
      featuredMovie: featuredMovie[0],
      popularMovies,
    },
  };
}
