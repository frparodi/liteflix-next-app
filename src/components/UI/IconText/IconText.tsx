import { FunctionComponent } from 'react';
import Image from 'next/image';

import styles from './IconText.module.scss';

interface IconTextProps {
  iconPath: string;
  width?: number;
  height?: number;
  text?: string;
}

const IconText: FunctionComponent<IconTextProps> = ({
  iconPath,
  text,
  width = 15,
  height = width,
}) => {
  return (
    <div className={styles.container}>
      <Image
        src={`/assets/${iconPath}`}
        alt={text || iconPath}
        width={width}
        height={height}
        priority
      />
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
};

export default IconText;
