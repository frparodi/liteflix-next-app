import { FunctionComponent, useContext, useEffect, useState } from 'react';
import c from 'classnames';
import Head from 'next/head';
import bebasFont from 'next/font/local';

import { fetchLiteflixMovies } from '@/server/externalApis';

import { MoviesContext } from '@/context/MyMoviesContext';

import useMedia from '@/hooks/useMedia';

import { Movie } from '@/types/movies';

import { APP_DESCRIPTION, APP_TITLE } from '@/constants/strings';

import { Device } from '@/types/devices';

import Cover from '@/components/UI/Cover';
import Modal from '@/components/UI/Modal';

import Background from '@/components/Background';
import Navbar from '@/components/Navbar';
import FeaturedMovie from '@/components/FeaturedMovie';
import MoviesList from '@/components/MoviesList';
import AddMovieFlow from '@/components/AddMovieFlow';

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

  const [showNavbar, setShowNavbar] = useState(false);
  const [showFeaturedMovie, setShowFeaturedMovie] = useState(false);
  const [showMoviesList, setShowMoviesList] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fetchMyMovies } = useContext(MoviesContext);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowNavbar(true);
      setTimeout(() => {
        setShowFeaturedMovie(true);
        setTimeout(() => {
          setShowMoviesList(true);
        }, 1000);
      }, 1000);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      fetchMyMovies();
    }
  }, [isModalOpen, fetchMyMovies]);

  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
        <meta name='description' content={APP_DESCRIPTION} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        id='app-wrapper'
        className={c(
          styles['app-wrapper'],
          bebas.className,
          isDesktop && styles.desktop
        )}
      >
        <Cover />
        <Background
          backdropImage={featuredMovie.backdropImage}
          posterImage={featuredMovie.posterImage}
        />
        <Navbar showNavbar={showNavbar} openModal={openModal} />
        <div className={styles['main-content']}>
          <div
            className={c(
              styles['featured-movie-wrapper'],
              showFeaturedMovie && styles.show
            )}
          >
            <FeaturedMovie movie={featuredMovie} />
          </div>
          <div
            className={c(
              styles['movies-list-wrapper'],
              showMoviesList && styles.show
            )}
          >
            <MoviesList popularMovies={popularMovies} />
          </div>
        </div>
        <Modal show={isModalOpen} onClose={closeModal}>
          <AddMovieFlow closeModal={closeModal} />
        </Modal>
      </main>
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
