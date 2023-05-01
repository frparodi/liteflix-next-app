import { FunctionComponent, ReactElement, useState } from 'react';
import c from 'classnames';

import IconText from '../IconText';

import styles from './Dropdown.module.scss';

interface DropdownProps {
  type?: 'floating' | 'drawer';
  placeholder: string | ReactElement;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: any) => void;
}

const Dropdown: FunctionComponent<DropdownProps> = ({
  type = 'floating',
  placeholder,
  options,
  value,
  onChange,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  return (
    <div
      className={styles.wrapper}
      onMouseLeave={() => setIsDropdownVisible(false)}
    >
      <button
        onClick={() => {
          setIsDropdownVisible((prevValue) => !prevValue);
        }}
        className={styles.button}
      >
        {placeholder}
        <IconText iconPath='arrow.svg' width={18} height={9} />
      </button>
      <div
        className={c(
          styles.dropdown,
          styles[type],
          isDropdownVisible && styles.show
        )}
      >
        {options.map((option) => (
          <button
            className={styles.option}
            key={option.value}
            onClick={() => {
              onChange(option.value);
            }}
          >
            <span
              className={c(
                styles.label,
                value === option.value && styles.active
              )}
            >
              {option.label}
            </span>
            {value === option.value && (
              <IconText iconPath='check.svg' width={18} height={12} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
