import style from './top-nav.module.css';

import React from 'react';
import {Col} from 'react-bootstrap';

export default function TopNav() {
  return (
    <>
      <Col lg={4}>
        <img src="./logo.svg" className={style.logo} alt="Logo" />
      </Col>
      <Col lg={8}>
        <h1 className={'fs-60 text-right font-weight-bold text-primary'}>
          COVID-19 State Grades Project
        </h1>
        <h2 className={'fs-45 text-right font-weight-bold mb-0'}>
          How well do U.S. states report their data?
        </h2>
        <h4 className={'fs-24 text-right font-italic'}>
          Dashboard last updated: October 30, 2020
        </h4>
      </Col>
    </>
  );
}
