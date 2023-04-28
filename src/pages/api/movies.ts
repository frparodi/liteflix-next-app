import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { postMovie } from '@/helpers/moviesHelper';

interface ExtendedRequest {
  file: any;
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

const accessKeyId = process.env.AWS_KEY;
const secretAccessKey = process.env.AWS_SECRET;
const region = process.env.AWS_REGION;
const Bucket = process.env.AWS_S3_BUCKET_NAME;

const s3Config = {
  accessKeyId,
  secretAccessKey,
  region,
};
const s3Client = new S3Client(s3Config);

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _, res) => {
    res.status(500).end(err.toString());
  },
})
  .use(upload.single('image'))
  .post<ExtendedRequest>(async (req, res) => {
    const image = req.file;
    const { description } = req.body;
    const imageName = description.split('.')[0];

    const bucketParams = {
      Bucket,
      Key: imageName,
      Body: image.buffer,
    };

    try {
      const s3Response = await s3Client.send(
        new PutObjectCommand(bucketParams)
      );
      const imageUrl = `https://${Bucket}.s3.${region}.amazonaws.com/${imageName}`;
      postMovie(imageName, imageUrl);
      res.status(201).json({ data: s3Response });
    } catch (error) {
      res.status(500).end(error);
    }
  });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
