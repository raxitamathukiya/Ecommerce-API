const mongoose=require('mongoose')
const CategoriesSchema=mongoose.Schema({
    name:{type:String,require:true},
})  
const CategoriesModel=mongoose.model('Categories',CategoriesSchema)
module.exports={
    CategoriesModel
}
