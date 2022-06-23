const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.download('server.js');
  res.render('index', { text: 'world' });
});

app.listen(3000);
