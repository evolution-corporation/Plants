import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import * as actions_ from './actions';

export default configureStore({
  reducer,
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});

export const actions = actions_;
