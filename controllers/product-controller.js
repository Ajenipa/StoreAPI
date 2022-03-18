const Products = require("../model/storeModel")
const getAllProducts=async(req,res)=>{
    const {name,company,featured,sort,fields,numericFilter} = req.query

    let queryObject = {}
    if(name){
        queryObject.name = {$regex:name, $options:"i"}
    }
    if(company){
        queryObject.company = {$regex:company, $options:"i"}
    }
    if(featured){
        queryObject.featured = featured === "true"?true:false
    }
    if(numericFilter){
        const operatorMap = {
            ">":"$gt",
            "<":"$lt",
            ">=":"$gte",
            "<=":"$lte",
            "=":"$eq"
    }
    const regEx = /\b(>|<|>=|<=|=)\b/g
    let filter=numericFilter.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        console.log(filter)
        const options=["price", "rating"]
        filter = filter.split(",").forEach((item)=>{
            const [field,operator,value]=item.split("-")
            if(options.includes(field)){
                queryObject[field]={[operator]:Number(value)}
            }
        })
    }
    console.log(queryObject)
    let result = Products.find(queryObject)
    if(sort){
        const sortList = sort.split(",").join('')
        result.sort(sortList)
        
    }
    if(fields){
        let fiedList = fields.split(',').join('')
        result = result.select(fiedList)
    }
    
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const skip = (page-1)*limit
    const products = await result.skip(skip).limit(limit)

    //console.log(products)
    res.status(200).json({success:true, products, nbHit:products.length })

}
const getAllProductsStatic=(req,res)=>{

}
module.exports = {
            getAllProducts, getAllProductsStatic
}