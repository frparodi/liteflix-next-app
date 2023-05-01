import {
  FunctionComponent,
  ReactElement,
  useState,
  useRef,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import c from 'classnames';

import useMedia from '@/hooks/useMedia';

import styles from './Modal.module.scss';

interface ModalProps {
  children: ReactElement;
  show: boolean;
  onClose: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ children, show, onClose }) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMedia('desktop');

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#app-wrapper');
    setMounted(true);
  }, []);

  return mounted && ref.current ? (
    <>
      {createPortal(
        <div
          className={c(
            styles.backdrop,
            show && styles.show,
            isDesktop ? styles.desktop : styles.mobile
          )}
          onClick={onClose}
        />,
        ref.current
      )}
      {createPortal(
        <div
          className={c(
            styles.modal,
            show && styles.show,
            isDesktop ? styles.desktop : styles.mobile
          )}
        >
          {children}
        </div>,
        ref.current
      )}
    </>
  ) : null;
};

export default Modal;
