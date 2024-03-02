const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
app.use( require("express").json() );

// Schema for data enteries 
const subscriber = require('./models/subscriber');
const cart = require('./models/cart');
const product = require('./models/product')

const port = 8000;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/huskies')
}

app.get('/api/womenproduct',async (req, res) => {
    const data = await product.find();
    res.json(data);
});



//static stuff
app.use('/static' , express.static("static"));
app.use(express.urlencoded());

//pug stuff
app.set('view engine', 'pug');
app.set('views' , path.join(__dirname , 'views'));

//basic get for htmls
app.get('/' , (req , res)=>{
    res.status(200).render('index.pug');
});
app.get('/men' , (req , res)=>{
    res.status(200).render('men.pug');
});
app.get('/women' , (req , res)=>{
    res.status(200).render('women.pug');
});
app.get('/teenager' , (req , res)=>{
    res.status(200).render('teenager.pug');
});


app.get('/womenproduct' , (req , res)=>{
    const gender = 'women'
    res.status(200).render('product.pug' ,{ gender });
});
app.get('/menproduct' , (req , res)=>{
    const gender = 'men'
    res.status(200).render('product.pug' ,{ gender });
});





app.get('/cart' , (req , res)=>{
    res.status(200).render('cart.pug');
});
app.get('/checkoutpage' , (req , res)=>{
    res.status(200).render('checkout.pug');
});




app.post('/men' , (req , res)=>{
    var subs = new subscriber(req.body);
    subs.save().then(()=>{
        console.log("Email submitted successfully");
         res.status(200).render('men.pug');
    }).catch(()=>{
        console.log("Email could not be saved");
         res.status(400).render("men.pug");
    }) 
});
app.post('/women' , (req , res)=>{
    var subs = new subscriber(req.body);
    subs.save().then(()=>{
        console.log("Email submitted successfully");
         res.status(200).render('women.pug');
    }).catch(()=>{
        console.log("Email could not be saved");
         res.status(400).render("women.pug");
    }) 
});
app.post('/teenagers' , (req , res)=>{
    var subs = new subscriber(req.body);
    subs.save().then(()=>{
        console.log("Email submitted successfully");
         res.status(200).render('teenager.pug');
    }).catch(()=>{
        console.log("Email could not be saved");
         res.status(400).render("teenager.pug");
    }) 
});




app.post("/checkoutpage", (req,res)=>{
    var prod = new cart(req.body);
    prod.save().then(()=>{
        prod.products.forEach(async (cartItem) => {
            try {
              const produc = await product.findOne({ id: cartItem.id });
          
              if (!produc) {
                console.log(`Product with ID ${cartItem.id} not found.`);
                return;
              }
          
          
              // Update the product's stock quantity
              produc.quantity -= cartItem.buyqt;
          
              // Save the updated product
              await produc.save();
              console.log(`Updated stock for product: ${produc.pname}`);
            } catch (err) {
              console.error(err);
            }
          });
        console.log("Email submitted successfully");
         res.status(200).render('checkout.pug');
    }).catch(()=>{
        console.log("Email could not be saved");
         res.status(400).render("checkout.pug");
    }) 
    
});




app.listen(port ,  ()=>{
    console.log(`Site loaded at port ${port}`);
})