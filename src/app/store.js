import usMapDataReducer, {
  setUSMapData,
} from './../components/us-map-chart/us-map-chart.slice';

import footerReducer from '../components/footer/footer-slice';
import fundingImpactReducer, {
  setFundingImpact,
} from '../components/funding-impact-availability/funding-impact-availability-slice';
import stateGradeReducer, {
  setStateGrades,
} from '../components/state-data-availability-table/state-data-availability-slice';

import {configureStore} from '@reduxjs/toolkit';
import * as d3 from 'd3-fetch';

export default configureStore({
  reducer: {
    footer: footerReducer,
    stateGrade: stateGradeReducer,
    fundingImpact: fundingImpactReducer,
    usMapData: usMapDataReducer,
  },
});

export const getStateGradesAndFundingImpact = () => (dispatch) => {
  d3.csv('./assets/data/stateGrades.csv').then((data) => {
    const stateGrades = data.map((val) => {
      return {
        state: val['State'],
        abbreviation: val['Abbreviation'],
        stateRank: val['State Rank'],
        stateGrade: val['State Grade'],
        statelevelSubgrade: val['State-Level Subgrade'],
        countylevelSubgrade: val['County-Level Subgrade'],
        demographicsSubgrade: val['Demographics Subgrade'],
        specialPopulationsSubgrade: val['Special Populations Subgrade'],
        exposureAndClinicalIndicationsSubgrade:
          val['Exposure and Clinical Indications Subgrade'],
        outcomesAndPreparednessSubgrade:
          val['Outcomes and Preparedness Subgrade'],
        dataQualitySubgrade: val['Data Quality Subgrade'],
      };
    });
    dispatch(
      setStateGrades({
        stateGrades,
      })
    );
    const fundingImpacts = data.map((val) => {
      return {
        state: val['State'],
        abbreviation: val['Abbreviation'],
        totalScore: val['Total Score'],
        publicHealthFundingPerCapita: val['Public Health Funding Per Capita'],
      };
    });
    dispatch(
      setFundingImpact({
        fundingImpacts,
      })
    );
    const usMapData = data.map((val) => {
      return {
        state: val['State'],
        abbreviation: val['Abbreviation'],
        status: val['Status'],
        stateGrade: val['State Grade'],
        stateRank: val['State Rank'],
        totalScore: val['Total Score'],
        covid19Site: val['COVID-19 site'],
        contactInfo: val['Contact Info'],
      };
    });
    dispatch(
      setUSMapData({
        data: usMapData,
      })
    );
  });
};
