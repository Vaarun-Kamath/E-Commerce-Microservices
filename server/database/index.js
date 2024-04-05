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
    // const iid = ObjectId(id);
    // const productsData = await Product.findById(id);
    const productsData = await Product.find({ _id: new ObjectId(id) });
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

// app.post('/addToCart', async (req, res) => {
//   try {
//     const { user_id, product_id } = req.body;
//     const quantity = Number(req.body.quantity);

//     const customerData = await User.findById(user_id);
//     if (!customerData) {
//       res.status(404).json({ message: 'Customer not found' });
//       return;
//     }
//     const productStock = await Product.findById(product_id).select('quantity');
//     if (productStock.quantity < quantity) {
//       res.status(400).json({ message: 'Not enough stock' });
//       return;
//     }
//     const newCart = customerData.cart;
//     if (newCart.some((item) => item.product_id === product_id)) {
//       const index = newCart.findIndex((item) => item.product_id === product_id);
//       if (quantity === 0) {
//         newCart.splice(index, 1);
//         console.log(newCart);
//       } else newCart[index].quantity = quantity;
//     } else {
//       newCart.push({ product_id: product_id, quantity: quantity });
//     }
//     await User.findByIdAndUpdate(user_id, { cart: newCart });
//     res.status(200).json({ message: 'Product added to cart' });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: 'Error adding product to cart' });
//   }
// });

app.post('/addtocart', async (req, res) => {
  try {
    // const customerId = req.user.user_id;
    const customerId = req.body.customerId.toString(); //for testing purposes only
    // '660927aa2a095a0885ad20e7';
    const productId = req.body.productId.toString();
    const quantity = Number(req.body.quantity);
    const customerData = await User.findById(customerId);
    // console.log("Customer data: "+customerData);
    // if (customerData.length === 0) {
    //   res.status(404).json({ message: 'Customer not found' });
    //   return;
    // }

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
  } catch {
    console.log(err);
    res.status(400).json({ message: 'Error adding product to cart' });
  }
});

app.post('/makePayment', async (req, res) => {
  try {
    // const customerId = req.user.user_id;
    const customerId = req.body.customerId.toString();
    // const amount = Number(req.body.amount);
    const customerData = await User.findById(customerId);
    // if (customerData.cart.price !== amount) {
    //   res.status(400).json({ message: 'Amount mismatch' });
    //   return;
    // }

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

    // for(let i of customerData['cart']){
    //   let product = await Product.findById(i);
    //   product.quantity -= customerData['cart'][i];
    //   await Product.replaceOne({ _id: new ObjectId(i) }, product);
    // }

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
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

async function getProductsinCart(cart) {
  try {
    // const customerData = await User.findById(customerId);
    let orders = [];

    for (const itemId of Object.keys(cart)) {
      if (itemId === 'price') {
        orders.push({ price: cart['price'] });
      } else {
        let product = await Product.findById(itemId);
        if (!product) {
          console.error(`Product with ID ${itemId} not found.`);
          continue; // Skip to the next iteration if product is not found
        }
        orders.push({
          product_id: product._id,
          product_name: product.name,
          product_picture: product.picture,
          product_price: product.price,
          product_quantity: cart[itemId],
        });
      }
    }

    return orders;
  } catch (err) {
    console.log(err);
    return 'Error';
  }
}

app.get('/getOrders', async (req, res) => {
  try {
    const customerId = req.body.customerId.toString();
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
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/getOrder', async (req, res) => {
  try {
    const order_id = req.query.order_id.toString();
    const order = await Store.findById(order_id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    } 
    const result = await getProductsinCart(order['cart']);
    result.push({ amountPaid: order['amountPaid'] });
    res.status(200).json({ message: result });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/viewCart', async (req, res) => {
  try {
    const customerId = req.body.customerId.toString();
    const customerData = await User.findById(customerId);
    if (customerData.length === 0) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }
    const orders = await getProductsinCart(customerData['cart']);
    if (orders === 'Error') {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: orders });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on port 8080');
});
