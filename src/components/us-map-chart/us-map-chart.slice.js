import {createSlice} from '@reduxjs/toolkit';

export const usMapData = createSlice({
  name: 'usMapData',
  initialState: {
    data: [],
  },
  reducers: {
    setUSMapData: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export const {setUSMapData} = usMapData.actions;

export const selectUSMapData = (state) => state.usMapData.data;

export default usMapData.reducer;
