import React from 'react';

const FooterLinks = ({data}) => {
  const footerData = data.map((val, i) => {
    return (
      <span key={val.name} className="fs-24 font-weight-bold footer-link">
        {i > 0 ? <span className="px-1">{'|'}</span> : null}
        <a href={val.link} className="text-primary">
          {val.name}
        </a>
      </span>
    );
  });

  return (
    <div className="lh-40 d-flex flex-wrap justify-content-center">
      {footerData}
    </div>
  );
};

export default FooterLinks;
