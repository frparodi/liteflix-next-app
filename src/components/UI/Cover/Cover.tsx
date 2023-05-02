import { useEffect, useState } from 'react';
import c from 'classnames';

import styles from './Cover.module.scss';

const Cover = () => {
  const [hideCover, setHideCover] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideCover(true);
    }, 500);
  }, []);
  return <div className={c(styles.cover, hideCover && styles.hide)} />;
};

export default Cover;
