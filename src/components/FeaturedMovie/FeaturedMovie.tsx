import { FunctionComponent } from 'react';
import c from 'classnames';

import useMedia from '@/hooks/useMedia';

import { Movie } from '@/types/movies';

import { ORIGINAL, LITEFLIX, PLAY_MOVIE, MY_LIST } from '@/constants/strings';

import Button from '@/components/UI/Button';
import IconText from '@/components/UI/IconText';
import Title from '@/components/UI/Title/Title';

import styles from './FeaturedMovie.module.scss';

interface FeaturedMovieProps {
  movie: Movie;
}

const FeaturedMovie: FunctionComponent<FeaturedMovieProps> = ({ movie }) => {
  const isDesktop = useMedia('desktop');
  return (
    <div className={c(styles.container, isDesktop && styles.desktop)}>
      <h2 className={styles.subtitle}>
        {`${ORIGINAL} `}
        <strong>{LITEFLIX}</strong>
      </h2>
      <Title>{movie.name}</Title>
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
