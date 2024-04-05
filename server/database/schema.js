const mongoose = require('mongoose');

module.exports.customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: Object, required: false },
  },
  { timestamps: true }
);

module.exports.productSchema = new mongoose.Schema(
  {
    product: { type: String, required: true },
    picture: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports.storeSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true },
    cart: { type: Object, required: false },
    amountPaid: { type: Number, required: true },
    payment_status: { type: String, required: true },
    date_of_payment: { type: Date, required: true },
  },
  { timestamps: true }
);
