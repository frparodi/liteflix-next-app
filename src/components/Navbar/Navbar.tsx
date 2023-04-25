import useMedia from '@/hooks/useMedia';

import { ADD_MOVIE } from '@/constants/strings';

import AppLogo from '../AppLogo';
import Button from '../UI/Button/Button';
import IconText from '../UI/IconText';

import styles from './Navbar.module.scss';

const Navbar = () => {
  const isDesktop = useMedia('desktop');
  const isMobile = useMedia('mobile');

  return (
    <header
      className={`${styles.container} ${isDesktop ? styles.desktop : ''}`}
    >
      {isMobile && <IconText iconPath='add.svg' width={36} />}
      <div className={styles['title-block']}>
        <AppLogo size={isDesktop ? 'large' : 'normal'} />
        {isDesktop && (
          <Button type='link'>
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
  );
};

export default Navbar;
