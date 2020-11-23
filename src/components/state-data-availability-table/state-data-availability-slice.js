import {createSlice} from '@reduxjs/toolkit';
import * as d3 from 'd3-fetch';

export const stateGradeSlice = createSlice({
  name: 'stateGrade',
  initialState: {
    stateGrades: [],
  },
  reducers: {
    setStateGrades: (state, action) => {
      state.stateGrades = action.payload.stateGrades;
    },
  },
});

export const {setStateGrades} = stateGradeSlice.actions;

export const getStateGrades = () => (dispatch) => {
  d3.csv('./assets/data/stateGrades.csv').then((stateGrades) => {
    dispatch(
      setStateGrades({
        stateGrades,
      })
    );
  });
};

export const selectStateGrades = (state) => state.stateGrade.stateGrades;

export default stateGradeSlice.reducer;
