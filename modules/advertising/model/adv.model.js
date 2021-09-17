const mongoose = require('mongoose');
const advSchema = require('../schema/adv.schema');

//create object from the schema to use it
const Adv = mongoose.model('adv',advSchema);

//export posts to use it in adv.controller.js
module.exports = Adv;