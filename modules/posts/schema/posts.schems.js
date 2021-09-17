const mongoose = require('mongoose');

//create the post schema
const postSchema = new mongoose.Schema({
    title:{type:String,required: [true,'title required']},
    description:{type:String,required: [true,'description required']},
    createdBy:{type:String,required: [true,'createdBy required']},
    blocked:{type:Boolean,default:false},
},{
    timestamps: true,
});

//export the post schema to use it on model
module.exports = postSchema;