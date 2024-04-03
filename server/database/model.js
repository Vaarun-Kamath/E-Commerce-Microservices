const mongoose = require('mongoose');
const { customerSchema, productSchema } = require('./schema');

module.exports.User = mongoose.model('customers', customerSchema);

module.exports.Product = mongoose.model('products', productSchema);
