import { FunctionComponent } from 'react';
import Head from 'next/head';
import bebasFont from 'next/font/local';

import useMedia from '@/hooks/useMedia';

import { Movie } from '@/types/movies';

import { fetchMovies } from '@/helpers/moviesHelper';

import { APP_DESCRIPTION, APP_TITLE } from '@/constants/strings';

import Background from '@/components/Background';
import MovieCard from '@/components/MovieCard';
import Navbar from '@/components/Navbar';
import FeaturedMovie from '@/components/FeaturedMovie';

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
        className={`${styles['app-wrapper']} ${bebas.className} ${
          isDesktop ? styles.desktop : ''
        }`}
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
            {popularMovies.map((movie: Movie) => (
              <MovieCard key={movie.name} movie={movie} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const featuredMovie: Movie[] = await fetchMovies('featured', 1);
  const popularMovies: Movie[] = await fetchMovies('popular', 4);
  return {
    props: {
      featuredMovie: featuredMovie[0],
      popularMovies,
    },
  };
}
