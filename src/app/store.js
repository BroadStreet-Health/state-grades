import footerReducer from '../components/footer/footer-slice';
import stateGradeReducer from '../components/state-data-availability-table/state-data-availability-slice';

import {configureStore} from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    footer: footerReducer,
    stateGrade: stateGradeReducer,
  },
});
