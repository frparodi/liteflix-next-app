import { FunctionComponent, ReactElement } from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactElement;
  type?: 'primary' | 'secondary' | 'link';
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  type = 'primary',
}) => {
  return (
    <button className={`${styles.button} ${styles[type]}`}>{children}</button>
  );
};

export default Button;
