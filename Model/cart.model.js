const mongoose = require('mongoose')
const {UserModel}=require('../Model/User.model')
const {CartItemModel}=require('../Model/cartItem.model')
const CartSchema=mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
      },
      items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: CartItemModel,
      }],
})  
const CartModel=mongoose.model('Cart',CartSchema)
module.exports={
    CartModel
}



