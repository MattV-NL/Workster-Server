const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config({ path: '../.env' });
const client = require('@sendgrid/mail');
client.setApiKey(process.env.SENDGRID_API_KEY);

const key = process.env.API_KEY;
const lang = 'en';

const millisToDate = (millis) => {
  const day = new Date(millis * 1000).getDay() + 1;
  const month = new Date(millis * 1000).getMonth() + 1;
  const year = new Date(millis * 1000).getFullYear();
  const hour = new Date(millis * 1000).getHours();
  const minute = new Date(millis * 1000).getMinutes();

  return `${hour}:${minute}, ${day}-${month}-${year}`;
};

const fetchWeatherAlert = async (lat, lon, unit, email, username) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}&lang${lang}`
    );

    // sample alert for demonstration purposes
    // const demoAlert = true;
    // const sampleAlert = [
    //   {
    //     sender_name:
    //       'NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)',
    //     event: 'Small Craft Advisory',
    //     start: 1646344800,
    //     end: 1646380800,
    //     description:
    //       '...SMALL CRAFT ADVISORY REMAINS IN EFFECT FROM 5 PM THIS\nAFTERNOON TO 3 AM EST FRIDAY...\n* WHAT...North winds 15 to 20 kt with gusts up to 25 kt and seas\n3 to 5 ft expected.\n* WHERE...Coastal waters from Little Egg Inlet to Great Egg\nInlet NJ out 20 nm, Coastal waters from Great Egg Inlet to\nCape May NJ out 20 nm and Coastal waters from Manasquan Inlet\nto Little Egg Inlet NJ out 20 nm.\n* WHEN...From 5 PM this afternoon to 3 AM EST Friday.\n* IMPACTS...Conditions will be hazardous to small craft.',
    //     tags: [],
    //   },
    // ];

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
    } else {
      // if (demoAlert) {
      //   sampleAlert.forEach(async (alert) => {
      //     await client.send({
      //       // hard code an email for demo purposes
      //       to: {
      //         email,
      //         name: username,
      //       },
      //       from: {
      //         email: process.env.SENDGRID_SENDER_EMAIL,
      //         name: 'Workster DEMO',
      //       },
      //       templateId: 'd-d06dbfc9133c4df8b853f49af35dea6e',

      //       dynamicTemplateData: {
      //         sender_name: alert.sender_name,
      //         event: alert.event,
      //         start: millisToDate(alert.start),
      //         end: millisToDate(alert.end),
      //         alert: alert.description,
      //         tag: alert.tags,
      //       },
      //     });
      //   });
      // } else {
      console.log('no active weather alerts');
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = fetchWeatherAlert;
