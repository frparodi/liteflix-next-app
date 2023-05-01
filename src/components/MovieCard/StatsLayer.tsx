import { FunctionComponent, useState } from 'react';
import c from 'classnames';

import useMedia from '@/hooks/useMedia';

import { Device } from '@/types/devices';

import IconText from '@/components/UI/IconText';
import Score from '@/components/Score';
import Text from '@/components/UI/Text';

import styles from './StatsLayer.module.scss';

interface StatsLayerProps {
  isLayerActive: boolean;
  movieTitle: string;
  hideLayer: () => void;
  score?: number;
  year?: string;
}

const StatsLayer: FunctionComponent<StatsLayerProps> = ({
  isLayerActive,
  movieTitle,
  hideLayer,
  score,
  year,
}) => {
  const [isPlayButtonOn, setIsPlayButtonOn] = useState(false);

  const isDesktop = useMedia(Device.DESKTOP);
  const isMobile = useMedia(Device.MOBILE);

  const turnOnPlayButton = () => {
    setIsPlayButtonOn(true);
  };

  const turnOffPlayButton = () => {
    setIsPlayButtonOn(false);
  };

  return (
    <div
      className={c(
        styles.container,
        isLayerActive && styles.active,
        isDesktop && styles.desktop
      )}
      onMouseLeave={hideLayer}
    >
      <div className={styles.content}>
        <div className={styles['first-row']}>
          <div
            className={styles['buttons-container']}
            onMouseEnter={turnOnPlayButton}
            onMouseLeave={turnOffPlayButton}
          >
            <div
              className={c(
                styles['play-button-wrapper'],
                !isPlayButtonOn && isLayerActive && styles.hovered
              )}
            >
              <IconText iconPath='play-circle.svg' width={24} />
            </div>
            <div
              className={c(
                styles['play-button-wrapper'],
                isPlayButtonOn && isLayerActive && styles.hovered
              )}
            >
              <IconText iconPath='play-color.svg' width={24} />
            </div>
          </div>
          <Text color='#fff'>{movieTitle}</Text>
        </div>
        {score && year && (
          <div className={styles['second-row']}>
            <Score>{score}</Score>
            <span>{year}</span>
          </div>
        )}
      </div>
      {isMobile && (
        <div
          className={styles.clickable}
          onClick={hideLayer}
          onMouseOut={hideLayer}
        />
      )}
    </div>
  );
};

export default StatsLayer;
