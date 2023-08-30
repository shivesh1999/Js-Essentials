const mongoose = require('mongoose');
const product = require('./product');
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected")
})

// const p = new product({
//     name: 'Ruby',
//     price:2,
//     category:'fruits'
// })
// p.save().then(p=>{console.log(p)})

const seedProducts =[{
    name: 'apples',
    price:20,
    category:'fruits'
},
{
    name: 'bringle',
    price:5,
    category:'vegetables'
},
{
    name: 'milk',
    price:15,
    category:'dairy'
},
{
    name: 'orange',
    price:7,
    category:'fruits'
}]
product.insertMany(seedProducts).then(res=>{console.log(res)})