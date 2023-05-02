import { FunctionComponent, useEffect, useState } from 'react';
import Image from 'next/image';
import c from 'classnames';

import useMedia from '@/hooks/useMedia';

import { Device } from '@/types/devices';

import BaseLayer from './BaseLayer';
import StatsLayer from './StatsLayer';

import styles from './MovieCard.module.scss';

interface MovieCardProps {
  name: string;
  image: string;
  score?: number;
  year?: string;
  isActive: boolean;
  setActiveMovieIndex: () => void;
}

const MovieCard: FunctionComponent<MovieCardProps> = ({
  name,
  image,
  score,
  year,
  isActive,
  setActiveMovieIndex,
}) => {
  const isDesktop = useMedia(Device.DESKTOP);

  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setShowStats(false);
    }
  }, [isActive]);

  const showStatsLayer = () => {
    setShowStats(true);
    setActiveMovieIndex();
  };

  const hideStatsLayer = () => {
    setShowStats(false);
  };

  const formattedMovieTitle = name.slice(0, 40);

  return (
    <div className={c(styles.frame, isDesktop && styles.desktop)}>
      <Image src={image} alt={name} fill priority />
      <BaseLayer
        isActive={!showStats}
        movieTitle={formattedMovieTitle}
        showStatsLayer={showStatsLayer}
      />
      <StatsLayer
        isLayerActive={isActive && showStats}
        movieTitle={formattedMovieTitle}
        score={score}
        year={year}
        hideLayer={hideStatsLayer}
      />
    </div>
  );
};

export default MovieCard;
