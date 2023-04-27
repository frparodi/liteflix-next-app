import { FunctionComponent, ReactElement } from 'react';

import styles from './Text.module.scss';

interface TextProps {
  children: ReactElement | string;
  color?: string;
  fontSize?: string;
  lineHeight?: string;
  letterSpacing?: string;
  fontWeight?: 'normal' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
}

const Text: FunctionComponent<TextProps> = ({
  children,
  color,
  fontSize = '1.6rem',
  letterSpacing = '4px',
  fontWeight = 'normal',
  textAlign = 'center',
  lineHeight,
}) => {
  return (
    <span
      className={`${styles.text}`}
      style={{
        color,
        fontSize,
        letterSpacing,
        fontWeight,
        textAlign,
        lineHeight,
      }}
    >
      {children}
    </span>
  );
};

export default Text;
