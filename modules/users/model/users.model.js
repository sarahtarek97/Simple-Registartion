const mongoose = require('mongoose');
const userSchema = require('../schema/users.schema');

//create object from the schema to use it
const User = mongoose.model('user',userSchema);

//export User to use it in users.controller.js
module.exports = User;