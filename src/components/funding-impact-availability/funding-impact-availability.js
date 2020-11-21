import React from 'react';

const FundingImpactAvailability = () => {
  return (
    <div className=" text-center py-5">
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
