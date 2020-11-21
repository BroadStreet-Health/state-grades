import styles from './grade-badge.module.css';

import React from 'react';

const GradeBadge = ({value}) => {
  const style = 'grade-' + value;
  return (
    <div>
      <div className={styles[style] + ' ' + styles.badge}>{value}</div>
    </div>
  );
};

export default GradeBadge;
