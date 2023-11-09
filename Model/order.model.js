
const mongoose = require('mongoose');
const {UserModel}=require('../Model/User.model')
const {ProductModel}=require('../Model/Product.model')
const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ProductModel,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = {OrderModel};
