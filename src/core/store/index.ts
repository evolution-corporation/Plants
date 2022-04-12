import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import * as actions_ from './actions';

const store = configureStore({
	reducer,
	devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
export const actions = actions_;
