const express = require('express');
const { getAllUsers, signUp, signIn ,updateProfile, updatePassword , deactivateAccount , addSuperAdmin , getSuperAdmins , deleteSuperAdmin , blockUser} = require('../controller/users.controller');
const router = express.Router();
const validateRequest = require('../../../common/validateRequest');
const {signUpSchema, signInSchema, updateUserSchema,updatePasswordSchema , deleteSuperAdminSchema , blockUserSchema} = require('../joi/usersValidation');
const isAuthrized = require('../../../common/isAuthrized');
//*** end points ***//

//get all users
router.get('/users', isAuthrized(), getAllUsers);

//add user -- sign up //use joi middleware to validate
router.post('/signUp',validateRequest(signUpSchema),signUp);

//get single user -- sign in
router.get('/signIn',validateRequest(signInSchema),signIn);

//update profile but must have valid token
router.patch('/updateProfile/:id',validateRequest(updateUserSchema),isAuthrized(),updateProfile);

//update password but must have valid token
router.patch('/updatePassword',isAuthrized(),validateRequest(updatePasswordSchema),updatePassword);

//deactivate my account
router.patch('/deactivateTheAccount',isAuthrized(),deactivateAccount);

//add admin with super admin role
router.post('/addSuperAdmin',isAuthrized(),validateRequest(signUpSchema),addSuperAdmin);

//get all admins by super admins only
router.get('/getsuperAdmins',isAuthrized(),getSuperAdmins);

//delete super admin with admin or super admin
router.delete('/deleteSuperAdmin/:id',isAuthrized(),validateRequest(deleteSuperAdminSchema),deleteSuperAdmin);

//admin can block user
router.patch('/blockUser/:id',isAuthrized(),validateRequest(blockUserSchema),blockUser)


//export it to use it in app.js
module.exports = router;