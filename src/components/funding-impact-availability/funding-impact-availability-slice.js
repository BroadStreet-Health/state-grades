import {createSlice} from '@reduxjs/toolkit';

export const fundingImpactSlice = createSlice({
  name: 'fundingImpact',
  initialState: {
    fundingImpacts: [],
  },
  reducers: {
    setFundingImpact: (state, action) => {
      state.fundingImpacts = action.payload.fundingImpacts;
    },
  },
});

export const {setFundingImpact} = fundingImpactSlice.actions;

export const selectFundingImpact = (state) =>
  state.fundingImpact.fundingImpacts;

export default fundingImpactSlice.reducer;
