// Simple express server which returns working server on '/'

const cors = require('cors');
const axios = require('axios');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

const PORT = process.env.PORT;

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Store Server is working' });
});

app.get('/bills', (req, res) => {
  res.status(200).json({ message: 'Getting all bills' });
});

app.get('/sendRequest', async (req, res) => {
  try {
    await axios
      .get(`${process.env.DB_SERVER}/getCustomers`)
      .then((response) => {
        // console.log(response.data);
        res.status(200).json(response.data.message);
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/customer', async (req, res) => {
  try {
    await axios
      .get(`${process.env.CUSTOMER_SERVER}/sendRequestCustomer`)
      .then((response) => {
        // console.log(response);
        res.status(200).json(response.data.message);
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/makePayment', async (req, res) => {
  try {
    await axios
      .post(`${process.env.DB_SERVER}/makePayment`, req.body)
      .then((response) => {
        // console.log(response);
        res
          .status(200)
          .json({ content: response.data.message, status: response.status });
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getOrders', async (req, res) => {
  try {
    await axios
      .get(`${process.env.DB_SERVER}/getOrders`, req.body)
      .then((response) => {
        // console.log(response);
        res
          .status(200)
          .json({ content: response.data.message, status: response.status });
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getOrder', async (req, res) => {
  try {
    await axios
      .get(`${process.env.DB_SERVER}/getOrder`, { params: req.query })
      .then((response) => {
        // console.log(response);
        res
          .status(200)
          .json({ content: response.data.message, status: response.status });
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'MS Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Store server is running on http://localhost:${PORT}`);
});
