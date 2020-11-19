import counterReducer from '../components/counter/counter-slice';

import {configureStore} from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
