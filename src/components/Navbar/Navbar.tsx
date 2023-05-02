import { FunctionComponent } from 'react';
import c from 'classnames';

import useMedia from '@/hooks/useMedia';

import { Device } from '@/types/devices';

import { ADD_MOVIE } from '@/constants/strings';

import AppLogo from '@/components/AppLogo';
import Button from '@/components/UI/Button';
import IconText from '@/components/UI/IconText';

import styles from './Navbar.module.scss';

interface NavbarProps {
  showNavbar: boolean;
  openModal: () => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({ showNavbar, openModal }) => {
  const isDesktop = useMedia(Device.DESKTOP);
  const isMobile = useMedia(Device.MOBILE);
  return (
    <>
      <header
        className={c(
          styles.container,
          isDesktop && styles.desktop,
          c(showNavbar && styles.show)
        )}
      >
        {isMobile && (
          <button type='button' onClick={openModal}>
            <IconText iconPath='add.svg' width={36} />
          </button>
        )}
        <div className={styles['title-block']}>
          <AppLogo size={isDesktop ? 'large' : 'normal'} />
          {isDesktop && (
            <Button onClick={openModal} type='link'>
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
    </>
  );
};

export default Navbar;
