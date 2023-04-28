import { useContext } from 'react';

import { MoviesContext } from '@/context/MyMoviesProvider';

const useMyMovies = () => {
  const { myMovies, fetchMyMovies } = useContext(MoviesContext);

  return { myMovies, fetchMyMovies };
};

export default useMyMovies;
