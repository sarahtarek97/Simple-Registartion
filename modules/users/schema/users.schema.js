const mongoose = require('mongoose');

//create the user schema
const userSchema = new mongoose.Schema({
    userName:{type:String,required: [true,'name required']},
    email:{type:String,required: [true,'email required']},
    password:{type:String,required: [true,'password required']},
    cPassword:{type:String,required: [true,'password confirmation required']},
    phone:{type:String,required: [true,'phone required']},
    location:{type:String,required: [true,'location required']},
    role:{type:String,default:'user'},
    deactivated:{type:Boolean,default:false},
    blocked:{type:Boolean,default:false},
    
},{
    timestamps:  true,
});


//export the user schema to use it on model
module.exports = userSchema;