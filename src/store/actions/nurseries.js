import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '~services'

export const editNurseriesData = createAction('nutseries/edit')