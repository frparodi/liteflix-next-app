import { FunctionComponent, useState } from 'react';

import useMedia from '@/hooks/useMedia';
import useMyMovies from '@/hooks/useMyMovies';

import { Movie } from '@/types/movies';

import { MY_MOVIES, POPULAR_MOVIES, WATCH } from '@/constants/strings';

import Dropdown from '@/components/UI/Dropdown';
import MovieCard from '@/components/MovieCard';

import styles from './MoviesList.module.scss';

const DROPDOWN_OPTIONS = [
  { label: POPULAR_MOVIES, value: 'popularMovies' },
  { label: MY_MOVIES, value: 'myMovies' },
];

interface MoviesListProps {
  popularMovies: Movie[];
}

const MoviesList: FunctionComponent<MoviesListProps> = ({ popularMovies }) => {
  const [moviesToShow, setMoviesToShow] = useState<
    'popularMovies' | 'myMovies'
  >('popularMovies');

  const isDesktop = useMedia('desktop');

  const { myMovies } = useMyMovies();

  const renderMoviesCards = (moviesList: Movie[]) =>
    moviesList.map((movie: Movie) => (
      <MovieCard
        key={movie.name}
        name={movie.name}
        image={movie.backdropImage}
      />
    ));

  const placeholder = (
    <div>
      <span>{`${WATCH}: `}</span>
      <span>
        <strong>
          {
            DROPDOWN_OPTIONS.find((option) => option.value === moviesToShow)
              ?.label
          }
        </strong>
      </span>
    </div>
  );

  return (
    <div className={`${styles.container} ${isDesktop ? styles.desktop : ''}`}>
      <Dropdown
        type={isDesktop ? 'floating' : 'drawer'}
        placeholder={placeholder}
        options={DROPDOWN_OPTIONS}
        value={moviesToShow}
        onChange={(value: 'popularMovies' | 'myMovies') => {
          setMoviesToShow(value);
        }}
      />
      <div className={styles.list}>
        {moviesToShow === 'popularMovies' && renderMoviesCards(popularMovies)}
        {moviesToShow === 'myMovies' && renderMoviesCards(myMovies)}
      </div>
    </div>
  );
};

export default MoviesList;
