import UsMapChart from './../us-map-chart/us-map-chart';

import GradeBadge from '../grade-badge/grade-badge';
import Tooltip from '../tooltip/tooltip';
import {selectUSMapData} from '../us-map-chart/us-map-chart.slice';

import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import {useSelector} from 'react-redux';

const StateMapChart = () => {
  const data = useSelector(selectUSMapData);
  const [showDetails, setShowDetails] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    if (data && selectedState) {
      const selected = Object.assign(
        {},
        data.find(
          (d) => d.abbreviation.toLowerCase() === selectedState.toLowerCase()
        )
      );
      const scoreSubgardeArray = [
        [
          'State-Level',
          'State-level case, testing, and death data.',
          'stateLevelScore',
          'stateLevelSubgrade',
        ],
        [
          'County-Level',
          'County-level case, testing, and death data.',
          'countyLevelScore',
          'countyLevelSubgrade',
        ],
        [
          'Demographics',
          'Case, testing, and death data by race, ethnicity, sex, and age.',
          'demographicsScore',
          'demographicsSubgrade',
        ],
        [
          'Special Populations',
          'Data on healthcare workers and on congregate care facilities.',
          'specialPopulationsScore',
          'specialPopulationsSubgrade',
        ],
        [
          'Exposures And Clinical Indications',
          'Data on exposure, symptoms, and underlying health conditions.',
          'exposureAndClinicalIndicationsScore',
          'exposureAndClinicalIndicationsSubgrade',
        ],
        [
          'Outcomes And Preparedness',
          'Data on hospitalized patients and hospital capacity and preparedness.',
          'outcomesAndPreparednessScore',
          'outcomesAndPreparednessSubgrade',
        ],
        [
          'Data Quality',
          'Availability, accessibility, and accuracy of published data.',
          'dataQualityScore',
          'dataQualitySubgrade',
        ],
      ];
      const scoreArray = scoreSubgardeArray
        .map((scoreSubgrade) => {
          return {
            score: parseFloat(selected[scoreSubgrade[2]]),
            subgrade: selected[scoreSubgrade[3]],
            title: scoreSubgrade[0],
            tooltip: scoreSubgrade[1],
          };
        })
        .sort((a, b) => {
          return b.score - a.score;
        });
      selected['topStrength'] = [];
      if (scoreArray[0].subgrade == 'A' || scoreArray[0].subgrade == 'B') {
        selected['topStrength'].push(scoreArray[0]);
      }
      if (scoreArray[1].subgrade == 'A' || scoreArray[1].subgrade == 'B') {
        selected['topStrength'].push(scoreArray[1]);
      }
      selected['topImprovement'] = [];
      if (scoreArray[6].subgrade == 'F' || scoreArray[6].subgrade == 'D') {
        selected['topImprovement'].push(scoreArray[6]);
      }
      if (scoreArray[5].subgrade == 'F' || scoreArray[5].subgrade == 'D') {
        selected['topImprovement'].push(scoreArray[5]);
      }
      if (
        ['Maine', 'Nebraska', 'North Dakota'].indexOf(selected['state']) !== -1
      ) {
        selected['topImprovement'].reverse();
      }
      setShowDetails(selected);
    } else {
      setShowDetails(null);
    }
  }, [data, setShowDetails, selectedState]);

  const changeSelectedState = (abbreviation) => {
    setSelectedState(abbreviation);
  };

  return (
    <div className="justify-content-center text-center overflow-hidden">
      <h3 className="fs-34">
        How available is your state’s data?{' '}
        <span className="font-weight-bold">Click a state to learn more.</span>
      </h3>
      <Row noGutters className={'justify-content-center align-items-center'}>
        <Col lg={8}>
          <div className="pt-lg-5 px-lg-2 px-xl-5 mx-xl-5">
            <UsMapChart
              showDetails={showDetails}
              changeSelectedState={changeSelectedState}
            />
          </div>
        </Col>
        <div
          className={
            'transition-animation ' +
            (showDetails && showDetails?.stateRank ? 'mr-0' : 'mr-33')
          }
        >
          {showDetails?.stateRank ? (
            <Col lg={12} className="text-left p-0">
              <Row className="fs-34 font-weight-bold pt-5 pl-3">
                <GradeBadge
                  styleName="text-center"
                  value={showDetails.stateGrade}
                />{' '}
                <h3 className="px-3 fs-34 font-weight-bold">
                  {showDetails?.state} ({showDetails?.abbreviation})
                </h3>
              </Row>
              <div className="pt-5 d-flex justify-content-start">
                <div className="mr-4">
                  <div className="fs-24"> Rank </div>
                  <div className="fs-34 font-weight-bold">
                    {' '}
                    #{showDetails?.stateRank}{' '}
                  </div>
                </div>
                <div className="ml-5">
                  <div className="fs-24"> Score </div>
                  <div className="fs-34 font-weight-bold">
                    {' '}
                    {Math.round(showDetails?.totalScore)} / 100{' '}
                  </div>
                </div>
              </div>
              <Row className="pt-5" noGutters>
                <Col>
                  <div className="fs-24"> Top Areas of Strength </div>
                  {showDetails?.topStrength.length > 0 ? (
                    showDetails?.topStrength.map((top, i) => {
                      return (
                        <div className="d-flex" key={i}>
                          <h3 className="fs-34 font-weight-bold">
                            {top.title}
                            <Tooltip
                              placement="bottom"
                              styleName="px-2 fs-14 mt-13px"
                              text={top.tooltip}
                            />
                          </h3>
                        </div>
                      );
                    })
                  ) : (
                    <div className="d-flex">
                      <h3 className="fs-34 font-weight-bold">None</h3>
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="pt-5" noGutters>
                <Col>
                  <div className="fs-24"> Top Areas of Improvement</div>
                  {showDetails?.topImprovement.length > 0 ? (
                    showDetails?.topImprovement.map((top, i) => {
                      return (
                        <div className="d-flex" key={i}>
                          <h3 className="fs-34 font-weight-bold">
                            {top.title}
                            <Tooltip
                              placement="bottom"
                              styleName="px-2 fs-14 mt-13px"
                              text={top.tooltip}
                            />
                          </h3>
                        </div>
                      );
                    })
                  ) : (
                    <div className="d-flex">
                      <h3 className="fs-34 font-weight-bold">None</h3>
                    </div>
                  )}
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
                  {showDetails?.contactInfo ? (
                    <div>
                      <a
                        className="font-weight-bold text-primary"
                        href={'mailto:' + showDetails?.contactInfo}
                      >
                        Email
                      </a>
                    </div>
                  ) : null}
                </Col>
              </Row>
            </Col>
          ) : null}
        </div>
      </Row>{' '}
    </div>
  );
};

export default StateMapChart;
