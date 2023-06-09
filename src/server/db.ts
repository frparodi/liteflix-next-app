import { MongoClient } from 'mongodb';

import { Movie } from '@/types/movies';

const dbUser = process.env.MONGO_DB_USER;
const dbPassword = process.env.MONGO_DB_PASSWORD;
const dbUrl = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB_DATABASE;
const dbCollection = process.env.MONGO_DB_COLLECTION || '';
const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbUrl}/?retryWrites=true&w=majority`;

export const getMyMoviesFromDB = async () => {
  let movies: Movie[] = [];

  const client = new MongoClient(uri);
  try {
    const database = client.db(dbName);
    const moviesCollection = database.collection(dbCollection);
    const rawMovies = await moviesCollection.find().toArray();
    movies = rawMovies.map((movie) => ({
      id: movie._id.toString(),
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

export const saveMyMovieToDB = async (name: string, imageUrl: string) => {
  const client = new MongoClient(uri);
  let result;
  try {
    const database = client.db(dbName);
    const moviesCollection = database.collection(dbCollection);
    result = await moviesCollection.insertOne({ name, imageUrl });
  } catch (err) {
    result = err;
    console.log(err);
  } finally {
    await client.close();
  }
  return result;
};
