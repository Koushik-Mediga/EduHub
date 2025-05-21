const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("Database Connected successfully...")})
    .catch((e)=>{console.log(e)});
}

module.exports = dbConnect;