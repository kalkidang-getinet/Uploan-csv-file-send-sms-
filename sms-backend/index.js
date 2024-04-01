const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Replace with your actual SMS API endpoint and credentials
const smsApiUrl = 'http://localhost/send';

app.post('/send-sms', async (req, res) => {
console.log("function is called");
  const { name, phone_number, message } = req.body;

  try {
    const response = await axios.post(smsApiUrl, {
      name,
      phone_number,
      message,
    });

    if (response.data.success) {
      res.json({ message: 'SMS sent successfully!' });
    } else {
      res.status(400).json({ error: response.data.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port =  3003;
app.listen(port, () => console.log(`Server listening on port ${port}`));

