import {selectFundingImpact} from './funding-impact-availability-slice';

import ScatterPlot from '../scatter-plot/scatter-plot.js';

import React from 'react';
import {useSelector} from 'react-redux';

const FundingImpactAvailability = () => {
  const fundingImpact = useSelector(selectFundingImpact);

  return (
    <div className="text-center py-4">
      <h2 className={'fs-45 font-weight-bold'}>
        Does public health funding impact COVID-19 data availability?
      </h2>
      <h5 className="fs-24">
        Many states still provide useful COVID-19 data despite low public health
        funding per capita.
      </h5>
      <div className="fs-24 my-5 font-weight-bold">
        Hover to reveal state details and click to compare.
      </div>
      <div className="scatter-plot-container">
        <ScatterPlot chartData={fundingImpact} />
      </div>
    </div>
  );
};

export default FundingImpactAvailability;
