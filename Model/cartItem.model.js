const mongoose = require('mongoose')
const {ProductModel}=require('../Model/Product.model')
const CartItemSchema=mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ProductModel,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
})  
const CartItemModel=mongoose.model('CartItem',CartItemSchema)
module.exports={
    CartItemModel
}



