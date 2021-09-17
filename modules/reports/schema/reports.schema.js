const mongoose = require('mongoose');

//create the post schema
const reportsSchema = new mongoose.Schema({
    id:{type:String,required: [true,'post ID required']},
    userID:{type:String,required: [true,'user ID required']},
    reportComment:{type:String,required: [true,'report comment required']},
},{
    timestamps: true,
});

//export the post schema to use it on model
module.exports = reportsSchema;