import { FunctionComponent } from 'react';

import styles from './ProgressBar.module.scss';
import {
  CANCEL,
  DONE,
  FULL_LOADED,
  RETRY,
  ERROR as ERROR_MESSAGE,
  READY_TO_UPLOAD as READY_TO_UPLOAD_MESSAGE,
  LOADING as LOADING_MESSAGE,
} from './strings';

interface ProgressBarProps {
  error?: boolean;
  progress?: number;
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  error = true,
  progress = 100,
}) => {
  const READY_TO_UPLOAD = progress === 0 && !error;
  const LOADING = progress > 0 && progress < 100 && !error;
  const SUCCESFULL_LOADING = progress === 100 && !error;
  const ERROR = error;
  return (
    <div className={styles.container}>
      <span className={styles.status}>
        {LOADING && `${LOADING_MESSAGE} ${progress}%`}
        {READY_TO_UPLOAD && READY_TO_UPLOAD_MESSAGE}
        {ERROR && ERROR_MESSAGE}
        {SUCCESFULL_LOADING && FULL_LOADED}
      </span>
      <div className={styles['background-bar']}>
        <div
          className={`${styles['progress-bar']} ${error ? styles.error : ''}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <button
        type='button'
        onClick={() => {}}
        className={`${styles.button} ${SUCCESFULL_LOADING ? styles.done : ''}`}
        disabled={SUCCESFULL_LOADING}
      >
        {LOADING && CANCEL}
        {ERROR && RETRY}
        {SUCCESFULL_LOADING && DONE}
      </button>
    </div>
  );
};

export default ProgressBar;
