const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Timestamp Microservice is running');
});

// Main API endpoint
app.get('/api/:date?', (req, res) => {
  let { date } = req.params;
  let parsedDate;

  // Handle no date passed (return current time)
  if (!date) {
    parsedDate = new Date();
  } else {
    // Check if it's a UNIX timestamp (only digits)
    if (/^\d+$/.test(date)) {
      parsedDate = new Date(Number(date));
    } else {
      parsedDate = new Date(date);
    }
  }

  // Handle invalid dates
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Send valid response
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
