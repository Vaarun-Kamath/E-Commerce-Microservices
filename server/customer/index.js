// Simple express server which returns working server on '/'

const cors = require('cors');
const axios = require('axios');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

const PORT = process.env.PORT;

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Customer Server is working' });
});

app.post('/login', (req, res) => {
  console.log('Login Request recieved');
  return res.status(200).json({
    status: 200,
    successCode: 'Success',
    content: {
      user_id: 232,
      email: 'varun@gmail.com',
      username: 'varunk',
    },
  });
});

app.get('/sendRequestCustomer', async (req, res) => {
  try {
    await axios
      .get(`${process.env.DB_SERVER}/getCustomers`)
      .then((response) => {
        // console.log(response.data);
        res.status(200).json(response.data);
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/someCustomers', (req, res) => {
  res.status(200).json({ message: 'Here are some customers' });
});

app.listen(PORT, () => {
  console.log(`Customer server is running on http://localhost:${PORT}`);
});
