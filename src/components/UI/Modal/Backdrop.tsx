import { FunctionComponent } from 'react';
import c from 'classnames';

import styles from './Backdrop.module.scss';

interface BackdropProps {
  show: boolean;
  onClose: () => void;
}

const Backdrop: FunctionComponent<BackdropProps> = ({ show, onClose }) => {
  return (
    <div
      className={c(styles.backdrop, show ? styles.show : styles.hide)}
      onClick={onClose}
    />
  );
};

export default Backdrop;
