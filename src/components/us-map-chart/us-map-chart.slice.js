import {createSlice} from '@reduxjs/toolkit';

export const usMapData = createSlice({
  name: 'usMapData',
  initialState: {
    data: [],
    selectedState: null,
  },
  reducers: {
    setUSMapData: (state, action) => {
      state.data = action.payload.data;
    },
    setSelectedState: (state, action) => {
      state.selectedState = action.payload;
    },
  },
});

export const {setUSMapData, setSelectedState} = usMapData.actions;

export const selectUSMapData = (state) => state.usMapData.data;
export const selectSelectedStateData = (state) => state.usMapData.selectedState;

export default usMapData.reducer;
