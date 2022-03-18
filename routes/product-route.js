const express = require('express')
const productRouter = express.Router()
const {getAllProducts,getAllProductsStatic} = require("../controllers/product-controller")
productRouter.route("/").get(getAllProducts)
productRouter.route("/hellos").get(getAllProductsStatic)
module.exports = productRouter