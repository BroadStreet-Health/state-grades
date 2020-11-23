import styles from './grade-badge.module.css';

import React from 'react';

const GradeBadge = ({value, styleName}) => {
  const style = 'grade-' + value;
  const className =
    styles[style] + ' ' + styles.badge + (styleName ? ' ' + styleName : '');
  return (
    <div>
      <div className={className}>{value}</div>
    </div>
  );
};

export default GradeBadge;
