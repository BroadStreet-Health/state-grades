import FundingImpactAvailability from './../funding-impact-availability/funding-impact-availability';
import OurMethods from './../our-methods/our-methods';
import StateDataAvailability from './../state-data-availability/state-data-availability';

import Footer from '../footer/footer';
import HeaderBar from '../headerbar/headerbar';

import React from 'react';
import {Container} from 'react-bootstrap';

export default function Home() {
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
