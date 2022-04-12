import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '~services'


export const editUserData = createAsyncThunk(
    'user/editUserData',
    async (data, { rejectWithValue, fulfillWithValue }) => {
        if(data.image) {
            data.avatar = data.image
            data.image = null
        }
        const result = await database.addUserData(data)
        if (result) {
            return fulfillWithValue(data)
        } else {
            return rejectWithValue()
        }
    }
);
