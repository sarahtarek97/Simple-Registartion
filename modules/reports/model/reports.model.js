const mongoose = require('mongoose');
const reportsSchema = require('../schema/reports.schema');

//create object from the schema to use it
const Reports = mongoose.model('report',reportsSchema);

//export Reports to use it in reports.controller.js
module.exports = Reports;