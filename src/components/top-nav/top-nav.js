import style from './top-nav.module.css';

import React from 'react';
import {Col} from 'react-bootstrap';

export default function TopNav() {
  return (
    <>
      <Col lg={4}>
        <a href="https://covid19dataproject.org/">
          <img src="./logo.svg" className={style.logo} alt="Logo" />
        </a>
      </Col>
      <Col lg={8}>
        <h1 className={'fs-60 text-right font-weight-bold text-primary mb-0'}>
          COVID-19 State Grades Project
        </h1>
        <h2 className={'fs-45 text-right font-weight-bold mb-2'}>
          How well do U.S. states report their data?
        </h2>
        <h4 className={'fs-24 text-right font-italic'}>
          Dashboard last updated: October 30, 2020
        </h4>
      </Col>
    </>
  );
}
