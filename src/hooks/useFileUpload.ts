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
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<UploadStatusEnum>(
    UploadStatusEnum.WAITING
  );

  const loadFile = (file: File) => {
    setFile(file);
  };

  const changeFileName = (name: string) => {
    setFileName(name);
  };

  const startFileUpload = async (path: string) => {
    if (file) {
      setStatus(UploadStatusEnum.UPLOADING);
      setProgress(30);
      const uploadFileName = fileName ? fileName : file.name;
      const response: any = await uploadToS3(uploadFileName, file);
      if (response.status === 'ok') {
        const movieData = {
          movieName: uploadFileName,
          movieImageUrl: response.data.imageUrl,
        };
        setProgress(80);
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
      } else {
        console.log(response.error || 'Unknown error');
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
    changeFileName,
    startFileUpload,
    progress,
    status,
    UploadStatusEnum,
    resetData,
  };
};

export default useFileUpload;
