import { FunctionComponent, useState } from 'react';

import useMedia from '@/hooks/useMedia';
import useFileUpload from '@/hooks/useFileUpload';

import {
  ADD_MOVIE,
  CONGRATULATIONS,
  EXIT,
  GO_TO_HOME,
  TITLE,
  UPLOAD_MOVIE,
  WAS_SUCCESFULLY_UPLOADED,
} from '@/constants/strings';

import Button from '@/components/UI/Button';
import IconText from '@/components/UI/IconText';
import FileUploadWidget from '@/components/FileUploadWidget';
import Text from '@/components/UI/Text';
import AppLogo from '@/components/AppLogo';

import styles from './AddMovieFlow.module.scss';

interface AddMovieFlowProps {
  closeModal: () => void;
}

const AddMovieFlow: FunctionComponent<AddMovieFlowProps> = ({ closeModal }) => {
  const [movieTitle, setMovieTitle] = useState<string | null>(null);

  const isDesktop = useMedia('desktop');
  const isMobile = useMedia('mobile');

  const {
    loadFile,
    startFileUpload,
    progress,
    status,
    UploadStatusEnum,
    resetData,
  } = useFileUpload();

  const handleCloseModal = () => {
    resetData();
    setMovieTitle(null);
    closeModal();
  };

  const handleLoadedFile = (file: File) => {
    loadFile(file);
    setMovieTitle(file.name);
  };

  const SUCCESS = status === UploadStatusEnum.SUCCESS;
  const ERROR = status === UploadStatusEnum.ERROR;
  const UPLOADING = status === UploadStatusEnum.UPLOADING;

  return (
    <>
      <div
        className={`${styles.container} ${
          isDesktop ? styles.desktop : styles.mobile
        }`}
      >
        {SUCCESS ? (
          <div className={styles['success-block']}>
            {isDesktop && (
              <div className={styles['logo-wrapper']}>
                <AppLogo size='large' />
              </div>
            )}
            <Text fontSize='2.4rem' fontWeight='bold' color='white'>
              {CONGRATULATIONS}
            </Text>
            <Text fontSize='2rem' color='white' lineHeight='3.2rem'>
              {`${movieTitle} ${WAS_SUCCESFULLY_UPLOADED}.`}
            </Text>
          </div>
        ) : (
          <div className={styles['top-block']}>
            <Text fontSize={isDesktop ? '2rem' : '2.2rem'} fontWeight='bold'>
              {ADD_MOVIE}
            </Text>
            <FileUploadWidget
              readyToStart={!!movieTitle}
              error={ERROR}
              progress={progress}
              onLoadedFile={handleLoadedFile}
            />
            <div className={styles['movie-name-box']}>
              <Text color='white' fontWeight={movieTitle ? 'bold' : 'normal'}>
                {movieTitle ? movieTitle : TITLE}
              </Text>
            </div>
          </div>
        )}
        <div className={styles['bottom-block']}>
          <Button
            type='shiny'
            disabled={!movieTitle || ERROR || UPLOADING}
            onClick={SUCCESS ? handleCloseModal : startFileUpload}
          >
            {SUCCESS ? GO_TO_HOME : UPLOAD_MOVIE}
          </Button>
          {isMobile && !SUCCESS && (
            <Button type='secondary' onClick={handleCloseModal}>
              {EXIT}
            </Button>
          )}
        </div>
        {isDesktop && (
          <button className={styles.close} onClick={handleCloseModal}>
            <IconText iconPath='close.svg' width={15} />
          </button>
        )}
      </div>
    </>
  );
};

export default AddMovieFlow;
