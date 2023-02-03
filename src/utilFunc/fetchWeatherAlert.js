const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config({ path: '../.env' });
const client = require('@sendgrid/mail');
client.setApiKey(process.env.SENDGRID_API_KEY);
const millisToDate = require('./millisToDate');

const key = process.env.API_KEY;
const lang = 'en';

const fetchWeatherAlert = async (lat, lon, unit, email, username) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}&lang${lang}`
    );
    if (response.data.alerts) {
      response.data.alerts.forEach(async (alert) => {
        await client.send({
          to: {
            email,
            name: username,
          },
          from: {
            email: process.env.SENDGRID_SENDER_EMAIL,
            name: 'Workster',
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
      return {
        message: 'email sent',
        success: true,
      };
    } else {
      return {
        message: 'no active weather alert and no email sent',
        success: false,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: 'oops something went wrong',
      success: false,
    };
  }
};

module.exports = fetchWeatherAlert;
