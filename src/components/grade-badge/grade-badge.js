import styles from './grade-badge.module.css';

import React from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap';

const GradeBadge = ({value, styleName, text}) => {
  const style = 'grade-' + value;
  const className =
    styles[style] + ' ' + styles.badge + (styleName ? ' ' + styleName : '');

  const popover = (
    <Popover id="popover-contained" className="grade-badge-tooltip">
      <Popover.Content className="text-center">
        <span
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        ></span>
      </Popover.Content>
    </Popover>
  );
  return (
    <div>
      {text ? (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <div className={className} role="button">
            {value}
          </div>
        </OverlayTrigger>
      ) : (
        <div className={className}>{value}</div>
      )}
    </div>
  );
};

export default GradeBadge;
