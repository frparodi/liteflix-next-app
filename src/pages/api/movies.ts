import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { getMyMoviesFromDB, saveMyMovieToDB } from '@/server/db';

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _, res) => {
    res.status(500).end(err.toString());
  },
});

handler.get(async (_, res) => {
  try {
    const myMovies = await getMyMoviesFromDB();
    res.status(200).json({ data: myMovies });
  } catch (error) {
    res.status(500).json({ error });
  }
});

handler.post(async (req, res) => {
  const { movieName, movieImageUrl } = JSON.parse(req.body);
  if (movieName !== '' && movieImageUrl !== '') {
    try {
      const result = await saveMyMovieToDB(movieName, movieImageUrl);
      if (result) {
        res.status(201).json({ data: 'Movie successfully uploaded!' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  } else {
    res
      .status(400)
      .json({ error: '"movieName" and "movieImageUrl" are required' });
  }
});

export default handler;
