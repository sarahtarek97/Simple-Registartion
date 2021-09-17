const mongoose = require('mongoose');
const postSchema = require('../schema/posts.schems');

//create object from the schema to use it
const Post = mongoose.model('post',postSchema);

//export posts to use it in posts.controller.js
module.exports = Post;