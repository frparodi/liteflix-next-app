import { FunctionComponent, ReactElement } from 'react';
import c from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactElement | string;
  type?: 'primary' | 'secondary' | 'link' | 'shiny';
  onClick?: any;
  disabled?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  type = 'primary',
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={c(styles.button, styles[type])}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
