import React from 'react';

const FooterLinks = ({data}) => {
  const footerData = data.map((val, i) => {
    return (
      <span key={val.name} className="fs-24 font-weight-bold">
        {i > 0 ? ' | ' : null}
        <a href={val.link} className="text-primary">
          {val.name}
        </a>
      </span>
    );
  });
  return <div className="lh-40">{footerData}</div>;
};

export default FooterLinks;
