const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { ObjectId } = require('mongodb');

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

const User = require('./model').User;
const Product = require('./model').Product;
const Store = require('./model').Store;

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
      res.status(404).json({ message: 'User not found' });
    } else if (customerData[0].password === password) {
      res.status(200).json({
        message: {
          user_id: customerData[0]._id.toString(),
          name: customerData[0].name,
          username: customerData[0].username,
          email: customerData[0].email,
        },
      });
    } else {
      res.status(401).json({ message: 'Password Incorrect' });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/getCustomers', async (req, res) => {
  const customersData = await User.find({});
  res.status(200).json({ message: customersData });
});

app.post('/addCustomer', async (req, res) => {
  try {
    // console.log(req.body);
    const { name, username, email } = req.body;
    const newCustomer = await User.create({
      name: name,
      username: username,
      email: email,
    });
    res.status(201).json({ message: 'Customer added successfully' });
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: 'Error adding customer' });
  }
});

app.get('/getAllProducts', async (req, res) => {
  try {
    const productsData = await Product.find({});
    const user = await User.find({
      _id: new ObjectId(req.query.user.user_id),
    });

    const userCart = user[0].cart;
    const modifiedProductsData = productsData.map((product) => {
      const modifiedProduct = { ...product.toObject() }; // Create a new object from the product document
      if (userCart.hasOwnProperty(modifiedProduct._id.toString())) {
        modifiedProduct.addedToCart = true;
      } else {
        modifiedProduct.addedToCart = false;
      }
      return modifiedProduct;
    });

    if (modifiedProductsData.length === 0)
      res.status(404).json({ message: 'No products found' });
    else res.status(200).json({ message: modifiedProductsData });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
});

app.get('/getProduct', async (req, res) => {
  try {
    const id = req.query.id.toString();
    // const iid = ObjectId(id);
    // const productsData = await Product.findById(id);
    const productsData = await Product.find({ _id: new ObjectId(id) });
    if (productsData.length === 0)
      res.status(404).json({ message: 'No products found' });
    else res.status(200).json({ message: productsData });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/addProduct', async (req, res) => {
  try {
    // console.log(req.body);
    const { name, price, quantity, pictureLink } = req.body;
    const newProduct = await Product.create({
      name: name,
      picture: pictureLink,
      price: price,
      quantity: quantity,
    });
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: 'Error adding product' });
  }
});

app.post('/addToCart', async (req, res) => {
  try {
    const customerId = req.body.user.user_id;
    const productId = req.body.productId.toString();
    const quantity = Number(req.body.quantity);
    const customerData = await User.findById(customerId);

    const productStock = await Product.findById(productId);
    if (productStock.quantity < quantity) {
      res.status(400).json({ message: 'Not enough stock' });
      return;
    }
    let prevQuantity = customerData.cart[productId] || 0;
    let newPrice =
      customerData.cart.price + productStock.price * (quantity - prevQuantity);
    await User.updateOne(
      { _id: new ObjectId(customerId) },
      {
        $set: {
          [`cart.${productId}`]: quantity,
          [`cart.price`]: newPrice,
        },
      }
    );
    res.status(200).json({ message: 'Product added to cart' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error adding product to cart(server error)' });
  }
});

app.delete('/removeFromCart', async (req, res) => {
  try {
    const customerId = req.query.user.user_id;
    const productId = req.query.productId.toString();

    const customer = await User.findById(customerId);
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }
    if (!customer.cart[productId]) {
      res.status(404).json({ message: 'Product not found in cart' });
      return;
    }
    const product = await Product.findById(productId);
    const newPrice =
      customer.cart.price - product.price * customer.cart[productId];
    const newCart = Object.keys(customer.cart).reduce((acc, key) => {
      if (key === 'price') {
        acc[key] = newPrice;
      } else if (key !== productId) {
        acc[key] = customer.cart[key];
      }
      return acc;
    }, {});
    await User.updateOne(
      { _id: new ObjectId(customerId) },
      {
        $set: {
          cart: newCart,
        },
      }
    );
    res.status(200).json({ message: 'Product removed from cart' });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'Error removing product from cart' });
  }
});

app.patch('/setItemQuantity', async (req, res) => {
  try {
    console.log('req.Body: ', {
      ...req.body,
      user: req.body.user,
    });
    const customerId = req.body.user.user_id;
    const productId = req.body.productId.toString();

    const customer = await User.findById(customerId);
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }
    if (!customer.cart[productId]) {
      res.status(404).json({ message: 'Product not found in cart' });
      return;
    }
    const product = await Product.findById(productId);
    if (req.body.quantity > product.quantity) {
      res.status(400).json({ message: 'Not enough stock' });
      return;
    }
    const newPrice =
      customer.cart.price -
      product.price * customer.cart[productId] +
      product.price * req.body.quantity;
    const newCart = Object.keys(customer.cart).reduce((acc, key) => {
      if (key === 'price') {
        acc[key] = newPrice;
      } else if (key === productId) {
        acc[key] = req.body.quantity;
      } else {
        acc[key] = customer.cart[key];
      }
      return acc;
    }, {});
    const checkoutCart = await getProductsinCart(newCart);
    res.status(200).json({ message: checkoutCart });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'Error updating product quantity' });
  }
});

