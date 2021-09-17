const express = require('express');
const router = express.Router();
const validateRequest = require('../../../common/validateRequest');
const { createPost , editPost , deletePost , getSinglePost , getAllPost , blockPost} = require('../controller/posts.controller');
const {createPostSchema , editPostSchema , deletePostSchema , blockPostSchema} = require('../joi/postsVlidation');
const isAuthrized = require('../../../common/isAuthrized');
//*** end points ***//


//create new post
router.post('/createPost',validateRequest(createPostSchema),isAuthrized(),createPost);

//edit post title
router.patch('/editPost',validateRequest(editPostSchema),editPost);

//delete post
router.delete('/deletePost/:id',validateRequest(deletePostSchema),deletePost);

//get single post
router.get('/getSinglePost',isAuthrized(),getSinglePost);

//user can get all posts
router.get('/getAllPosts',isAuthrized(),getAllPost)

//admin can block post
router.patch('/blockPost/:id',isAuthrized(),validateRequest(blockPostSchema),blockPost)


//export it to use it in app.js
module.exports = router;