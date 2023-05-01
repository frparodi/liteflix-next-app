import { FunctionComponent } from 'react';

import IconText from '../UI/IconText';

import styles from './Score.module.scss';

interface ScoreProps {
  children: number | string;
}

const Score: FunctionComponent<ScoreProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <IconText iconPath='star.svg' width={12} />
      <span className={styles.score}>{children}</span>
    </div>
  );
};

export default Score;
