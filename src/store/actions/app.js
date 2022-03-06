import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { geocoding, asyncStorage } from '~services'

export const appLoading = createAction('app/appLoading', (value) => ({
  payload: typeof value !== 'boolean' ? true : value,
}));

export const checkPermision = createAsyncThunk(
  'app/setPermission', 
  async (_, { fulfillWithValue, rejectWithValue }) => {
    return fulfillWithValue({ geolocation: await geocoding.checkPermissions() })
  })

export const getPermission = createAsyncThunk(
  'app/getPermission',
  async (type, { fulfillWithValue, rejectWithValue }) => {
    switch (type) {
      case 'geolocation':
        return fulfillWithValue({ geolocation: await geocoding.checkPermissions() })
      default: 
        return rejectWithValue()
    }
  }
)

export const selectWidget = createAsyncThunk(
  'app/selectWidget', 
  async (widget, { fulfillWithValue, rejectWithValue }) => {
    try {
      await asyncStorage.switchWidgetView({ widget })
      return fulfillWithValue(widget)
    } catch (error) {
      console.error(error)
      return rejectWithValue(null)
    }
  }
)

export const getWidgetsList = createAsyncThunk(
  'app/getWidgetsList',
  async (_, { fulfillWithValue, rejectWithValue, getState }) => {
    try {
      const defaultWidgets = getState()?.navigator?.widgets
      const widgets = await asyncStorage.getListWidget({ defaultWidgets })
      return fulfillWithValue(widgets)
    } catch (error) {
      console.error(error)
      return rejectWithValue([])
    }
  }
)

export const showInstruction = createAction('app/showInstruction', (value) => ({ payload: value ?? true}))

export const setViewApp = createAsyncThunk(
  'app/setViewApp', 
  ({ type, value }, { fulfillWithValue, rejectWithValue }) => {  }
)