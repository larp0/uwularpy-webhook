const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('uwularpy webhook server is running!');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
