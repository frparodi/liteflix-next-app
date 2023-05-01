import { FunctionComponent, useState } from 'react';
import c from 'classnames';

import useMedia from '@/hooks/useMedia';
import useMyMovies from '@/hooks/useMyMovies';

import { Movie } from '@/types/movies';

import { MY_MOVIES, POPULAR_MOVIES, WATCH } from '@/constants/strings';

import { Device } from '@/types/devices';

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

  const [activeMovieIndex, setActiveMovieIndex] = useState(-1);

  const isDesktop = useMedia(Device.DESKTOP);

  const { myMovies } = useMyMovies();

  const handleChangeMoviesList = (value: 'popularMovies' | 'myMovies') => {
    setActiveMovieIndex(-1);
    setMoviesToShow(value);
  };

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
    <div className={c(styles.container, isDesktop && styles.desktop)}>
      <Dropdown
        type={isDesktop ? 'floating' : 'drawer'}
        placeholder={placeholder}
        options={DROPDOWN_OPTIONS}
        value={moviesToShow}
        onChange={handleChangeMoviesList}
      />
      <div className={styles.list}>
        {moviesToShow === 'popularMovies' &&
          popularMovies.map((movie: Movie, index: number) => (
            <MovieCard
              key={movie.id}
              name={movie.name}
              image={movie.backdropImage}
              isActive={activeMovieIndex === index}
              setActiveMovieIndex={() => {
                setActiveMovieIndex(index);
              }}
              score={movie.score}
              year={movie.year}
            />
          ))}
        {moviesToShow === 'myMovies' &&
          myMovies.map((movie: Movie, index: number) => (
            <MovieCard
              key={movie.id}
              name={movie.name}
              image={movie.backdropImage}
              isActive={activeMovieIndex === index}
              setActiveMovieIndex={() => {
                setActiveMovieIndex(index);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default MoviesList;
