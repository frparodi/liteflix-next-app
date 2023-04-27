import { FunctionComponent, useState } from 'react';

import useMedia from '@/hooks/useMedia';

import {
  ADD_FILE_DESKTOP,
  ADD_FILE_MOBILE,
  ADD_MOVIE,
  EXIT,
  TITLE,
  UPLOAD_MOVIE,
} from '@/constants/strings';

import Button from '../UI/Button';
import IconText from '../UI/IconText';

import styles from './AddMovieFlow.module.scss';

interface AddMovieFlowProps {
  closeModal: () => void;
}

const AddMovieFlow: FunctionComponent<AddMovieFlowProps> = ({ closeModal }) => {
  const [movieName, setMovieName] = useState(TITLE);
  const isDesktop = useMedia('desktop');
  const isMobile = useMedia('mobile');
  return (
    <div
      className={`${styles.container} ${
        isDesktop ? styles.desktop : styles.mobile
      }`}
    >
      <h2 className={styles.title}>{ADD_MOVIE}</h2>
      <div className={styles['file-zone']}>
        <span>{isDesktop ? ADD_FILE_DESKTOP : ADD_FILE_MOBILE}</span>
      </div>
      <div className={styles['bottom-box']}>
        <div className={styles['movie-name-box']}>
          <span className={styles['movie-name']}>{movieName}</span>
        </div>
        <div className={styles['buttons-wrapper']}>
          <Button type='shiny' disabled onClick={() => {}}>
            {UPLOAD_MOVIE}
          </Button>
          {isMobile && (
            <Button type='secondary' onClick={closeModal}>
              {EXIT}
            </Button>
          )}
        </div>
      </div>
      {isDesktop && (
        <button className={styles.close} onClick={closeModal}>
          <IconText iconPath='close.svg' width={15} />
        </button>
      )}
    </div>
  );
};

export default AddMovieFlow;
