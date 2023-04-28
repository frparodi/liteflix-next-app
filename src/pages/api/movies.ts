import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { getMyMoviesFromDB, saveMyMovieToDB } from '@/server/db';

interface ExtendedRequest {
  file: any;
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

const accessKeyId = process.env.AWS_KEY;
const secretAccessKey = process.env.AWS_SECRET;
const region = process.env.AWS_REGION;
const Bucket = process.env.AWS_S3_BUCKET_NAME;
console.log(accessKeyId);
console.log(secretAccessKey);
console.log(region);
console.log(Bucket);

const s3Config = {
  accessKeyId,
  secretAccessKey,
  region,
};
const s3Client = new S3Client(s3Config);
console.log(s3Client);
const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _, res) => {
    res.status(500).end(err.toString());
  },
});

handler.use(upload.single('image'));

handler.get(async (_, res) => {
  try {
    const myMovies = await getMyMoviesFromDB();
    res.status(200).json({ data: myMovies });
  } catch (error) {
    res.status(500).json({ error });
  }
});

handler.post<ExtendedRequest>(async (req, res) => {
  const image = req.file;
  const { description } = req.body;
  const imageName = description.split('.')[0];

  const bucketParams = {
    Bucket,
    Key: imageName,
    Body: image.buffer,
  };

  try {
    console.log('Por enviar a S3...');
    console.log('S3 Config');
    console.log(s3Config);
    console.log('Bucket params');
    console.log(bucketParams);
    const s3Response = await s3Client.send(new PutObjectCommand(bucketParams));
    console.log(s3Response);
    console.log('--------------------');
    if (s3Response) {
      const imageUrl = `https://${Bucket}.s3.${region}.amazonaws.com/${imageName}`;
      console.log(`imageUrl: ${imageUrl}`);
      console.log('--------------------');
      const result = await saveMyMovieToDB(imageName, imageUrl);
      console.log(result);
      console.log('--------------------');
      if (result) {
        res.status(201).json({ data: 'Movie successfully uploaded!' });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
