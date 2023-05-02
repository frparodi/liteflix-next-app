import {
  FunctionComponent,
  ReactElement,
  useState,
  useRef,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';

import useMedia from '@/hooks/useMedia';

import { Device } from '@/types/devices';

import Backdrop from './Backdrop';
import Frame from './Frame';

interface ModalProps {
  children: ReactElement;
  show: boolean;
  onClose: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ children, show, onClose }) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  const isDesktop = useMedia(Device.DESKTOP);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#app-wrapper');
    setMounted(true);
  }, []);

  return mounted && ref.current ? (
    <>
      {isDesktop &&
        createPortal(<Backdrop show={show} onClose={onClose} />, ref.current)}
      {createPortal(<Frame show={show}>{children}</Frame>, ref.current)}
    </>
  ) : null;
};

export default Modal;
