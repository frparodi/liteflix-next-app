import { useEffect, useState } from 'react';

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

  const startFileUpload = async () => {
    if (file) {
      setStatus(UploadStatusEnum.UPLOADING);
      setProgress(10);

      const formData = new FormData();
      formData.append('image', file);
      formData.append('description', file.name);
      try {
        const response = await fetch('/api/movies', {
          method: 'POST',
          body: formData,
        });
        const apiResponse = await response.json();
        setStatus(UploadStatusEnum.SUCCESS);
      } catch (error) {
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
