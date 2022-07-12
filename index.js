const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.post('/post', (req, res) => {
  console.log('connected to React');
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
