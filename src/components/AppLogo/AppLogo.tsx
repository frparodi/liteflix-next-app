import { FunctionComponent } from 'react';

import styles from './AppLogo.module.scss';

interface AppLogoProps {
  size?: 'normal' | 'large';
}

export const AppLogo: FunctionComponent<AppLogoProps> = ({
  size = 'normal',
}) => {
  return (
    <h1 className={`${styles.title} ${styles[size]}`}>
      <strong>LITE</strong>FLIX
    </h1>
  );
};

export default AppLogo;
