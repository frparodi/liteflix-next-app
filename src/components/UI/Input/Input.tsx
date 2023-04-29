import { ChangeEventHandler, FunctionComponent, RefObject } from 'react';

import styles from './Input.module.scss';

interface InputProps {
  value: string;
  placeholder?: string;
  onChange: ChangeEventHandler;
  disabled?: boolean;
  autoFocus?: boolean;
}

const Input: FunctionComponent<InputProps> = ({
  value,
  placeholder,
  onChange,
  disabled = false,
  autoFocus = false,
}) => {
  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoFocus={autoFocus}
    />
  );
};

export default Input;
