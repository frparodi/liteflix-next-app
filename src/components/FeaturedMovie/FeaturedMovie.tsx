import useMedia from '@/hooks/useMedia';

import { ORIGINAL, LITEFLIX, PLAY_MOVIE, MY_LIST } from '@/constants/strings';

import Button from '../UI/Button/Button';
import IconText from '../UI/IconText';

import styles from './FeaturedMovie.module.scss';

const FeaturedMovie = () => {
  const isDesktop = useMedia('desktop');
  return (
    <div className={`${styles.container} ${isDesktop ? styles.desktop : ''}`}>
      <h2 className={styles.subtitle}>
        {`${ORIGINAL} `}
        <strong>{LITEFLIX}</strong>
      </h2>
      <h3 className={styles.title}>MOVIE TITLE</h3>
      <div className={styles['buttons-block']}>
        <Button type='primary'>
          <IconText iconPath='play.svg' text={PLAY_MOVIE} width={14} />
        </Button>
        <Button type='secondary'>
          <IconText iconPath='plus.svg' text={MY_LIST} width={14} />
        </Button>
      </div>
    </div>
  );
};

export default FeaturedMovie;
