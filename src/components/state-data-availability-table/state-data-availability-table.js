import GradeBadge from './../grade-badge/grade-badge';
import Tooltip from './../tooltip/tooltip';
import {
  getVariableDefinitions,
  getDataCollectionRound,
  selectStateGrades,
  selectVariableDefinitions,
  selectDataCollectionRound,
  selectWeightRollups,
  selectStateGradeLoader,
} from './state-data-availability-slice';

import React, {useEffect} from 'react';
import {Spinner} from 'react-bootstrap';
import {OverlayTrigger, Popover} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';

const StateDataAvailabilityTable = () => {
  const stateGrades = useSelector(selectStateGrades);
  const stateGradeLoader = useSelector(selectStateGradeLoader);
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
      name: 'Outcomes And Preparedness',
      tooltipText:
        'Data on hospitalized patients and hospital capacity and preparedness.',
    },
    {
      name: 'Data Quality',
      tooltipText:
        'Availability, accessibility, and accuracy of published data.',
    },
  ];

  const variableDefTooltip = (category, abbreviation) => {
    const abbre = dataCollectionRound.find((d) => {
      return d['Abbreviation'] == abbreviation;
    });
    return ((abbre && variableDefinitions[category]) || [])
      .map(
        (val, i) =>
          `<div class="fs-13">
            <span class="${
              abbre[val.Variable] == 1 || abbre[val.Variable] == 0.5
                ? `font-weight-bold`
                : ``
            }">${
            abbre[val.Variable] == 1 || abbre[val.Variable] == 0.5
              ? `&check;`
              : `&nbsp;&nbsp;&nbsp;`
          } ${val.Variable}</span>
            <br />
          </div>`
      )
      .join('');
  };

  const tooltipText = (category, abbreviation) => {
    const abbre = weightRollups.find((d) => {
      return d['Category Name'] == category;
    });
    const dataCollection = dataCollectionRound.find((d) => {
      return d['Abbreviation'] == abbreviation;
    });
    return `<div>
      <span class="fs-16">
        Data available across <strong>${(
          (dataCollection && variableDefinitions[category]) ||
          []
        ).reduce(
          (a, b) =>
            dataCollection[b.Variable] == 1 || dataCollection[b.Variable] == 0.5
              ? a + 1
              : a,
          0
        )} / ${abbre && abbre['Number of Variables']}</strong> variables.
      </span>
      <br />
      <span class="fs-16">
        Accounting for <strong>${
          abbre && abbre['Category Weight']
        }% </strong>of total grade.
      </span>
      <div class="py-2">
        ${variableDefTooltip(category, abbreviation)}
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
          text={tooltipText('State-Level', val.abbreviation)}
        />
      ),
      () => (
        <GradeBadge
          value={val.countylevelSubgrade}
          text={tooltipText('County-Level', val.abbreviation)}
        />
      ),
      () => (
        <GradeBadge
          value={val.demographicsSubgrade}
          text={tooltipText('Demographics', val.abbreviation)}
        />
      ),
      () => (
        <GradeBadge
          value={val.specialPopulationsSubgrade}
          text={tooltipText('Special Populations', val.abbreviation)}
        />
      ),
      () => (
        <GradeBadge
          value={val.exposureAndClinicalIndicationsSubgrade}
          text={tooltipText(
            'Exposure and Clinical Indications',
            val.abbreviation
          )}
        />
      ),
      () => (
        <GradeBadge
          value={val.outcomesAndPreparednessSubgrade}
          text={tooltipText('Outcomes and Preparedness', val.abbreviation)}
        />
      ),
      () => (
        <GradeBadge
          value={val.dataQualitySubgrade}
          text={tooltipText('Data Quality', val.abbreviation)}
        />
      ),
    ];
  });

  useEffect(() => {
    dispatch(getVariableDefinitions());
    dispatch(getDataCollectionRound());
  }, [dispatch]);

  const popover = (
    <Popover className="tooltip mw-460">
      <Popover.Content className="font-weight-bold text-center">
        <span>
          Total grades are calculated using a weighted average based on each
          state’s seven subgrades, one for each defined category.
        </span>
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="justify-content-center text-center px-md-4 pt-4">
      <h2 className={'fs-45 font-weight-bold'}>State Data Availability</h2>
      <h5 className="fs-24">
        U.S. states are evaluated on 71 variables across seven categories to
        determine the availability of their COVID-19 data.
        <br />
        <span className="font-weight-bold">
          Click on a{' '}
          <OverlayTrigger placement="bottom" overlay={popover}>
            <span className="text-primary" role="button">
              subgrade
            </span>
          </OverlayTrigger>{' '}
          to explore which data are available — and which are missing — from
          state dashboards.
        </span>
      </h5>
      <div className="my-5 table-container">
        <>
          {stateGradeLoader ? (
            <div className="h-100 d-flex justify-content-center align-items-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Grid columns={columnData} rows={tableData} />
          )}
        </>
      </div>
      <h5 className="fs-24">
        How are state grades and subgrades calculated?{' '}
        <span className="text-primary">
          <a
            onClick={() =>
              document.getElementById('our-methods').scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            Learn more about our methods.
          </a>
        </span>
      </h5>
    </div>
  );
};

function Grid(props) {
  const {columns, rows} = props;
  return (
    <div className="table-container-border overflow-auto">
      <div
        className="table-grid"
        onScroll={() => document.body.click()}
        role="grid"
        style={{
          gridTemplateColumns: `repeat(${columns.length}, auto)`,
        }}
      >
        {columns.map((column, i) => (
          <div role="columnheader" className={'fs-20 font-weight-bold'} key={i}>
            {column.name}
            {column.tooltipText ? <Tooltip text={column.tooltipText} /> : null}
          </div>
        ))}
        {rows && rows.length ? (
          (rows || []).reduce(
            (res, row, line) => [
              ...res,
              ...row.map((cell, i) => (
                <div
                  key={`${line}-${i}`}
                  className="fs-34 fs-lg-28 font-weight-bold"
                  role="gridcell"
                >
                  {cell()}
                </div>
              )),
            ],
            []
          )
        ) : (
          <div className="fs-34 fs-lg-28 font-weight-bold my-3" role="cell">
            Not data found...
          </div>
        )}
      </div>
    </div>
  );
}

export default StateDataAvailabilityTable;
