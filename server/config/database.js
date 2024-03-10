const mongoose = require("mongoose");
require("dotenv").config();


exports.connect = () => {
    mongoose.connect(process.env.MONGO_DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("DB connection Successfull"))
    .catch((error) => {
        console.log("Connection facing Issues");
        console.error(error);
        process.exit(1);
    })
};