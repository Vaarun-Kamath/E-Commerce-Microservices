const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

const User = require('./model').User;
const Product = require('./model').Product;

const mongo_url = process.env.MONGO_URL;
const PORT = process.env.PORT || 9001;

async function connect() {
  await mongoose
    .connect(mongo_url, {
      dbName: 'E-Commerce-Database',
    })
    .then(() => console.log('Connected to the database'))
    .catch((error) => console.error(error));
}

connect();

app.get('/checkUser', async (req, res) => {
  try {
    const email = req.query.email;
    const password = req.query.password;
    const customerData = await User.find({ email: email });
    if (customerData.length === 0) {
      res.status(404).json({ msg: 'User not found' });
    } else if (customerData[0].password === password) {
      res.status(200).json({
        msg: {
          user_id: customerData[0]._id.toString(),
          name: customerData[0].name,
          username: customerData[0].username,
          email: customerData[0].email,
        },
      });
    } else {
      res.status(401).json({ msg: 'Password Incorrect' });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/getCustomers', async (req, res) => {
  const customersData = await User.find({});
  res.status(200).json({ msg: customersData });
});

app.post('/addCustomer', async (req, res) => {
  try {
    console.log(req.body);
    const { name, username, email } = req.body;
    const newCustomer = await User.create({
      name: name,
      username: username,
      email: email,
    });
    res.status(201).json({ message: 'Customer added successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error adding customer' });
  }
});

app.get('/getAllProducts', async (req, res) => {
  const productsData = await Product.find({});
  if (productsData.length === 0)
    res.status(404).json({ msg: 'No products found' });
  else res.status(200).json({ msg: productsData });
});

app.get('/getProduct', async (req, res) => {
  try {
    const id = req.query.id.toString();
    const productsData = await Product.findById(id);
    if (productsData.length === 0) 
      res.status(404).json({ msg: 'No products found' });
    else res.status(200).json({ msg: productsData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/addProduct', async (req, res) => {
  try {
    console.log(req.body);
    const { name, price, quantity, pictureLink } = req.body;
    const newProduct = await Product.create({
      name: name,
      picture: pictureLink,
      price: price,
      quantity: quantity,
    });
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error adding product' });
  }
});

app.post('/addToCart', async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const customerData = await User.findById(user_id);
    if (!customerData) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }
    const productStock = await Product.findById(product_id).select('quantity');
    if (productStock.quantity < quantity) {
      res.status(400).json({ message: 'Not enough stock' });
      return;
    }
    const newCart = customerData.cart;
    if (newCart.some((item) => item.product_id === product_id)) {
      const index = newCart.findIndex((item) => item.product_id === product_id);
      if (quantity === 0) {
        newCart.splice(index, 1);
      } else newCart[index].quantity = Number(quantity);
    } else {
      newCart.push({ product_id: product_id, quantity: Number(quantity) });
    }
    await User.findByIdAndUpdate(user_id, { cart: newCart });
    res.status(200).json({ message: 'Product added to cart' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error adding product to cart' });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on port 8080');
});
