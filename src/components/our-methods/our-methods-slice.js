import {createSlice} from '@reduxjs/toolkit';
import {sum} from 'd3-array';
import * as d3 from 'd3-fetch';

export const ourMethodsSlice = createSlice({
  name: 'ourMethods',
  initialState: {
    subGradeDistribution: [],
    subGradeColumns: [],
    pieChartData: [],
  },
  reducers: {
    setSubGradeDistribution: (state, action) => {
      const keys = action.payload.subGradeColumns;
      action.payload.subGradeDistribution.forEach((d) => {
        d.total = sum(keys, (k) => +d[k]);
        d.category = d.Category.replace('(subgrade)', '');
        return d;
      });
      state.subGradeDistribution = action.payload.subGradeDistribution;
      state.subGradeColumns = keys;
    },
    setPieChartData: (state, action) => {
      state.pieChartData = action.payload.pieChartData;
    },
  },
});

export const {
  setSubGradeDistribution,
  setPieChartData,
} = ourMethodsSlice.actions;

export const getSubGradeDistribution = () => (dispatch) => {
  d3.csv('./assets/data/subgradeDistribution.csv').then(
    (variableDefinitions) => {
      dispatch(
        setSubGradeDistribution({
          subGradeDistribution: Array.from(variableDefinitions),
          subGradeColumns: variableDefinitions.columns.slice(1),
        })
      );
    }
  );
};

export const selectSubGradeDistribution = (state) =>
  state.ourMethods.subGradeDistribution;
export const selectSubGradeColumns = (state) =>
  state.ourMethods.subGradeColumns;
export const selectPieChartData = (state) => state.ourMethods.pieChartData;
export default ourMethodsSlice.reducer;
