import { FunctionComponent } from 'react';
import c from 'classnames';

import useMedia from '@/hooks/useMedia';

import { Device } from '@/types/devices';

import styles from './Title.module.scss';

interface TitleProps {
  children: string;
}

export const calcTitleProps = (string: string, device: Device) => {
  if (string?.length > 0) {
    const stringLength = string.length;
    const longerWord = string
      .split(' ')
      .reduce(
        (longer, current) =>
          (longer = current.length > longer ? current.length : longer),
        0
      );
    const textTooBig = stringLength > 20 || longerWord > 8;
    switch (device) {
      case Device.DESKTOP:
        return {
          fontSize: textTooBig ? '10rem' : '12rem',
          letterSpacing: '1.6rem',
        };
      case Device.MOBILE:
        return {
          fontSize: textTooBig ? '6rem' : '7.6rem',
          letterSpacing: '1.2rem',
        };
      default:
        break;
    }
  }
  return {};
};

const Title: FunctionComponent<TitleProps> = ({ children }) => {
  const isDesktop = useMedia(Device.DESKTOP);
  const device = isDesktop ? Device.DESKTOP : Device.MOBILE;
  return (
    <h3
      className={c(styles.title, isDesktop && styles.desktop)}
      style={calcTitleProps(children, device)}
    >
      {children}
    </h3>
  );
};

export default Title;
