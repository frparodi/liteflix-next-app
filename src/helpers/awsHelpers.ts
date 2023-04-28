import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const accessKeyId = process.env.NEXT_PUBLIC_AWS_KEY;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET;
const region = process.env.NEXT_PUBLIC_AWS_REGION;
const Bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

const creds = {
  accessKeyId: accessKeyId || '',
  secretAccessKey: secretAccessKey || '',
};

const s3Client = new S3Client({
  region,
  credentials: creds,
});

export const uploadToS3 = async (fileName: string, file: any) => {
  const bucketParams = {
    Bucket,
    Key: fileName,
    Body: file,
  };

  try {
    const s3Response = await s3Client.send(new PutObjectCommand(bucketParams));
    if (s3Response) {
      const imageUrl = `https://${Bucket}.s3.${region}.amazonaws.com/${fileName}`;
      return { status: 'ok', data: { imageUrl } };
    } else {
      return { status: 'Error', error: 'Unknown' };
    }
  } catch (error) {
    return { status: 'Error', error };
  }
};
