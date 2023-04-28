import {
  ReactElement,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import { Movie } from '@/types/movies';

export const MoviesContext = createContext<{
  myMovies: Movie[];
  fetchMyMovies: () => void;
}>({ myMovies: [], fetchMyMovies: () => {} });

const MyMoviesProvider = ({ children }: { children: ReactElement }) => {
  const [myMovies, setMyMovies] = useState<Movie[]>([]);

  const fetchMyMovies = useCallback(async () => {
    const response: any = await fetch('/api/movies');
    const movies = await response.json();
    setMyMovies(movies.data);
  }, []);

  useEffect(() => {
    fetchMyMovies();
  }, [fetchMyMovies]);

  return (
    <MoviesContext.Provider value={{ myMovies, fetchMyMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MyMoviesProvider;
