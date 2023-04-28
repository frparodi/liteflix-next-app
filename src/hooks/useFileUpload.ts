import { useEffect, useState } from 'react';

import { uploadToS3 } from '@/helpers/awsHelpers';

export enum UploadStatusEnum {
  WAITING,
  UPLOADING,
  SUCCESS,
  ERROR,
}

const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<UploadStatusEnum>(
    UploadStatusEnum.WAITING
  );

  const loadFile = (file: File) => {
    setFile(file);
  };

  const startFileUpload = async (path: string) => {
    if (file) {
      setStatus(UploadStatusEnum.UPLOADING);
      setProgress(10);
      const { data }: any = await uploadToS3(file.name, file);
      const movieData = {
        movieName: file.name,
        movieImageUrl: data.imageUrl,
      };
      try {
        const response = await fetch(path, {
          method: 'POST',
          body: JSON.stringify(movieData),
        });
        if (response.ok) {
          setStatus(UploadStatusEnum.SUCCESS);
        } else {
          setStatus(UploadStatusEnum.ERROR);
        }
      } catch (error) {
        console.log(error);
        setStatus(UploadStatusEnum.ERROR);
      }
    }
  };

  const resetData = () => {
    setFile(null);
    setProgress(0);
    setStatus(UploadStatusEnum.WAITING);
  };

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setStatus(UploadStatusEnum.SUCCESS);
      }, 1000);
    }
  }, [progress]);

  return {
    loadFile,
    startFileUpload,
    progress,
    status,
    UploadStatusEnum,
    resetData,
  };
};

export default useFileUpload;
