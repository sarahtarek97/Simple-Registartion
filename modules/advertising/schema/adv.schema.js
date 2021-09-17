const mongoose = require('mongoose');

//create the advertising schema
const advSchema = new mongoose.Schema({
    name:{type:String,required: [true,'title required']},
    description:{type:String,required: [true,'description required']},
},{
    timestamps: true,
});

//export the advertising schema to use it on model
module.exports = advSchema;