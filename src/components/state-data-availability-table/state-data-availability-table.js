import GradeBadge from './../grade-badge/grade-badge';
import Tooltip from './../tooltip/tooltip';
import {
  getVariableDefinitions,
  getDataCollectionRound,
  getWeightRollups,
  selectStateGrades,
  selectVariableDefinitions,
  selectDataCollectionRound,
  selectWeightRollups,
} from './state-data-availability-slice';

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const StateDataAvailabilityTable = () => {
  const stateGrades = useSelector(selectStateGrades);
  const variableDefinitions = useSelector(selectVariableDefinitions);
  const dataCollectionRound = useSelector(selectDataCollectionRound);
  const weightRollups = useSelector(selectWeightRollups);
  const dispatch = useDispatch();

  const columnData = [
    {
      name: 'State',
      tooltipText: null,
    },
    {
      name: 'Rank',
      tooltipText: 'Out of 50 U.S. States <br /> (1 = best, 50 = worst)',
    },
    {
      name: 'Grade',
      tooltipText: 'Weighted average of seven subgrade category scores.',
    },
    {
      name: 'State-Level',
      tooltipText: 'State-level case, testing, and death data.',
    },
    {
      name: 'County-Level',
      tooltipText: 'County-level case, testing, and death data.',
    },
    {
      name: 'Demographics',
      tooltipText:
        'Case, testing, and death data by race, ethnicity, sex, and age.',
    },
    {
      name: 'Special Populations',
      tooltipText:
        'Data on healthcare workers and on congregate care facilities.',
    },
    {
      name: 'Exposures And Clinical Indications',
      tooltipText:
        'Data on exposure, symptoms, and underlying health conditions.',
    },
    {
      name: 'Outcome And Preparedness',
      tooltipText:
        'Data on hospitalized patients and hospital capacity and preparedness.',
    },
    {
      name: 'Data Quality',
      tooltipText:
        'Availability, accessibility, and accuracy of published data.',
    },
  ];

  const variableDefTooltip = (category) => {
    return (
      variableDefinitions &&
      variableDefinitions[category]
        .map(
          (val, i) =>
            `<div class="fs-13">
            <span class="${i == 0 ? `font-weight-bold` : ``}">${
              i == 0 ? `&check;` : `&nbsp;&nbsp;&nbsp;`
            } ${val.Variable}</span>
            <br />
          </div>`
        )
        .join('')
    );
  };

  const tooltipText = (category) => {
    return `<div>
      <span class="fs-16">
        Data available across <strong>8 / 14</strong> variables.
      </span>
      <br />
      <span class="fs-16">
        Accounting for <strong>40% </strong>of total grade.
      </span>
      <div class="py-2">
        ${variableDefTooltip(category)}
      </div>
    </div>`;
  };

  const tableData = stateGrades.map((val, i) => {
    return [
      () => val.state,
      () => val.stateRank,
      () => <GradeBadge value={val.stateGrade} />,
      () => (
        <GradeBadge
          value={val.statelevelSubgrade}
          text={tooltipText('State-Level')}
        />
      ),
      () => (
        <GradeBadge
          value={val.countylevelSubgrade}
          text={tooltipText('County-Level')}
        />
      ),
      () => (
        <GradeBadge
          value={val.demographicsSubgrade}
          text={tooltipText('Demographics')}
        />
      ),
      () => (
        <GradeBadge
          value={val.specialPopulationsSubgrade}
          text={tooltipText('Special Populations')}
        />
      ),
      () => (
        <GradeBadge
          value={val.exposureAndClinicalIndicationsSubgrade}
          text={tooltipText('Exposure and Clinical Indications')}
        />
      ),
      () => (
        <GradeBadge
          value={val.outcomesAndPreparednessSubgrade}
          text={tooltipText('Outcomes and Preparedness')}
        />
      ),
      () => (
        <GradeBadge
          value={val.dataQualitySubgrade}
          text={tooltipText('Data Quality')}
        />
      ),
    ];
  });

  useEffect(() => {
    dispatch(getVariableDefinitions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDataCollectionRound());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWeightRollups());
  }, [dispatch]);

  console.log('variableDefinitions', variableDefinitions);
  console.log('dataCollectionRound', dataCollectionRound);
  console.log('weightRollups', weightRollups);
  weightRollups;
  return (
    <div className="justify-content-center text-center pt-4">
      <h2 className={'fs-45 font-weight-bold'}>State Data Availability</h2>
      <h5 className="fs-24">
        U.S. states are evaluated on 71 variables across seven categories to
        determine the availability of their COVID-19 data.
        <br />
        <span className="font-weight-bold">
          Click on a <span className="text-primary">subgrade</span> to explore
          which data are available — and which are missing — from state
          dashboards.
        </span>
      </h5>
      <div className="my-5 table-container">
        <Grid columns={columnData} rows={tableData} />
      </div>
      <h5 className="fs-24">
        How are state grades and subgrades calculated?{' '}
        <span className="text-primary">Learn more about our methods.</span>
      </h5>
    </div>
  );
};

function Grid(props) {
  const {columns, rows} = props;
  return (
    <div className="table-container-border">
      <div
        className="table-grid"
        role="grid"
        style={{
          gridTemplateColumns: `repeat(${columns.length}, auto)`,
        }}
      >
        {columns.map((column, i) => (
          <div role="columnheader" className="fs-24 font-weight-bold" key={i}>
            {column.name}
            {column.tooltipText ? <Tooltip text={column.tooltipText} /> : null}
          </div>
        ))}
        {rows.reduce(
          (res, row, line) => [
            ...res,
            ...row.map((cell, i) => (
              <div
                key={`${line}-${i}`}
                className="fs-34 font-weight-bold"
                role="gridcell"
              >
                {cell()}
              </div>
            )),
          ],
          []
        )}
      </div>
    </div>
  );
}

export default StateDataAvailabilityTable;
