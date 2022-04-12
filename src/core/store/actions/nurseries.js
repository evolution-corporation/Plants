import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '~services'

export const editNurserieData = createAsyncThunk(
    'nutseries/edit',
    async (data, { fulfillWithValue, rejectWithValue, getState }) => {
        try {
            const dataUpdate = {}
            const nurserie = getState().nurserie
            for (let field of Object.keys(data)) {
                if (nurserie[field] != data[field]) {
                    dataUpdate[field] = data[field]
                }
            }
            await database.nurseries.updateData({ data: { ...dataUpdate, id: nurserie.id } })
            return fulfillWithValue(data)
        } catch (error) {
            console.error(error)
            return rejectWithValue({ })
        }
    }
)

export const creatNurserie = createAsyncThunk(
    'nutseries/creat',
    async (data, { fulfillWithValue, rejectWithValue }) => {
        try {
            const nutserie = await database.nurseries.create({ ...data })
            return fulfillWithValue(nutserie)
        } catch (error) {
            console.error(error)
            return rejectWithValue()
        }
    }
)

export const getMyNurserie = createAsyncThunk(
    'nurseries/get',
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const nurserie = await database.nurseries.getMyNurserie()
            return fulfillWithValue(nurserie)
        } catch (error) {
            console.error(error)
            return rejectWithValue({  })
        }
    }
)

export const deleteNurserie = createAsyncThunk(
    'nurseries/delete',
    async (_, { fulfillWithValue, rejectWithValue, getState }) => {
        try {
            const state = getState()
            const nurserie = state.nurserie
            await database.nurseries.delete({ id: nurserie.id })
            return fulfillWithValue({  })
        } catch (error) {
            console.error(error)
            return rejectWithValue({  })
        }
    }
)