const connectDB =  require("./db/connect")
require('dotenv').config()
const productsList = require("./productsList.json")
const Products = require("./model/storeModel")
const upload=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Products.deleteMany()
        await Products.create(productsList)
        console.log("products added to the db")
        process.exit(0)
    }
    catch(error){
        console.log(error)
        

    }
}
upload()