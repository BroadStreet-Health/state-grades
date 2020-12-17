import {createSlice} from '@reduxjs/toolkit';
import * as d3 from 'd3-fetch';

export const stateGradeSlice = createSlice({
  name: 'stateGrade',
  initialState: {
    stateGrades: [],
    variableDefinitions: [],
    dataCollectionRound: [],
    weightRollups: [],
  },
  reducers: {
    setStateGrades: (state, action) => {
      state.stateGrades = action.payload.stateGrades;
    },
    setVariableDefinitions: (state, action) => {
      state.variableDefinitions = action.payload.variableDefinitions;
    },
    setDataCollectionRound: (state, action) => {
      state.dataCollectionRound = action.payload.dataCollectionRound;
    },
    setWeightRollups: (state, action) => {
      state.weightRollups = action.payload.weightRollups;
    },
  },
});

export const {
  setStateGrades,
  setVariableDefinitions,
  setDataCollectionRound,
  setWeightRollups,
} = stateGradeSlice.actions;

export const getVariableDefinitions = () => (dispatch) => {
  d3.csv('./assets/data/variableDefinition.csv').then((variableDefinitions) => {
    dispatch(
      setVariableDefinitions({
        variableDefinitions: groupBy(variableDefinitions, 'Category'),
      })
    );
  });
};

export const getDataCollectionRound = () => (dispatch) => {
  d3.csv('./assets/data/dataCollectionRound.csv').then(
    (dataCollectionRound) => {
      dispatch(
        setDataCollectionRound({
          dataCollectionRound,
        })
      );
    }
  );
};

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, []);
};

export const selectStateGrades = (state) => state.stateGrade.stateGrades;
export const selectVariableDefinitions = (state) =>
  state.stateGrade.variableDefinitions;
export const selectDataCollectionRound = (state) =>
  state.stateGrade.dataCollectionRound;
export const selectWeightRollups = (state) => state.stateGrade.weightRollups;

export default stateGradeSlice.reducer;
