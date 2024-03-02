const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id : Number,
    pname : String,
    price : Number,
    img : String,
    type : String,
    gender : String,
    quantity : Number,
    buyqt : Number,
})

const product = mongoose.model('product' , productSchema);

module.exports = product;