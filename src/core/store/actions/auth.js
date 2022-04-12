import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '~services'

export const sigIn = createAction('auth/sigIn', (value) => ({
  payload: { ...value, birthday: value.birthday ? (typeof value.birthday !== 'number' ? value.birthday._seconds * 1000 : value.birthday) : undefined },
}));
export const sigOut = createAsyncThunk(
  'auth/sigOut',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      await database.exitAccount()
      return fulfillWithValue()
    } catch (error) {
      console.error(error)
      return rejectWithValue()
    }
  }  
);
