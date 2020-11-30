import {createSlice} from '@reduxjs/toolkit';
import * as d3 from 'd3-fetch';

export const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    authors: [],
    stateDashboard: [],
  },
  reducers: {
    setAuthorsLinks: (state, action) => {
      state.authors = action.payload.authors;
    },
    setStateDashboardLinks: (state, action) => {
      state.stateDashboard = action.payload.stateDashboard;
    },
  },
});

export const {setAuthorsLinks, setStateDashboardLinks} = footerSlice.actions;

export const getAuthorsLinks = () => (dispatch) => {
  d3.csv('./assets/data/authors.csv').then((data) => {
    const authors = data.map((val) => {
      return {name: val['Author'], link: val['LinkedIn']};
    });
    dispatch(
      setAuthorsLinks({
        authors,
      })
    );
  });
};

export const getStateDashboardLinks = () => (dispatch) => {
  d3.csv('./assets/data/stateDashboard.csv').then((data) => {
    const stateDashboard = data.map((val) => {
      return {name: val['State'], link: val['COVID-19 site (primary)']};
    });
    dispatch(
      setStateDashboardLinks({
        stateDashboard,
      })
    );
  });
};

export const selectAuthors = (state) => state.footer.authors;
export const selectStateDashboard = (state) => state.footer.stateDashboard;

export default footerSlice.reducer;
