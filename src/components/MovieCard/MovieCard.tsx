import { FunctionComponent } from 'react';
import Image from 'next/image';

import useMedia from '@/hooks/useMedia';

import Fader from '../effects/Fader';

import IconText from '../UI/IconText';

import styles from './MovieCard.module.scss';

interface MovieCardProps {
  name: string;
  image: string;
}

const MovieCard: FunctionComponent<MovieCardProps> = ({ name, image }) => {
  const isDesktop = useMedia('desktop');

  return (
    <div
      className={`${styles.backdrop} ${
        isDesktop ? styles.desktop : styles.mobile
      }`}
    >
      <Image src={image} alt={name} fill />
      <div className={styles['base-layer']}>
        <Fader
          height='73%'
          zIndex={1}
          startingColor='rgba(0,0,0,0)'
          endingColor='rgba(0,0,0,1)'
          startingPoint='22.78%'
          endingPoint='122.69%'
        />
        <div className={styles['base-layer-content']}>
          <IconText iconPath='play-circle.svg' width={48} />
          <span className={styles.text}>{name.slice(0, 40)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