app.post('/makePayment', async (req, res) => {
  try {
    // const customerId = req.user.user_id;
    const customerId = '660927aa2a095a0885ad20e7';
    // req.body.customerId.toString();
    // const amount = Number(req.body.amount);
    const customerData = await User.findById(customerId);

    const newCart = customerData['cart'];
    const currentDate = new Date();

    Object.keys(customerData['cart']).forEach(async (itemId) => {
      if (itemId === 'price') return;

      let product = await Product.findById(itemId);
      if (!product) {
        console.error(`Product with ID ${itemId} not found.`);
        return;
      }

      product.quantity -= customerData['cart'][itemId];
      await product.save(); // Save the updated product to the database
    });

    await Store.create({
      customerId: customerId,
      cart: newCart,
      amountPaid: customerData['cart']['price'],
      payment_status: 'paid',
      date_of_payment: currentDate,
    });

    await User.replaceOne(
      { _id: new ObjectId(customerId) },
      {
        name: customerData.name,
        username: customerData.username,
        email: customerData.email,
        password: customerData.password,
        cart: { price: 0 },
      }
    );
    res.status(200).json({
      message: 'Payment Successful... Your order will be delivered soon',
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/getOrders', async (req, res) => {
  try {
    // const customerId = req.user.user_id;
    const customerId = '660927aa2a095a0885ad20e7';
    // req.body.customerId.toString();
    const orders = await Store.find(
      { customerId: customerId },
      { amountPaid: 1, date_of_payment: 1, _id: 1 }
    );
    if (orders.length === 0) {
      res.status(404).json({ message: 'No orders found' });
    } else {
      res.status(200).json({ message: orders });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/getOrder', async (req, res) => {
  try {
    // const customerId = req.user.user_id;
    const customerId = '660927aa2a095a0885ad20e7';
    // req.body.customerId.toString();
    const order_id = req.query.order_id.toString();
    const order = await Store.findOne({
      _id: new ObjectId(order_id),
      customerId: customerId,
    });
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    const result = await getProductsinCart(order['cart']);
    // result.push({ amountPaid: order['amountPaid'] });
    res.status(200).json({ message: result });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'DB Internal Server Error' });
  }
});

app.get('/getCartItems', async (req, res) => {
  try {
    const customerId = req.query.user.user_id;
    const customerData = await User.findById(customerId);

    if (customerData.length === 0) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }
    const checkoutCart = await getProductsinCart(customerData['cart']);
    res.status(200).json({ message: checkoutCart });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
});

app.post('/placeOrder', async (req, res) => {
  try {
    const { user_id } = req.body;
    const customerData = await User.findById(user_id);
    if (!customerData) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }
    const cart = customerData.cart;
    if (cart.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
      return;
    }
    for (let i = 0; i < cart.length; i++) {
      const product_id = cart[i].product_id;
      const product = await Product.findById(product_id).select('quantity');
      if (product.quantity < cart[i].quantity) {
        res.status(400).json({ message: 'Not enough stock' });
        return;
      }
    }
    for (let i = 0; i < cart.length; i++) {
      const product_id = cart[i].product_id;
      const product = await Product.findById(product_id).select('quantity');
      const newQuantity = product.quantity - cart[i].quantity;
      await Product.findByIdAndUpdate(product_id, { quantity: newQuantity });
    }
    await User.findByIdAndUpdate(user_id, { cart: [] });
    res.status(200).json({ message: 'Order placed successfully' });
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: 'Error placing order' });
  }
});

async function getProductsinCart(cart) {
  try {
    var checkoutCart = {
      items: [],
      price: cart['price'],
    };

    const cartKeys = Object.keys(cart);

    for (const itemId of cartKeys) {
      if (itemId === 'price') {
        continue;
      }

      const product = await Product.findById(itemId);

      if (!product) {
        console.error(`Product with ID ${itemId} not found.`);
        continue;
      }

      checkoutCart.items.push({
        itemId: product._id.toString(),
        name: product.product,
        description: product.product,
        image: product.picture,
        price: product.price * cart[itemId],
        quantity: cart[itemId],
      });
    }

    return checkoutCart;
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

app.listen(PORT, () => {
  console.log('Server is running on port 8080');
});
