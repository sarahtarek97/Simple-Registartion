const express = require('express');
const router = express.Router();
const validateRequest = require('../../../common/validateRequest');
const {userReportPost,allReports} = require('../controller/reports.controller');
const {createReportSchema} = require('../joi/reports.joi');
const isAuthrized = require('../../../common/isAuthrized');
//*** end points ***//

//add reports
router.post('/addReport/:id',isAuthrized(),validateRequest(createReportSchema),userReportPost);

//get all reports
router.get('/allReports',isAuthrized(),allReports)


//export it to use it in app.js
module.exports = router;