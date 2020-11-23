import StateDataAvailabilityTable from './../state-data-availability-table/state-data-availability-table';

import StateDataAvailabilityChart from '../state-data-availability-chart/state-data-availability-chart';

import React from 'react';

const StateDataAvailability = () => {
  return (
    <div className="justify-content-center text-center ">
      <h3>
        How available is your state’s data?{' '}
        <span className="font-weight-bold">Click a state to learn more.</span>
      </h3>
      <StateDataAvailabilityChart />
      <StateDataAvailabilityTable />
    </div>
  );
};

export default StateDataAvailability;
