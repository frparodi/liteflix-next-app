import { FunctionComponent } from 'react';
import c from 'classnames';

import { Device } from '@/types/devices';

import useMedia from '@/hooks/useMedia';

import Fader from '@/components/effects/Fader';

import IconText from '@/components/UI/IconText';

import styles from './BaseLayer.module.scss';

interface BaseLayerProps {
  movieTitle: string;
  isActive: boolean;
  showStatsLayer: () => void;
}

const BaseLayer: FunctionComponent<BaseLayerProps> = ({
  movieTitle,
  isActive,
  showStatsLayer,
}) => {
  const isDesktop = useMedia(Device.DESKTOP);
  return (
    <div
      className={c(
        styles.container,
        isActive && styles.active,
        isDesktop && styles.desktop
      )}
    >
      <Fader
        height='73%'
        zIndex={2}
        startingColor='rgba(0,0,0,0)'
        endingColor='rgba(0,0,0,1)'
        startingPoint='22.78%'
        endingPoint='122.69%'
      />
      <div className={styles.content}>
        <IconText iconPath='play-circle.svg' width={48} />
        <span className={styles.text}>{movieTitle}</span>
      </div>
      <div
        className={styles.clickable}
        onClick={showStatsLayer}
        onMouseOver={showStatsLayer}
      />
    </div>
  );
};

export default BaseLayer;
