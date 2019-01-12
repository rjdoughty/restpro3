const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    menuItem: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ingredients: {
        type: Array
    },
    category: {
        type: String,
        required: true
    },
    selected: {
        type: Boolean,
        default: false
    }

});

var Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;