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
        state: val.state,
        stateRank: val.stateRank,
        stateGrade: val.stateGrade,
        statelevelSubgrade: val.statelevelSubgrade,
        countylevelSubgrade: val.countylevelSubgrade,
        demographicsSubgrade: val.demographicsSubgrade,
        specialPopulationsSubgrade: val.specialPopulationsSubgrade,
        exposureAndClinicalIndicationsSubgrade:
          val.exposureAndClinicalIndicationsSubgrade,
        outcomesAndPreparednessSubgrade: val.outcomesAndPreparednessSubgrade,
        dataQualitySubgrade: val.dataQualitySubgrade,
      };
    });
    dispatch(
      setStateGrades({
        stateGrades,
      })
    );
    const fundingImpacts = data.map((val) => {
      return {
        state: val.state,
        abbreviation: val.abbreviation,
        totalScore: val.totalScore,
        publicHealthFundingPerCapita: val.publicHealthFundingPerCapita,
      };
    });
    dispatch(
      setFundingImpact({
        fundingImpacts,
      })
    );
    const usMapData = data.map((val) => {
      return {
        State: val.state,
        Abbreviation: val.abbreviation,
        Status: val.Status,
        'State Grade': val.stateGrade,
        'State Rank': val.stateRank,
        'Total Score': val.totalScore,
      };
    });
    dispatch(
      setUSMapData({
        data: usMapData,
      })
    );
  });
};
