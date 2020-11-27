import StateDataAvailabilityChart from './../../components/state-map-chart/state-map-chart';

import {getStateGradesAndFundingImpact} from '../../app/store';
import Footer from '../../components/footer/footer';
import FundingImpactAvailability from '../../components/funding-impact-availability/funding-impact-availability';
import OurMethods from '../../components/our-methods/our-methods';
import StateDataAvailabilityTable from '../../components/state-data-availability-table/state-data-availability-table';
import TopNav from '../../components/top-nav/top-nav';

import React, {useEffect} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {useDispatch} from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStateGradesAndFundingImpact());
  }, [dispatch]);

  return (
    <div>
      <Container fluid>
        <Row className="px-md-4 py-5">
          <TopNav />
        </Row>
        <Row className="px-md-4 py-5">
          <Col>
            <StateDataAvailabilityChart />
          </Col>
        </Row>
        <Row className="bg-light px-md-4 py-5">
          <Col>
            <StateDataAvailabilityTable />
          </Col>
        </Row>
        <Row className="px-md-4 py-5">
          <Col>
            <FundingImpactAvailability />
          </Col>
        </Row>
        <Row className="bg-light px-md-4 py-5">
          <Col>
            <OurMethods />
          </Col>
        </Row>
        <Row className="px-md-4 py-5">
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
