import { SERVER_URL } from '../constants';

export const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

export const getCoordinates = async (pos, units) => {
  const crd = pos.coords;
  const lat = crd.latitude;
  const lon = crd.longitude;
  const apiUrl = `${SERVER_URL.weather}${lat},${lon},${units}`;
  const response = await fetch(apiUrl);
  return await response.json();
};

export const sendCoordinatesGeolocate = async (pos, user_id) => {
  const crd = pos.coords;
  const lat = crd.latitude.toPrecision(6);
  const lon = crd.longitude.toPrecision(6);
  const coordsJSON = {
    user_id: user_id,
    lat: lat,
    lon: lon,
  };
  const sendResponse = await fetch(SERVER_URL.saveLocation, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(coordsJSON),
  });
  const sendData = await sendResponse.json();
  console.log(sendData, 'geolocate');
};

export const sendCoordinatesManual = async (latitude, longitude, user_id) => {
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  const coordsJSON = {
    user_id: user_id,
    lat: lat,
    lon: lon,
  };
  const sendResponse = await fetch(SERVER_URL.saveLocation, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(coordsJSON),
  });
  const sendData = await sendResponse.json();
  console.log(sendData, 'manual input');
};

export const manualLocationInput = async (latitude, longitude, units) => {
  const crd = {
    latitude: latitude,
    longitude: longitude,
  };
  const apiURL = `${SERVER_URL.weather}${crd.latitude},${crd.longitude},${units}`;
  const response = await fetch(apiURL);
  return response.json();
};
