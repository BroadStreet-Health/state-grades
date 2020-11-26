import {createSlice} from '@reduxjs/toolkit';
import * as d3 from 'd3-fetch';

export const stateGradeSlice = createSlice({
  name: 'stateGrade',
  initialState: {
    stateGrades: [],
    variableDefinitions: [],
    dataCollectionRound: [],
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
  },
});

export const {
  setStateGrades,
  setVariableDefinitions,
  setDataCollectionRound,
} = stateGradeSlice.actions;

export const getVariableDefinitions = () => (dispatch) => {
  d3.csv('./assets/data/variableDefinition.csv').then((variableDefinitions) => {
    dispatch(
      setVariableDefinitions({
        variableDefinitions,
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

export const selectStateGrades = (state) => state.stateGrade.stateGrades;
export const selectVariableDefinitions = (state) =>
  state.stateGrade.variableDefinitions;
export const selectDataCollectionRound = (state) =>
  state.stateGrade.dataCollectionRound;

export default stateGradeSlice.reducer;
