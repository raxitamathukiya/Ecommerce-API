const express=require('express')
const {CategoriesModel}=require('../Model/categories.model')
const {connection} =require('../config/db')
const categoriesRoutes=express.Router()

/**
* @swagger
* components:
*   schemas:
*       categories:
*       type: object
*       properties:
*           id:
*               type: string
*               description: The auto-generated id of the user
*           name:
*               type: string
*               description: The categories name
*          
*/
/**
 * @swagger
 * tags:
 *  name: Product
 *  description: All the API routes realeted the categories
 */

/**
 * @swagger
 * /categories/add:
 *  post:
 *      summary: This will Add new categories from DataBase
 *      tags: [categories]
 *      responses:
 *          200:
 *              description: Add New categories 
 *          400:
 *              description: Inccorect Request!!!!
 */
/**
 * @swagger
 * /categories/view:
 *  get:
 *      summary: This will show categories Data
 *      tags: [categories]
 *      responses:
 *          200:
 *              description: All categories 
 *          400:
 *              description: Inccorect Request!!!!
 */

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
