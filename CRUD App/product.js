const mongoose = require('mongoose');

const productSchema= new mongoose.Schema({
    name:
    {
        type : String,
        required : true
    },
    price:
    {
        type: Number, 
        requireed:true,
        min:0
    },
    category:
    {
        type: String,
        enum: ['fruits','vegetables','dairy']
    }
})

const product = mongoose.model('product',productSchema);

module.exports=product;