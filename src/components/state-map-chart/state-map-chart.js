import UsMapChart from './../us-map-chart/us-map-chart';

import GradeBadge from '../grade-badge/grade-badge';
import Tooltip from '../tooltip/tooltip';

import React from 'react';
import {useState} from 'react';
import {Row, Col} from 'react-bootstrap';

const StateDataAvailabilityChart = () => {
  const [showDetails, setShowDetails] = useState(null);

  return (
    <div className="justify-content-center text-center">
      <h3>
        How available is your state’s data?{' '}
        <span className="font-weight-bold">Click a state to learn more.</span>
      </h3>
      <Row noGutters className={'justify-content-center'}>
        <Col lg={8}>
          <div className="p-lg-5 mx-xl-5">
            <UsMapChart
              showDetails={showDetails}
              setShowDetails={setShowDetails}
            />
          </div>
        </Col>
        {showDetails ? (
          <Col lg={4} className="text-left">
            <Row className="fs-34 font-weight-bold pt-5 pl-3">
              <GradeBadge
                styleName="text-center"
                value={showDetails.stateGrade}
              />{' '}
              <h3 className="px-3 fs-34 font-weight-bold">
                {showDetails?.state} ({showDetails?.abbreviation})
              </h3>
            </Row>
            <Row className="pt-5" noGutters>
              <Col>
                <div className="fs-24"> Rank </div>
                <div className="fs-34 font-weight-bold">
                  {' '}
                  #{showDetails?.stateRank}{' '}
                </div>
              </Col>
              <Col>
                <div className="fs-24"> Score </div>
                <div className="fs-34 font-weight-bold">
                  {' '}
                  {showDetails?.totalScore} / 100{' '}
                </div>
              </Col>
            </Row>
            <Row className="pt-5" noGutters>
              <Col>
                <div className="fs-24"> Top Areas of Strength </div>
                <div className="d-flex">
                  <h3 className="fs-34 font-weight-bold">Data Quality</h3>
                  <Tooltip
                    placement="right"
                    styleName="px-2 fs-14 mt-13px"
                    text="Availability, accessibility, and accuracy of published data."
                  />
                </div>
                <div className="d-flex">
                  <h3 className="fs-34 font-weight-bold">County-Level</h3>
                  <Tooltip
                    placement="right"
                    styleName="px-2 fs-14 mt-13px"
                    text="County-level case, testing, and death data."
                  />
                </div>
              </Col>
            </Row>
            <Row className="pt-5" noGutters>
              <Col>
                <div className="fs-24"> Top Areas of Improvement</div>
                <div className="d-flex">
                  <h3 className="fs-34 font-weight-bold">
                    Special Populations
                  </h3>
                  <Tooltip
                    placement="right"
                    styleName="px-2 fs-14 mt-13px"
                    text="Data on healthcare workers and on congregate care facilities."
                  />
                </div>
                <div className="d-flex">
                  <h3 className="fs-34 font-weight-bold">Demographics</h3>
                  <Tooltip
                    placement="right"
                    styleName="px-2 fs-14 mt-13px"
                    text="Case, testing, and death data by race, ethnicity, sex, and age."
                  />
                </div>
              </Col>
            </Row>
            <Row className="pt-5" noGutters>
              <Col className="fs-24">
                <div> Contact State DOH </div>
                <div>
                  <a
                    className="font-weight-bold text-primary"
                    href={showDetails?.covid19Site}
                  >
                    Website
                  </a>
                </div>
                <div>
                  <a
                    className="font-weight-bold text-primary"
                    href={'mailto:' + showDetails?.contactInfo}
                  >
                    Email
                  </a>
                </div>
              </Col>
              <Col>
                <div className="pink-container p-3 text-center">
                  Click to reveal annotations for
                  <br />
                  <br />
                  <strong className="fs-34 font-weight-bold ">
                    {' '}
                    1.08-1.16
                  </strong>
                </div>
              </Col>
            </Row>
          </Col>
        ) : null}
      </Row>{' '}
    </div>
  );
};

export default StateDataAvailabilityChart;
