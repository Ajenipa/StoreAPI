//import all the needed function/classes
const express = require('express')
const errorHandler = require("./middleware/error-handler")
require('dotenv').config()
require('express-async-wrapper')
const connectDB = require("./db/connect")
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 9000
const notFound = require("./middleware/not-found")
const productRouter = require("./routes/product-route")
app.get("/hello", (req,res)=>{
    res.send('my store hom')
})
//route

app.use("/api/v1/products", productRouter)

//middleware
//app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(notFound)
app.use(errorHandler)
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`app is listening on port ${PORT}`)
        })
    }
    catch(error){
        console.log(error)
    }
}
start()


