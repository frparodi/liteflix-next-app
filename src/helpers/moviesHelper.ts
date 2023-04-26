import { MongoClient } from 'mongodb';

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
    name: movie.title,
    posterImage: `${process.env.IMAGES_URL}${movie.poster_path}`,
    backdropImage: `${process.env.IMAGES_URL}${movie.backdrop_path}`,
  }));
  return formattedMovies;
};

export const fetchMyMovies = async () => {
  const dbUser = process.env.MONGO_DB_USER;
  const dbPassword = process.env.MONGO_DB_PASSWORD;
  const dbUrl = process.env.MONGO_DB_URL;
  const dbName = process.env.MONGO_DB_DATABASE;
  const dbCollection = process.env.MONGO_DB_COLLECTION || '';
  const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbUrl}/?retryWrites=true&w=majority`;

  let movies: Movie[] = [];

  const client = new MongoClient(uri);
  try {
    const database = client.db(dbName);
    const moviesCollection = database.collection(dbCollection);
    const rawMovies = await moviesCollection.find().toArray();
    movies = rawMovies.map((movie) => ({
      name: movie.name,
      posterImage: movie.imageUrl,
      backdropImage: movie.imageUrl,
    }));
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
  return movies;
};
