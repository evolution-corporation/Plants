import { createReducer } from '@reduxjs/toolkit';
import { sigIn, sigOut, appLoading, checkPermision, getPermission, selectWidget, getWidgetsList, showInstruction, upLoadPlant } from '../actions';
import { Dimensions } from 'react-native'

export default createReducer(
  {
    navigation: null,
    isFirstLoading: true,
    compact: Dimensions.get('screen').height <= 800,
    isShowInstruction: false,
    permission: { geolocation: null },
    widgets: ['PlantRegistation', 'Nurseries', 'Messages'],
    event: {}
  },
  (builder) => {
    builder.addCase(sigIn, (state, action) => {
      state.navigation = 'auth';
      state.isFirstLoading = false;
    });
    builder.addCase(sigOut.fulfilled, (state, action) => {
      state.navigation = 'noAuth';
      state.isFirstLoading = false;
    });
    builder.addCase(appLoading, (state, action) => {
      state.isFirstLoading = action.payload;
      state.navigation = 'noAuth';
    });
    builder.addCase(checkPermision.fulfilled, (state, { payload }) => {
      state.permission = { ...state.permission, ...payload }
    })
    builder.addCase(getPermission.fulfilled, (state, { payload }) => {
      state.permission = { ...state.permission, ...payload }
    })
    builder.addCase(selectWidget.fulfilled, (state, { payload }) => {
      if (payload) {
        if (state.widgets.includes(payload)) {
          state.widgets = [...state.widgets.filter(item => item != payload)]
        } else {
          state.widgets = [...state.widgets, payload]
        }
      }
    })
    builder.addCase(getWidgetsList.fulfilled, (state, { payload }) => {
      state.widgets = payload
    })
    builder.addCase(showInstruction, (state, { payload }) => {
      state.isShowInstruction = payload
    })
    builder.addCase(upLoadPlant, (state, action) => {
      state.isShowInstruction = false
    })
  },
);
