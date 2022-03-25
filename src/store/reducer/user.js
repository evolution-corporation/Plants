import { createReducer } from '@reduxjs/toolkit';
import { sigIn, sigOut, editUserData, upLoadPlant, getReserveMarker, addReserveMarker, deleteReseveMarker } from '../actions';

export default createReducer({}, (builder) => {
  builder.addCase(sigIn, (state, action) => {
    return {...action.payload, ...state};
  });
  builder.addCase(sigOut.fulfilled, (state, action) => {
    return null;
  });
  builder.addCase(editUserData.fulfilled, (state, action) => {
    return { ...state, ...action.payload };
  });
  builder.addCase(upLoadPlant.fulfilled, (state, { payload }) => {
    if (payload.reserveMarkers) {
      return { ...state, plants: [...state.plants, payload ], reserveMarkers: state.reserveMarkers.filter(item => item.id != payload.reserveMarkers) }
    }
    return { ...state, plants: [...state.plants, payload ] }
  })
  builder.addCase(getReserveMarker.fulfilled, (state, { payload }) => {
    return { ...state, reserveMarkers: payload.map(item => ({ ...item, owner: state.uid })) }
  })
  builder.addCase(addReserveMarker.fulfilled, (state, { payload }) => {
    return { ...state, reserveMarkers: [...state.reserveMarkers, { ...payload, owner: state.uid } ] }
  })
  builder.addCase(deleteReseveMarker.fulfilled, (state, { payload }) => {
    return { ...state, reserveMarkers: [...state.reserveMarkers.filter(item => item.id != payload)]}
  })
});
