const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  throw new Error('my err');
  res.download('server.js');
  res.render('index', { text: 'world' });
});

console.log(process.env.Foo);

app.listen(3000);
