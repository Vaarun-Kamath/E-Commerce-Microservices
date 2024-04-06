// Simple express server which returns working server on '/'

const cors = require('cors');
const axios = require('axios');
const express = require('express');
const dotenv = require('dotenv');
const { stat } = require('fs');

dotenv.config({ path: './.env' });

const app = express();

const PORT = process.env.PORT;

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Products Server is working' });
});

app.get('/getProducts', async (req, res) => {
  try {
    await axios
      .get(`${process.env.DB_SERVER}/getAllProducts`)
      .then((response) => {
        console.log(response.data);
        res
          .status(response.status)
          .json({ content: response.data.message, status: response.status });
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getProduct', async (req, res) => {
  try {
    await axios
      .get(`${process.env.DB_SERVER}/getProduct`, {
        params: {
          id: req.query.id,
        },
      })
      .then((response) => {
        console.log(response.data);
        res
          .status(response.status)
          .json({ content: response.data.message, status: response.status });
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/addtocart', async (req, res) => {
  const reqbody = req.body;
  // const response = await axios.post(`${process.env.DB_SERVER}/addtocart`, reqbody);
  // res.status(response.status).json({content: response.data.message, status: response.status});
  await axios
    .post(`${process.env.DB_SERVER}/addtocart`, reqbody)
    .then((response) => {
      res
        .status(response.status)
        .json({ content: response.data.message, status: response.status });
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ content: 'Internal server error', status: 500 });
    });
});

app.get('/viewCart', async (req, res) => {
  try {
    await axios
      .get(`${process.env.DB_SERVER}/viewCart`)
      .then((response) => {
        res.status(response.status).json({
          content: response.data.message,
          status: response.status,
        });
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Why Internal server error' });
  }
});

app.get('/sendRequest', async (req, res) => {
  try {
    await axios
      .get(`${process.env.DB_SERVER}/getCustomers`)
      .then((response) => {
        res.status(200).json(response.data.message[0]);
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Products server is running on http://localhost:${PORT}`);
});
