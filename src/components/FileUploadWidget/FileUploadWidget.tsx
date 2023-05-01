import { ChangeEvent, FunctionComponent, useRef } from 'react';
import c from 'classnames';

import useMedia from '@/hooks/useMedia';

import { Device } from '@/types/devices';

import { ADD_FILE_DESKTOP, ADD_FILE_MOBILE } from '@/constants/strings';

import ProgressBar from '../UI/ProgressBar';

import styles from './FileUploadWidget.module.scss';

interface FileUploadWidgetProps {
  readyToStart: boolean;
  error: boolean;
  progress: number;
  onLoadedFile: (file: File) => void;
  retryUpload: () => void;
}

const FileUploadWidget: FunctionComponent<FileUploadWidgetProps> = ({
  readyToStart,
  error,
  progress,
  onLoadedFile,
  retryUpload,
}) => {
  const isDesktop = useMedia(Device.DESKTOP);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputFileRef?.current?.click();
  };

  const onSelectFile = async (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    onLoadedFile(file);
  };

  return (
    <>
      {readyToStart ? (
        <ProgressBar
          error={error}
          progress={progress}
          retryUpload={retryUpload}
        />
      ) : (
        <div
          className={c(styles['file-zone'], isDesktop && styles.desktop)}
          onClick={handleClick}
        >
          <span>{isDesktop ? ADD_FILE_DESKTOP : ADD_FILE_MOBILE}</span>
        </div>
      )}
      <input
        type='file'
        accept='image/*'
        ref={inputFileRef}
        style={{ display: 'none' }}
        onChange={onSelectFile}
      />
    </>
  );
};

export default FileUploadWidget;
