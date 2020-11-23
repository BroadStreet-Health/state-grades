import GradeBadge from './../grade-badge/grade-badge';
import Tooltip from './../tooltip/tooltip';

import React from 'react';
import {useState} from 'react';
import {Row, Col} from 'react-bootstrap';

const StateDataAvailabilityChart = () => {
  const [showDetails, setShowDetails] = useState();
  return (
    <Row noGutters>
      <Col lg={showDetails ? 8 : 12}>
        <img
          src="./assets/images/state-grades.svg"
          onClick={() => setShowDetails(!showDetails)}
        />
      </Col>
      {showDetails ? (
        <Col lg={4} className="text-left">
          <Row className="fs-34 font-weight-bold pt-5 pl-3">
            <GradeBadge styleName="text-center" value="B" />{' '}
            <h3 className="px-3 fs-34 font-weight-bold"> Alaska (AK)</h3>
          </Row>
          <Row className="pt-5" noGutters>
            <Col>
              <div className="fs-24"> Rank </div>
              <div className="fs-34 font-weight-bold"> #14 </div>
            </Col>
            <Col>
              <div className="fs-24"> Score </div>
              <div className="fs-34 font-weight-bold"> 80 / 100 </div>
            </Col>
          </Row>
          <Row className="pt-5" noGutters>
            <Col>
              <div className="fs-24"> Top Areas of Strength </div>
              <div className="d-flex">
                <h3 className="fs-34 font-weight-bold">Data Quality</h3>
                <Tooltip
                  placement="right"
                  styleName="px-2 fs-14 lh-37"
                  text="Availability, accessibility, and accuracy of published data."
                />
              </div>
              <div className="d-flex">
                <h3 className="fs-34 font-weight-bold">County-Level</h3>
                <Tooltip
                  placement="right"
                  styleName="px-2 fs-14 lh-37"
                  text="County-level case, testing, and death data."
                />
              </div>
            </Col>
          </Row>
          <Row className="pt-5" noGutters>
            <Col>
              <div className="fs-24"> Top Areas of Improvement</div>
              <div className="d-flex">
                <h3 className="fs-34 font-weight-bold">Special Populations</h3>
                <Tooltip
                  placement="right"
                  styleName="px-2 fs-14 lh-37"
                  text="Data on healthcare workers and on congregate care facilities."
                />
              </div>
              <div className="d-flex">
                <h3 className="fs-34 font-weight-bold">Demographics</h3>
                <Tooltip
                  placement="right"
                  styleName="px-2 fs-14 lh-37"
                  text="Case, testing, and death data by race, ethnicity, sex, and age."
                />
              </div>
            </Col>
          </Row>
          <Row className="pt-5" noGutters>
            <Col className="fs-24">
              <div> Contact State DOH </div>
              <div>
                <a className="font-weight-bold text-primary">Website</a>
              </div>
              <div>
                <a className="font-weight-bold text-primary">Email</a>
              </div>
            </Col>
            <Col>
              <div className="pink-container p-3 text-center">
                Click to reveal annotations for
                <br />
                <br />
                <strong className="fs-34 font-weight-bold "> 1.08-1.16</strong>
              </div>
            </Col>
          </Row>
        </Col>
      ) : null}
    </Row>
  );
};

export default StateDataAvailabilityChart;