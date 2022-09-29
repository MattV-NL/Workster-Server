require('dotenv').config();
const axios = require('axios');
const client = require('@sendgrid/mail');
client.setApiKey(process.env.SENDGRID_API_KEY);

const key = process.env.API_KEY;
const lang = 'en';

const fetchWeatherAlert = async (lat, lon, unit, email, username, index) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}&lang${lang}`
    );

    const sampleAlert = [
      {
        sender_name:
          'NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)',
        event: 'Small Craft Advisory',
        start: 1646344800,
        end: 1646380800,
        description:
          'Some description of weather events in the area. Look at this text to determine how to format it in the email template. Add colors, and possibly the logo for the app. Look into the tags identifier below in openweatherAPI documentation.',
        tags: [],
      },
    ];
    if (response.data.alerts) {
      const response = await client.send({
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
          alert: sampleAlert[0].description,
        },
      });

      if (response.statusCode(202)) {
        return true;
      } else {
        console.log('error', response.status());
        return false;
      }
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
