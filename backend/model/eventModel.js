const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    type:{       
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    form:{
        type:mongoose.Schema.ObjectId,
        ref:"Form"
    }
})

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;