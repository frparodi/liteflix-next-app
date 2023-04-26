import { FunctionComponent } from 'react';

interface FaderProps {
  height: string;
  zIndex?: number;
  startingColor: string;
  endingColor: string;
  startingPoint?: string;
  endingPoint?: string;
}

const Fader: FunctionComponent<FaderProps> = ({
  startingColor,
  endingColor,
  height,
  zIndex = '1',
  startingPoint = '0%',
  endingPoint = '100%',
}) => {
  const backgroundValue = `linear-gradient(180deg, ${startingColor} ${startingPoint}, ${endingColor} ${endingPoint})`;
  return (
    <div
      style={{
        background: backgroundValue,
        position: 'absolute',
        height: `${height}`,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex,
      }}
    />
  );
};

export default Fader;
