const express = require('express');
const router = express.Router();
const validateRequest = require('../../../common/validateRequest');
const {createAdv , getAllAdvs , getSingleAdv , updateAdvName , deleteSingleAdv} = require('../controller/adv.controller');
const {createAdvSchema , updateAdvNameSchema , deleteSingleAdvSchema} = require('../joi/adv.joi');
const isAuthrized = require('../../../common/isAuthrized');

//*** end points ***//

//create new adv
router.post('/createNewAdv',isAuthrized(),validateRequest(createAdvSchema),createAdv);

//get all advs
router.get('/allAdvs',isAuthrized(),getAllAdvs);

//get single adv
router.get('/singleAdvs/:id',isAuthrized(),getSingleAdv);

//admin can update adv name
router.patch('/updateAdvName/:id',isAuthrized(),validateRequest(updateAdvNameSchema),updateAdvName);

//admin can delete adv
router.delete('/deleteSingleAdv/:id',isAuthrized(),validateRequest(deleteSingleAdvSchema),deleteSingleAdv);


//export it to use it in app.js
module.exports = router;