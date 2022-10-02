require('dotenv').config();
const axios = require('axios');
const client = require('@sendgrid/mail');
client.setApiKey(process.env.SENDGRID_API_KEY);

const key = process.env.API_KEY;
const lang = 'en';

const millisToDate = (millis) => {
  const day = new Date(millis * 1000).getDay();
  const month = new Date(millis * 1000).getMonth();
  const year = new Date(millis * 1000).getFullYear();
  const hour = new Date(millis * 1000).getHours();
  const minute = new Date(millis * 1000).getMinutes();

  return `${hour}:${minute}, ${day}-${month}-${year}`;
};

const fetchWeatherAlert = async (lat, lon, unit, email, username, index) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}&lang${lang}`
    );

    if (response.data.alert) {
      response.data.alert.forEach(async (alert) => {
        await client.send({
          to: {
            email,
            name: username,
          },
          from: {
            email: process.env.SENDGRID_SENDER_EMAIL,
            name: 'Work Weather Analyzer App',
          },
          templateId: 'd-d06dbfc9133c4df8b853f49af35dea6e',

          dynamicTemplateData: {
            sender_name: alert.sender_name,
            event: alert.event,
            start: millisToDate(alert.start),
            end: millisToDate(alert.end),
            alert: alert.description,
            tag: alert.tags,
          },
        });
      });
    } else {
      console.log('no active weather alerts', index);
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = fetchWeatherAlert;
