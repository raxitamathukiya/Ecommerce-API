const mongoose=require('mongoose')
const express=require('express')
const {ProductModel}=require('../Model/Product.model')
const {connection} =require('../config/db')
const ProductRoutes=express.Router()
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
