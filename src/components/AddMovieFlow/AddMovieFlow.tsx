import { ChangeEventHandler, FunctionComponent, useState } from 'react';
import c from 'classnames';

import useMedia from '@/hooks/useMedia';
import useFileUpload from '@/hooks/useFileUpload';

import { Device } from '@/types/devices';

import { removeFileExtension } from '@/utils/stringUtils';

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
import Input from '@/components/UI/Input';

import styles from './AddMovieFlow.module.scss';

interface AddMovieFlowProps {
  closeModal: () => void;
}

const AddMovieFlow: FunctionComponent<AddMovieFlowProps> = ({ closeModal }) => {
  const [isMovieLoaded, setIsMovieLoaded] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');

  const isDesktop = useMedia(Device.DESKTOP);
  const isMobile = useMedia(Device.MOBILE);

  const {
    loadFile,
    startFileUpload,
    progress,
    status,
    UploadStatusEnum,
    resetData,
    changeFileName,
  } = useFileUpload();

  const handleCloseModal = () => {
    resetData();
    setIsMovieLoaded(false);
    setMovieTitle('');
    closeModal();
  };

  const handleLoadedFile = (file: File) => {
    const fileName = removeFileExtension(file.name);
    loadFile(file);
    changeFileName(fileName);
    setMovieTitle(fileName);
    setIsMovieLoaded(true);
  };

  const handleMovieNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const movieFileName = e.target.value;
    setMovieTitle(movieFileName);
    changeFileName(movieFileName);
  };

  const uploadFile = () => {
    startFileUpload('/api/movies');
  };

  const SUCCESS = status === UploadStatusEnum.SUCCESS;
  const ERROR = status === UploadStatusEnum.ERROR;
  const UPLOADING = status === UploadStatusEnum.UPLOADING;

  return (
    <>
      <div
        className={c(
          styles.container,
          isDesktop ? styles.desktop : styles.mobile
        )}
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
              readyToStart={isMovieLoaded}
              error={ERROR}
              progress={progress}
              onLoadedFile={handleLoadedFile}
              retryUpload={uploadFile}
            />
            <div className={styles['movie-name-box']}>
              <Input
                value={movieTitle}
                placeholder={TITLE}
                onChange={handleMovieNameChange}
                disabled={!isMovieLoaded}
                autoFocus
              />
            </div>
          </div>
        )}
        <div className={styles['bottom-block']}>
          <Button
            type='shiny'
            disabled={!isMovieLoaded || !movieTitle || ERROR || UPLOADING}
            onClick={SUCCESS ? handleCloseModal : uploadFile}
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
