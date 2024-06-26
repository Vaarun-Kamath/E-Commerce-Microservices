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
  res.status(200).json({ message: 'Customer Server is working' });
});

// app.post('/login', (req, res) => {
//   console.log('Login Request recieved');
//   console.log(req.body);
//   return res.status(200).json({
//     status: 200,
//     successCode: 'Success',
//     content: {
//       user_id: 232,
//       email: 'varun@gmail.com',
//       username: 'varunk',
//     },
//   });
// });

app.post('/login', async (req, res) => {
  try {
    await axios
      .get(`${process.env.DB_SERVER}/checkUser`, {
        params: {
          email: req.body.email,
          password: req.body.password,
        },
      })
      .then((response) => {
        if (response.status === 401 || response.status === 404) {
          res.status(response.status).json({
            status: response.status,
            successCode: 'Failed',
            content: response.data.message,
          });
        }
        res.status(200).json({
          status: 200,
          successCode: 'Success',
          content: response.data.message,
        });
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
  try {
    res.status(200).json({ message: 'Here are some customers' });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Customer server is running on http://localhost:${PORT}`);
});
