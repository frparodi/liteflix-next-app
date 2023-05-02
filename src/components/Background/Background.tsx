import { FunctionComponent } from 'react';
import Image from 'next/image';

import useMedia from '@/hooks/useMedia';

import { Device } from '@/types/devices';

import Fader from '@/components/effects/Fader';

import styles from './Background.module.scss';

interface BackgroundProps {
  posterImage: string;
  backdropImage: string;
}

export const Background: FunctionComponent<BackgroundProps> = ({
  posterImage,
  backdropImage,
}) => {
  const isMobile = useMedia(Device.MOBILE);
  return (
    <>
      <div className={styles.background}>
        <Image
          src={isMobile ? posterImage : backdropImage}
          fill
          alt='background'
          priority
        />
      </div>
      {isMobile && (
        <Fader
          height='20rem'
          startingColor='rgba(36, 36, 36, 0)'
          endingColor='rgba(36, 36, 36, 1)'
          startingPoint='0%'
          endingPoint='100%'
          zIndex={-2}
        />
      )}
    </>
  );
};
