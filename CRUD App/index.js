const express = require("express");
const app = express();
const path = require('path');
const methodoverride=require('method-override');
const mongoose = require('mongoose');
const product = require('./product');
app.use(methodoverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.json());

//connect mongoose to the database database
mongoose
.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(
    console.log('Connected to the database !'))
.catch(
    err =>{console.log('Unable to connect to the database !', err)}
);

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log("Connected")
// });

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs')

app.get('/products', async (req,res)=>{
    const Products= await product.find({})
    res.render('index.ejs',{ Products })
})
app.get('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const Product = await product.findById(id)
    res.render('show.ejs',{Product})
})

app.get('/productsNew',(req,res)=>{
    res.render('new.ejs');
})

app.post('/products',async (req,res)=>{
    const newproduct=new product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    });
    newproduct.save().then(
        console.log("New product added to DB")
    ).catch( err =>{
        console.log("Unable to add product to DB. Error : ",err)
    });
    console.log(newproduct)
    res.redirect('/products')
})

app.get('/products/edit/:id',async (req, res)=>{
    const { id }= req.params;
    const Product = await product.findById(id);
    res.render('edit.ejs',{ Product })
})

app.put('/products/:id', async (req,res)=>{
    const {id}=req.params;
    const Product = await product.findByIdAndUpdate(id,req.body,{runValidators:true});
    res.render('show.ejs',{Product});
})
app.delete('/products/:id',async (req,res)=>{
    const {id}=req.params;
    const deletedPoduct=await product.findByIdAndRemove(id)
    console.log(deletedPoduct)
    res.redirect('/products')
})
app.listen(3000,()=>{
    console.log("Port 3000 activated");
})

