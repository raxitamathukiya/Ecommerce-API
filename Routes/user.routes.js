const express=require('express')
const {UserModel}=require('../Model/User.model')
const {connection} =require('../config/db')
const userRoutes=express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {authMiddleware}=require('../Middleware/Auth.middleware')

/**
* @swagger
* components:
*   schemas:
*       User:
*       type: object
*       properties:
*           id:
*               type: string
*               description: The auto-generated id of the user
*           name:
*               type: string
*               description: The user name
*           email:
*               type: string
*               description: The user email
*           password:
*               type: string
*               description: password the user
*/


/**
 * @swagger
 * tags:
 *  name: User
 *  description: All the API routes realeted the Users
 */

/**
 * @swagger
 * /user/register:
 *  post:
 *      summary: This will Add new user from DataBase
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Add New user 
 *          400:
 *              description: Inccorect Request!!!!
 */
/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: This will check user exits or not
 *      tags: [User]
 *      responses:
 *          200:
 *              description: login successfully 
 *          400:
 *              description: Inccorect Request!!!!
 */
userRoutes.post('/register',async(req,res)=>{
    try {
    const { name, email, password } = req.body;
    const userExists = await UserModel.findOne({email});
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    bcrypt.hash(password, 10, async(err, hash)=> {
        const adddata=new UserModel({name,email,password:hash })
        await adddata.save()
        res.status(200).json({ msg: 'User created successfully' });
    }); 
    } catch (error) {
        res.status(400).json({
            isError:true,
            msg:"Something went wrong !!!!",
            error:error
        });
    }
})

userRoutes.post('/login',async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }); 
        if (!user) {
          return res.status(401).json({ msg: 'Invalid username or password' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          return res.status(401).json({ msg: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id}, process.env.SecretKey, {
          expiresIn: '7d'
        });
        res.status(200).json({ msg: 'Login Successfully' ,token:token,name:user.name,userid:user._id});
      } catch (error) {
        res.status(400).json({
            isError:true,
            msg:"Something went wrong !!!!",
            error:error
        });
      }

})
module.exports={
    userRoutes

}
