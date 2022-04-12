import { createReducer } from '@reduxjs/toolkit';
import { createPlant, addPlantData, upLoadPlant } from '../actions';

export default createReducer({  }, (builder) => {
  builder.addCase(createPlant, (state, { payload }) => {
    return { coordinate: payload, message: '' };
  });
  builder.addCase(addPlantData, (state, { payload }) => {
    return { ...state, ...payload };
  });
  builder.addCase(upLoadPlant, () => {
    return null
  })
});
