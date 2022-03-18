const mongoose =  require("mongoose")
const productSchema = new mongoose.Schema({
    name:{type:String, maxlength:100, required:true, trim:true},
    price:{type:Number},
    company:{type:String},
    rating:{type:Number},
    featured:{type:Boolean, default:false},
    createdAt:{
        type:Date,
        default:Date.now()

    }

})
module.exports = mongoose.model('Products', productSchema)