const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    menuItems: Array,
    price: Number,
    time: String,
    isCompleted: 
        {   type: Boolean,
            default: false 
        }
});

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;