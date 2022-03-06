import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '~services'


export const editUserData = createAsyncThunk(
    'user/editUserData',
    async (data, { rejectWithValue, fulfillWithValue }) => {
        const result = await database.addUserData(data)
        if (result) {
            return fulfillWithValue(data)
        } else {
            return rejectWithValue()
        }
    }
);
