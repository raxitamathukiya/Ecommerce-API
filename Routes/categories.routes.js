const express=require('express')
const {CategoriesModel}=require('../Model/categories.model')
const {connection} =require('../config/db')
const categoriesRoutes=express.Router()
categoriesRoutes.post('/add',async(req,res)=>{
    try {
    const { name } = req.body;
        const adddata=new CategoriesModel({name})
        await adddata.save()
        res.status(200).json({ msg: ' data added successfully' });
     
    } catch (error) {
        res.status(400).json({
            isError:true,
            msg:"Something went wrong !!!!",
            error:error
        });
    }
})

categoriesRoutes.get('/view',async(req,res)=>{
    try {
        const data= await CategoriesModel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            isError:true,
            msg:"Something went wrong !!!!",
            error:error
        });
    }
})
module.exports={
    categoriesRoutes

}
