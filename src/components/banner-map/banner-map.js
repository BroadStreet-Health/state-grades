import StateDataAvailabilityChart from '../state-map-chart/state-map-chart';

import React from 'react';

const BannerMap = () => {
  return (
    <div className="justify-content-center text-center">
      <h3>
        How available is your state’s data?{' '}
        <span className="font-weight-bold">Click a state to learn more.</span>
      </h3>
      <StateDataAvailabilityChart />
    </div>
  );
};

export default BannerMap;
