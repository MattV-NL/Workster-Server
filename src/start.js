const app = require('./index');
const path = require('path');
const fs = require('fs');
const https = require('https');
require('dotenv').config();
const PORT = process.env.PORT || 8000;

// commented out for dev environment
// since cert is on VM
// const certPath = '/etc/letsencrypt/live/workster.app/fullchain.pem';
// const keyPath = '/etc/letsencrypt/live/workster.app/privkey.pem';
// const httpsOptions = {
//   cert: fs.readFileSync(certPath),
//   key: fs.readFileSync(keyPath),
// };
// https.createServer(httpsOptions, app).listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
