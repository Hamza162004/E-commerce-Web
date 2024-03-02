const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products : [
      {
          pname : String,
          id : Number,
          buyqt : Number
      }
    ],
    userinfo:{
      name : String,
      email : String,
      tel : String,
      address : String,
      city : String,
      postalcode : String,
    },
    shipping : Number,
    total : Number,
})
  
const cart = mongoose.model('cart', cartSchema);

module.exports = cart;