const mongoose = require('mongoose');

module.exports.customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: { type: Array, required: false },
});

module.exports.productSchema = new mongoose.Schema({
  product: { type: String, required: true },
  picture: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
