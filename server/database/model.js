const mongoose = require('mongoose');
const { customerSchema, productSchema, storeSchema } = require('./schema');

module.exports.User = mongoose.model('customers', customerSchema);

module.exports.Product = mongoose.model('products', productSchema);

module.exports.Store = mongoose.model('stores', storeSchema);