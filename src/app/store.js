import footerReducer from '../components/footer/footer-slice';

import {configureStore} from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    footer: footerReducer,
  },
});
