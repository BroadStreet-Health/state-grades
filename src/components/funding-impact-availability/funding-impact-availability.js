import {selectFundingImpact} from './funding-impact-availability-slice';

import React from 'react';
import {useSelector} from 'react-redux';

const FundingImpactAvailability = () => {
  const fundingImpact = useSelector(selectFundingImpact);
  console.log('fundingImpact', fundingImpact);
  return (
    <div className="text-center py-4">
      <h2 className={'fs-45 font-weight-bold'}>
        Does public health funding impact COVID-19 data availability?
      </h2>
      <h5 className="fs-24">
        Many states still provide useful COVID-19 data despite low public health
        funding per capita.
        <br />
        <br />
        <br />
        <span className="font-weight-bold">
          Hover to reveal state details and click to compare.
        </span>
      </h5>
      <div className="py-5">
        <img src="https://dummyimage.com/600x400/000/fff" />
      </div>
    </div>
  );
};

export default FundingImpactAvailability;
