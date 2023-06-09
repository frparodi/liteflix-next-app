import { FunctionComponent } from 'react';
import c from 'classnames';

import styles from './ProgressBar.module.scss';
import {
  CANCEL,
  DONE,
  FULL_LOADED,
  RETRY,
  ERROR_UPLOADING_FILE,
  READY_TO_UPLOAD as READY_TO_UPLOAD_MESSAGE,
  LOADING as LOADING_MESSAGE,
} from './strings';

interface ProgressBarProps {
  error?: boolean;
  progress?: number;
  retryUpload: () => void;
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  error = false,
  progress = 0,
  retryUpload,
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
        {ERROR && ERROR_UPLOADING_FILE}
        {SUCCESFULL_LOADING && FULL_LOADED}
      </span>
      <div className={styles['background-bar']}>
        <div
          className={c(styles['progress-bar'], error && styles.error)}
          style={{ width: `${error ? 100 : progress}%` }}
        />
      </div>
      <button
        type='button'
        onClick={ERROR ? retryUpload : () => {}}
        className={c(styles.button, SUCCESFULL_LOADING && styles.done)}
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
