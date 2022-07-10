const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(
  express.static(path.resolve(__dirname, '../Work-Weather-Analyzer/public'))
);
app.get('/api', (req, res) => {
  res.json({ message: 'hello from server!' });
});

app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../Work-Weather-Analyzer/public', 'index.html')
  );
});
