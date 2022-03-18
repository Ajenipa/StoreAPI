const mongoose = require('mongoose')
//pw = your mongodb connection string
const connectDB=(pw)=>{
    mongoose.connect(pw)

}
module.exports = connectDB