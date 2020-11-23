import React from 'react';
import {Popover, Badge, OverlayTrigger} from 'react-bootstrap';

const Tooltip = (props) => {
  const placement = props.placement ? props.placement : 'bottom';
  const styleName = props.styleName ? props.styleName : 'py-1';

  const popover = (
    <Popover id="popover-contained" className="tooltip">
      <Popover.Content className="font-weight-bold text-center">
        <span
          dangerouslySetInnerHTML={{
            __html: props.text,
          }}
        ></span>
      </Popover.Content>
    </Popover>
  );

  return (
    <div className={styleName}>
      <OverlayTrigger trigger="click" placement={placement} overlay={popover}>
        <Badge pill variant="info" className="text-white" role="button">
          i
        </Badge>
      </OverlayTrigger>
    </div>
  );
};

export default Tooltip;
