import { FunctionComponent } from 'react';
import Image from 'next/image';

import { Movie } from '@/types/movies';

import useMedia from '@/hooks/useMedia';

import Fader from '../effects/Fader';

import IconText from '../UI/IconText';

import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FunctionComponent<MovieCardProps> = ({ movie }) => {
  const isDesktop = useMedia('desktop');

  return (
    <div className={`${styles.backdrop} ${isDesktop ? styles.desktop : ''}`}>
      <Image
        src={movie.backdropImage}
        alt={movie.name}
        fill
        style={{ opacity: 0.7 }}
      />
      <Fader
        height='30%'
        zIndex={1}
        startingColor='rgba(0,0,0,0)'
        endingColor='rgba(0,0,0,1)'
        startingPoint='22.78%'
        endingPoint='122.69%'
      />
      <div className={styles.container}>
        <IconText iconPath='play-circle.svg' width={40} />
        <span className={styles.text}>{movie.name}</span>
      </div>
    </div>
  );
};

export default MovieCard;