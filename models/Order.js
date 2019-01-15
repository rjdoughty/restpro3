const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    menuItems: Array,
    price: Number

});

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;