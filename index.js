const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const https = require('https');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

let lang = 'en';
let units = 'metric';
let key = 'c4aa91c492141719621c2f09ce2559a3';
const lat = 47.63;
const lon = -52.64;

const options = {
  hostname: `api.openweathermap.org`,
  port: 443,
  path: `/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang${lang}`,
  method: 'GET',
};

app.get('/api', (req, res) => {
  console.log('test');
  let data = '';
  const request = https.request(options, (response) => {
    console.log(`statusCode: ${res.statusCode}`);

    response.on('data', (d) => {
      process.stdout.write(d);
      data = data + d;
    });
  });

  request.on('end', () => {
    res.status(200).json(JSON.parse(data));
  });

  request.on('error', (err) => {
    console.error(err);
    res.status(500).send('internal server error');
  });

  request.end();
});
