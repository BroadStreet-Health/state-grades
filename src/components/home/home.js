import FundingImpactAvailability from './../funding-impact-availability/funding-impact-availability';
import OurMethods from './../our-methods/our-methods';
import StateDataAvailability from './../state-data-availability/state-data-availability';

import {getStateGradesAndFundingImpact} from '../../app/store';
import Footer from '../footer/footer';
import HeaderBar from '../headerbar/headerbar';

import React, {useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {useDispatch} from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStateGradesAndFundingImpact());
  }, [dispatch]);

  return (
    <div>
      <Container fluid className="py-5">
        <HeaderBar />
        <div className="pt-15 pb-10">
          <StateDataAvailability />
          <FundingImpactAvailability />
          <OurMethods />
        </div>
        <Footer />
      </Container>
    </div>
  );
}
