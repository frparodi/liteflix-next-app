import { FunctionComponent } from 'react';
import c from 'classnames';

import useMedia from '@/hooks/useMedia';

import { Device } from '@/types/devices';

import styles from './Frame.module.scss';
import { ReactElement } from 'react';

interface FrameProps {
  children: ReactElement;
  show: boolean;
}

const Frame: FunctionComponent<FrameProps> = ({ children, show }) => {
  const isDesktop = useMedia(Device.DESKTOP);
  return (
    <div
      className={c(
        styles.frame,
        show ? styles.show : styles.hide,
        isDesktop ? styles.desktop : styles.mobile
      )}
    >
      {children}
    </div>
  );
};

export default Frame;
