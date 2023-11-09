const mongoose=require('mongoose')
const { CategoriesModel } = require('./categories.model')
const ProductSchema=mongoose.Schema({
    title:{type:String,require:true},
    price:{type:Number,require:true},
    description:{type:String,require:true},
    availability:{type:Boolean,require:true},
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CategoriesModel,
      },
})  
const ProductModel=mongoose.model('Product',ProductSchema)
module.exports={
    ProductModel
}
