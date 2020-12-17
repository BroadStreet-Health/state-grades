import React from 'react';
import {Popover, Badge, OverlayTrigger} from 'react-bootstrap';

const Tooltip = (props) => {
  const placement = props.placement ? props.placement : 'bottom';
  const styleName = props.styleName
    ? props.styleName
    : 'py-1 d-flex justify-content-center';
  const containerStyleName = props.containerStyleName
    ? props.containerStyleName
    : 'tooltip';

  const popover = (
    <Popover id="popover-contained" className={containerStyleName}>
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
    <span className={styleName}>
      <OverlayTrigger placement={placement} overlay={popover}>
        <Badge
          pill
          variant="info"
          className="tooltip-icon px-1 text-white"
          role="button"
        >
          i
        </Badge>
      </OverlayTrigger>
    </span>
  );
};

export default Tooltip;
