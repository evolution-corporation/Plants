import { createReducer } from '@reduxjs/toolkit';
import { editNurseriesData } from '../actions';
import {  } from 'react-native'

export default createReducer({  }, (builder)=>{
    builder.addCase(editNurseriesData, (state, { payload })=>{
        state = { ...state, ...payload  }
    })
})