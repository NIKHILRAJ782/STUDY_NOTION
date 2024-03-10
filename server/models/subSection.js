const mongoose = require("mongoose");

const SubSectionSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
    },
    timeDuration:{
        type:String,
    },
    description:{
        type:String,
        trim:true,
    },
    videoUrl:{
        type:String,
        trim:true,
    },
});

module.exports = mongoose.model("SubSection",SubSectionSchema);