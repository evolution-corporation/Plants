import { createReducer } from '@reduxjs/toolkit';
import { editNurserieData, creatNurserie, getMyNurserie, deleteNurserie } from '../actions';

export default createReducer({  }, (builder)=>{
    builder.addCase(editNurserieData.fulfilled, (state, { payload }) => {
        
        return { ...state, ...payload  }
    })
    builder.addCase(editNurserieData.rejected, (state, { payload }) => {
        return state
    })
    builder.addCase(creatNurserie.fulfilled, (state, { payload }) => {
        console.log(payload)
        return { ...payload }
    })
    builder.addCase(creatNurserie.rejected, (state, { payload }) => {
        return state
    })
    builder.addCase(getMyNurserie.fulfilled, (state, { payload }) => {
        return payload
    })
    builder.addCase(getMyNurserie.rejected, (state, { payload }) => {
        return state
    })

    builder.addCase(deleteNurserie.fulfilled, (state, {}) => {
        return {}
    })
    builder.addCase(deleteNurserie.rejected, (state, {}) => {
        return {}
    })
})