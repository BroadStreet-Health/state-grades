import React from 'react';

const FooterLinks = ({data}) => {
  const footerData = data.map((val, i) => {
    return (
      <li key={val.name} className="fs-24 font-weight-bold footer-link">
        <a href={val.link} className="text-primary">
          {val.name}
        </a>
      </li>
    );
  });

  return (
    <div className="lh-40 d-flex flex-wrap justify-content-center">
      <ul id="footerLink">{footerData}</ul>
    </div>
  );
};

export default FooterLinks;
