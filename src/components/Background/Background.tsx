import { FunctionComponent } from 'react';

import useMedia from '@/hooks/useMedia';

import { Device } from '@/types/devices';

import Fader from '@/components/effects/Fader';

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
      <div
        style={{
          background: `url(${
            isMobile ? posterImage : backdropImage
          }) no-repeat center`,
          backgroundSize: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.6,
          zIndex: -10,
        }}
      />
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
