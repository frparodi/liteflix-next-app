import { Movie } from '@/types/movies';

export const fetchLiteflixMovies = async (
  type: 'featured' | 'popular',
  quantity: number
) => {
  const endpoint = type === 'featured' ? 'now_playing' : 'popular';
  const index = Math.floor(Math.random() * 10);

  const res = await fetch(
    `${process.env.MOVIES_API}/${endpoint}?api_key=${process.env.API_KEY}`
  );
  const movies = await res.json();
  const rawMoviesList = movies.results;
  const reducedMoviesList: Movie[] = rawMoviesList.slice(
    index,
    index + quantity
  );
  const formattedMovies = reducedMoviesList.map((movie: any) => ({
    id: movie.id,
    name: movie.title,
    posterImage: `${process.env.IMAGES_URL}${movie.poster_path}`,
    backdropImage: `${process.env.IMAGES_URL}${movie.backdrop_path}`,
    score: movie.vote_average,
    year: movie.release_date && movie.release_date.split('-')[0],
  }));
  return formattedMovies;
};
