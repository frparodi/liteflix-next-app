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

  const startFileUpload = () => {
    console.log(`Starting to upload ${file?.name}...`);
    setStatus(UploadStatusEnum.UPLOADING);
    setProgress((prevValue) => prevValue + 20);
    setTimeout(() => {
      setProgress((prevValue) => prevValue + 20);
      setTimeout(() => {
        setProgress((prevValue) => prevValue + 20);
        setTimeout(() => {
          setProgress((prevValue) => prevValue + 20);
          setTimeout(() => {
            setProgress((prevValue) => prevValue + 20);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
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
