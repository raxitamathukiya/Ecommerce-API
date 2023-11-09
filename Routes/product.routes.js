const mongoose=require('mongoose')
const express=require('express')
const {ProductModel}=require('../Model/Product.model')
const {connection} =require('../config/db')

const ProductRoutes=express.Router()
/**
* @swagger
* components:
*   schemas:
*       Product:
*       type: object
*       properties:
*           id:
*               type: string
*               description: The auto-generated id of the user
*           title:
*               type: string
*               description: The product title
*           price:
*               type: number
*               description: The product price
*           description:
*               type: string
*               description: The product description
*           availability:
*               type: number
*               description: The product availability value
*           categoryId:
*               type: string
*               description: The product categoryId
*/
/**
 * @swagger
 * tags:
 *  name: Product
 *  description: All the API routes realeted the Product
 */

/**
 * @swagger
 * /product/add:
 *  post:
 *      summary: This will Add new product from DataBase
 *      tags: [Product]
 *      responses:
 *          200:
 *              description: Add New Product 
 *          400:
 *              description: Inccorect Request!!!!
 */
/**
 * @swagger
 * /product/view/:categoryId:
 *  get:
 *      summary: This will show product based on categoryID
 *      tags: [Product]
 *      responses:
 *          200:
 *              description: All Product 
 *          400:
 *              description: Inccorect Request!!!!
 */
/**
 * @swagger
 * /product/Productview/:productId:
 *  get:
 *      summary: This will show product based on productID
 *      tags: [Product]
 *      responses:
 *          200:
 *              description:  Product 
 *          400:
 *              description: Inccorect Request!!!!
 */
ProductRoutes.post('/add',async(req,res)=>{
    try {
const { title,price,description,availability,categoryId } = req.body;
        const adddata=new ProductModel({title,price,description,availability,categoryId })
        await adddata.save()
        res.status(200).json({ msg: 'Product data added successfully' });
     
    } catch (error) {
        res.status(400).json({
            isError:true,
            msg:"Something went wrong !!!!",
            error:error
        });
    }
})

ProductRoutes.get('/view/:categoryId',async(req,res)=>{
    
        try {
            const categoryId = req.params.categoryId;
            const products = await ProductModel.find({ categoryId });
        
            res.json(products);
    } catch (error) {
        res.status(400).json({
            isError:true,
            msg:"Something went wrong !!!!",
            error:error
        });
    }
})

ProductRoutes.get('/Productview/:productId',async(req,res)=>{
    
    try {
        const productId = req.params.productId;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
} catch (error) {
    res.status(400).json({
        isError:true,
        msg:"Something went wrong !!!!",
        error:error
    });
}
})
module.exports={
    ProductRoutes

}
