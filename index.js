const express = require("express");
const {connection}=require("./config/db");
const {ProductRoutes}=require('./Routes/product.routes')
const {userRoutes}=require('./Routes/user.routes')
const {CartRoutes}=require('./Routes/cart.routes')
const {Orderrouter}=require('./Routes/order.routes')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config()
const {categoriesRoutes}=require("./Routes/categories.routes");
const cors = require('cors');

const app = express();
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Ecommerce API Documentation',
        version: '1.0.0',
      },
    },
    apis: ['./Routes/*.js'],
  };
  
  const openapiSpecification = swaggerJsdoc(options);
  app.use("/EcommerceAPI",swaggerUi.serve,swaggerUi.setup(openapiSpecification))
app.use(cors());
app.get('/',async(req,res)=>{
    try {
       res.send('Welcome to Ecommerce API') 
    } catch (error) {
        console.log(error)
    }
})
app.use(express.json());
app.use('/user',userRoutes)
app.use('/categories',categoriesRoutes)
app.use('/product',ProductRoutes)
app.use('/cart',CartRoutes)
app.use('/order',Orderrouter)
app.listen(process.env.PORT,async()=>{
    try {
        connection;
        console.log("connected to DB");
        console.log("server is running"); 
    } catch (err) {
        throw new Error("failed to connect");
    }
})
