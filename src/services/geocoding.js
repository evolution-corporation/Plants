import { checkMultiple, PERMISSIONS, RESULTS, request as requestPermision} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service'
import { Platform } from 'react-native'

const GOOGLE_MAPS_KEY = 'AIzaSyBWX3KcAZpgVMEv1L70b_CK0T7xA5PSn_4';

async function getAdress(coordinate, language) {
  try {
    const request = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=${GOOGLE_MAPS_KEY}&language=${language}`,
    );
    const json = await request.json();
    console.log(json);
    // Ждем включене билинга
    return {};
  } catch (e) {
    console.error(e);
    return '';
  }
}

async function getCountry(coordinate) {
  try {
    const request = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=${GOOGLE_MAPS_KEY}`,
    );
    const json = await request.json();
    console.log(json);
    // Ждем включене билинга
    return '';
  } catch (e) {
    console.error(e);
    return 'No Country';
  }
}

async function checkPermissions() {
  if (Platform.OS == 'android') {
    try {
      const result = await checkMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION])
      if (result['android.permission.ACCESS_COARSE_LOCATION'] == RESULTS.DENIED)
        result['android.permission.ACCESS_COARSE_LOCATION'] = await requestPermision(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
      if (result['android.permission.ACCESS_FINE_LOCATION'] == RESULTS.DENIED)
        result['android.permission.ACCESS_FINE_LOCATION'] = await requestPermision(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

      if (Object.values(result).includes(RESULTS.BLOCKED)) return 'BLOCKED'
      if (Object.values(result).includes(RESULTS.DENIED)) return 'DENIED'
      if (Object.values(result).includes(RESULTS.GRANTED)) return 'GRANTED'
    } catch (error) {
      return 'BLOCKED'
    }
  }
}


function getMyPosition(callback) {
  Geolocation.getCurrentPosition((data)=>callback({ latitude: data.coords.latitude, longitude: data.coords.longitude }), console.error)
}

export default {
  getAdress,
  getCountry,
  checkPermissions,
  getMyPosition
};
