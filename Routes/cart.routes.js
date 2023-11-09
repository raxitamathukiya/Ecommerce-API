const mongoose=require('mongoose')
const express=require('express')
const {CartModel}=require('../Model/cart.model')
const {CartItemModel}=require('../Model/cartItem.model')
const {ProductModel}=require('../Model/Product.model')
const {connection} =require('../config/db')
const {authMiddleware}=require('../Middleware/Auth.middleware')
const CartRoutes=express.Router()


/**
* @swagger
* components:
*   schemas:
*       cart:
*       type: object
*       properties:
*           id:
*               type: string
*               description: The auto-generated id of the cart
*           product:
*               type: string
*               description: The product id
*           quantity:
*               type: number
*               description: The quantity number
*/
/**
 * @swagger
 * tags:
 *  name: cart
 *  description: All the API routes realeted the cart
 */

/**
 * @swagger
 * /cart/add:
 *  post:
 *      summary: This will Add new cart from DataBase
 *      tags: [cart]
 *      responses:
 *          200:
 *              description: Add New cart 
 *          400:
 *              description: Inccorect Request!!!!
 */
/**
 * @swagger
 * /cart/view:
 *  get:
 *      summary: This will show cart Data
 *      tags: [cart]
 *      responses:
 *          200:
 *              description: All Cart 
 *          400:
 *              description: Inccorect Request!!!!
 */
/**
 * @swagger
 * /cart/update/:cartItemId:
 *  put:
 *      summary: This will update cart data
 *      tags: [cart]
 *      responses:
 *          200:
 *              description:  Update 
 *          400:
 *              description: Inccorect Request!!!!
 */
/**
 * @swagger
 * /cart/remove/:cartItemId:
 *  delete:
 *      summary: This will Delete cart data
 *      tags: [cart]
 *      responses:
 *          200:
 *              description:  Delete 
 *          400:
 *              description: Inccorect Request!!!!
 */

CartRoutes.post('/add', authMiddleware, async (req, res) => {
    try {
      const userId = req.body.user._id;
      const { product, quantity } = req.body;
      console.log(req.body)
      const products = await ProductModel.findById(product);
      if (!products) {
        return res.status(404).json({ error: 'Product not found' });
      }
      let cart = await CartModel.findOne({ user: userId });
      if (!cart) {
        cart = new CartModel({ user: userId, items: [] });
      }
      const existingCartItem = cart.items.find(item => item.products.equals(product));
  
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        const data=new CartItemModel({product,quantity})
        await data.save()
        cart.items.push(data._id);
      }
      await cart.save();
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add the product to the cart' });
    }
  });
  CartRoutes.get('/view', authMiddleware, async (req, res) => {
    try {
      const userId = req.body.user._id; 
  
      const cart = await CartModel.findOne({ user: userId }).populate('items.product');
      if (!cart) {
        return res.json({ items: [] });
      }
  
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve the cart' });
    }
  });
  
  CartRoutes.put('/update/:cartItemId', authMiddleware, async (req, res) => {
    try {
      const userId = req.body.user._id; 
      const cartItemId = req.params.cartItemId;
      const newQuantity = req.body.quantity;
  
      const cart = await CartModel.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      const cartItem = cart.items.id(cartItemId);
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
  
      cartItem.quantity = newQuantity;
  
      await cart.save();
  
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update the cart item' });
    }
  });

  CartRoutes.delete('/remove/:cartItemId', authMiddleware, async (req, res) => {
    try {
      const userId = req.body.user._id;
      const cartItemId = req.params.cartItemId;
  
      const cart = await CartModel.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      const cartItem = cartItemId;
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
  
      const data=await CartItemModel.findByIdAndDelete(cartItem)
  
      await cart.save();
  
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to remove the cart item' });
    }
  });
module.exports={
    CartRoutes

}
