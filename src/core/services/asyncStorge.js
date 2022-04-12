import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

async function getValue(key) {
  const i = JSON.parse(await AsyncStorage.getItem(key));
  return i;
}

async function setValue(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

async function addArrayValue(key, value) {
  const array = JSON.parse(await AsyncStorage.getItem(key)) ?? []
  array.push(value)
  await AsyncStorage.setItem(key, JSON.stringify(array))
}

async function deleteArrayValue(key, id) {
  let array = JSON.parse(await AsyncStorage.getItem(key)) ?? []
  if (array.length > 0)
  
  switch (typeof array[0]) {
    case 'object':
      array = array.filter((item) => (id != item.id))
      break;
    case 'string':
      array = array.filter((item) => (id != item))
      break
    default:
      break;
  }
  await AsyncStorage.setItem(key, JSON.stringify(array))
}


async function isFirstLoading(value) {
  if (value !== undefined) {
    setValue('@isFirstLoading', value);
  } else {
    const result = await getValue('@isFirstLoading')
    return typeof result !== 'boolean' ? true : result;
  }
}

async function saveMarker({ coordinate, dateDelete }) {
  const id = uuid.v4()
  const marker = {
    coordinate,
    dateDelete,
    id
  }
  await addArrayValue('@reserveMarker', marker)
  return marker
}

async function getReserveMarker() {
  const markers = await getValue('@reserveMarker')
  let filtersMarkers = null
  if (markers) {
    filtersMarkers = markers.filter((item) => (item.dateDelete > Date.now()))
  } else {
    filtersMarkers = []
  }
  await setValue('@reserveMarker', filtersMarkers)
  return filtersMarkers
}

async function deleteReseveMarker(id) {
  await deleteArrayValue('@reserveMarker', id)
}

async function getLanguage() {
  return await getValue('@language')
}

async function setLanguage(language) {
  await setValue('@language', language)
}

async function switchWidgetView({ widget }) {
  const widgets = await getValue('@Widget')
  if (Array.isArray(widgets)) {
    if (widgets.includes(widget)) {
      await deleteArrayValue('@Widget', widget)
    } else {
      await addArrayValue('@Widget', widget)
    }
  }
}

async function getListWidget({ defaultWidgets=[] }) {
  const widgets = await getValue('@Widget')
  if (!widgets && Array.isArray(defaultWidgets)) {
    await setValue('@Widget', defaultWidgets)
    return defaultWidgets
  }
  return widgets ?? []
}

export default {
  isFirstLoading,
  saveMarker,
  getReserveMarker,
  deleteReseveMarker,
  getLanguage,
  setLanguage,
  switchWidgetView,
  getListWidget
};
