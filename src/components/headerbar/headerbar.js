import React from 'react';
import {Col, Row} from 'react-bootstrap';
export default function HeaderBar() {
  return (
    <Row className="px-md-5">
      <Col lg={4}>LOGO</Col>
      <Col lg={8}>
        <h1 className={'fs-60 text-right font-weight-bold text-primary'}>
          COVID-19 State Grades Project
        </h1>
        <h2 className={'fs-45 text-right font-weight-bold'}>
          How well do U.S. states report their data?
        </h2>
        <h4 className={'fs-24 text-right font-italic'}>
          Dashboard last updated: October 30, 2020
        </h4>
      </Col>
    </Row>
  );
}
