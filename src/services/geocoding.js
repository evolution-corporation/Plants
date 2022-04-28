import * as Location from 'expo-location';

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
      const result = await Location.getForegroundPermissionsAsync()
      if (result.granted) {
        return 'GRANTED'
      } else {
        return 'BLOCKED'
      }

}


function getMyPosition(callback) {
  Location.getForegroundPermissionsAsync().then(({ coord }) =>{callback({ latitude: coord.latitude, longitude: coord.longitude })})

}

export default {
  getAdress,
  getCountry,
  checkPermissions,
  getMyPosition
};
