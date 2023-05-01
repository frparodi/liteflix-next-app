import { useState } from 'react';
import c from 'classnames';

import useMedia from '@/hooks/useMedia';
import useMyMovies from '@/hooks/useMyMovies';

import { Device } from '@/types/devices';

import { ADD_MOVIE } from '@/constants/strings';

import AppLogo from '@/components/AppLogo';
import Button from '@/components/UI/Button';
import IconText from '@/components/UI/IconText';
import Modal from '@/components/UI/Modal';
import AddMovieFlow from '@/components/AddMovieFlow';

import styles from './Navbar.module.scss';

const Navbar = () => {
  const isDesktop = useMedia(Device.DESKTOP);
  const isMobile = useMedia(Device.MOBILE);

  const { fetchMyMovies } = useMyMovies();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    fetchMyMovies();
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <header className={c(styles.container, isDesktop && styles.desktop)}>
        {isMobile && (
          <button type='button' onClick={showModal}>
            <IconText iconPath='add.svg' width={36} />
          </button>
        )}
        <div className={styles['title-block']}>
          <AppLogo size={isDesktop ? 'large' : 'normal'} />
          {isDesktop && (
            <Button onClick={showModal} type='link'>
              <IconText iconPath='plus.svg' text={ADD_MOVIE} width={14} />
            </Button>
          )}
        </div>
        <div className={styles['buttons-block']}>
          {isDesktop && (
            <>
              <IconText iconPath='menu.svg' width={27} height={12} />
              <IconText iconPath='notification.svg' width={26} height={26} />
            </>
          )}
          <IconText iconPath='avatar.svg' width={36} />
        </div>
      </header>
      <Modal show={isModalOpen} onClose={closeModal}>
        <AddMovieFlow closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default Navbar;
