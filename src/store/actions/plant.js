import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { database, geocoding, asyncStorage } from '~services'

export const createPlant = createAction('plant/Create');

export const addPlantData = createAction('plant/AddData');

export const usingReservMarker = createAction('plant/usingReservMarker')

export const addReserveMarker = createAsyncThunk(
    'plant/addReserveMarker',
    async (coordinate, { rejectWithValue, fulfillWithValue }) => {
        try {
            const dateDelete = new Date()
            dateDelete.setHours(0, 0, 0, 0)
            dateDelete.setDate(dateDelete.getDate() + 7)
            const marker = await asyncStorage.saveMarker({ coordinate, dateDelete: +dateDelete })
            return fulfillWithValue({ ...marker, status: 'Reserved' })
        } catch (error) {
            console.error(error)
            return rejectWithValue()
        }
    }
)

export const getReserveMarker = createAsyncThunk(
    'plant/getReserveMarker',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const markers = await asyncStorage.getReserveMarker()
            
            return fulfillWithValue(markers.map(item => ({ ...item, status: 'Reserved', date: (new Date(item.dateDelete - Date.now())).getDate() })))
        } catch (error) {
            console.error(error)
            return rejectWithValue()
        }
    }
)

export const upLoadPlant = createAsyncThunk(
    'plant/upLoad',
    async (_, { rejectWithValue, fulfillWithValue, getState }) => {
        const plant = {...getState().plant}
        plant.country = await geocoding.getCountry(plant.coordinate)
        const toDay = new Date()
        toDay.setHours(0, 0, 0, 0)
        plant.date = +toDay
        if (await database.checkCoordinate(plant.coordinate)) {
            plant.coordinate = {
                latitude: plant.coordinate.latitude + 4 * Math.pow(-1, Math.ceil(Math.random() * 100)) * Math.ceil(Math.random() * 1000) * Math.pow(10, -4),
                longitude: plant.coordinate.longitude + 4 * Math.pow(-1, Math.ceil(Math.random() * 100)) * Math.ceil(Math.random() * 1000) * Math.pow(10, -4)
            }
        }
        const result = await database.addPlant(plant)
        if (result) {
            if (plant.reserveMarker) {
                await asyncStorage.deleteReseveMarker(plant.reserveMarker)
            }
            return fulfillWithValue(plant)
        } else {
            return rejectWithValue()
        }
    }
);

export const deleteReseveMarker = createAsyncThunk(
    'plant/deleteReserve',
    async (id, {fulfillWithValue, rejectWithValue }) => {
        try {
            await asyncStorage.deleteReseveMarker(id)
            return fulfillWithValue(id)
        } catch (error) {
            console.error(error)
            rejectWithValue()
        }
    }
)