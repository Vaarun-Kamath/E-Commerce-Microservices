// Simple express server which returns working server on '/'

const cors = require('cors');
const axios = require('axios');
const express = require('express');
const dotenv = require('dotenv');
const verifyTokenMiddleware = require('./verifyToken');

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
  res.status(200).json({ message: 'Products Server is working' });
});

app.get('/getProducts', verifyTokenMiddleware, async (req, res) => {
  try {
    await axios
      .get(`${process.env.DB_SERVER}/getAllProducts`, {
        params: {
          user: req.user,
        },
      })
      .then((response) => {
        res.status(response.status).json({
          content: response.data.message,
          status: response.status,
          error: response.data.error,
        });
      });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error });
  }
});

app.get('/getProduct', verifyTokenMiddleware, async (req, res) => {
  try {
    await axios
      .get(`${process.env.DB_SERVER}/getProduct`, {
        params: {
          id: req.query.id,
        },
      })
      .then((response) => {
        console.log(response.data);
        res.status(response.status).json({
          content: response.data.message,
          status: response.status,
          error: response.data.error,
        });
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
});

app.post('/addToCart', verifyTokenMiddleware, async (req, res) => {
  try {
    await axios
      .post(`${process.env.DB_SERVER}/addToCart`, {
        ...req.body,
        user: req.user,
      })
      .then((response) => {
        if (response.status === 200) {
          res
            .status(response.status)
            .json({ content: response.data.message, status: response.status });
        } else {
          res.status(500).json({
            content: 'Internal server error STATUS NOT 200',
            status: 500,
          });
        }
      })
      .catch((error) => {
        // console.error('Error:', error);
        res
          .status(500)
          .json({ content: 'Internal server error CATCH ERROR', status: 500 });
      });
  } catch (error) {
    // console.error('Error:', error);
    res
      .status(500)
      .json({ error: 'Internal server error FULL TRY CATCH ERROR' });
  }
});

app.delete('/removeFromCart', verifyTokenMiddleware, async (req, res) => {
  try {
    // console.log('Params: ', {
    //   ...req.query,
    //   user: req.user,
    // });
    await axios
      .delete(`${process.env.DB_SERVER}/removeFromCart`, {
        params: {
          ...req.query,
          user: req.user,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          res
            .status(response.status)
            .json({ content: response.data.message, status: response.status });
        } else {
          res.status(500).json({
            content: 'Internal server error STATUS NOT 200',
            status: 500,
          });
        }
      })
      .catch((error) => {
        // console.error('Error:', error);
        res.status(500).json({
          content: 'Internal server error CATCH ERROR',
          status: 500,
          error,
        });
      });
  } catch (error) {
    // console.error('Error:', error);
    res
      .status(500)
      .json({ error: 'Internal server error FULL TRY CATCH ERROR' });
  }
});

app.get('/viewCart', verifyTokenMiddleware, async (req, res) => {
  try {
    await axios.get(`${process.env.DB_SERVER}/viewCart`).then((response) => {
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

app.get('/getCartItems', verifyTokenMiddleware, async (req, res) => {
  try {
    await axios
      .get(`${process.env.DB_SERVER}/getCartItems`, {
        params: {
          user: req.user,
        },
      })
      .then((response) => {
        res.status(response.status).json({
          content: response.data.message,
          status: response.status,
          error: response.data.error,
        });
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
});

//* Testing Purposes
app.get('/sendRequest', verifyTokenMiddleware, async (req, res) => {
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
