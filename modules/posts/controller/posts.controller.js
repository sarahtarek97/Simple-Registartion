const Post = require('../model/posts.model');
const getAllAdvs = require('../../advertising/controller/adv.controller');
const { StatusCodes } = require('http-status-codes');

//create post createdBy field ref:user id
const createPost = async(req,res)=>{
    let{title,description}= req.body;
    let createdBy = req.user._id;
    try {
        let newPost = new Post({title,description,createdBy});
        await newPost.save();
        res.json({message:'post added success'});
    } catch (error) {
    res.json({message:'could not create post', error})
    }
}

//update or edit post
const editPost = async(req,res)=>{
    let {title,description} = req.body;
    try {
       let check = await Post.find({title,blocked:false})
       if(check){
        const post = await Post.updateOne({title},{description});
        res.json({message:"post updated success",post});
       }else{
           res.status(StatusCodes.BAD_REQUEST).json({message:'post may be blocked'})
       }
    } catch (error) {
    res.json({message:'error while editing the post', error})
    }

}

//delete post
const deletePost = async (req,res)=>{
    let {id} = req.params;
    let iD = req.body;
    try {
        const post = await Post.deleteMany({_id:id});
        res.json({message:'deleted success',post});
    
    } catch (error) {
        res.json({message:'error while deleting the post',error});
    }
    
}

//use user id to get the post (user id == created By)
const getSinglePost = async (req,res)=>{
    let createdBy = req.user._id;
    let deactivate = req.user.deactivated;
try {
    if(deactivate == false){
    const post = await Post.find({createdBy,blocked:false});
    res.json({message:'found the post',post: post});
    }else{
    res.json({message:'account deactivated so can not see the user posts'});
    }
} catch (error) {
    res.json({message:'error while getting the post with user ID',error});
}
}

//use user id to get all posts
const getAllPost = async (req,res)=>{
    const deactivate = req.user.deactivated;
try {
    if(deactivate == false){
    let posts = await Post.find({blocked:false});
    res.json({message:'print all posts',posts: posts});
    }else{
        res.json({message:'account deactivated so can not see all users posts'});
    }
} catch (error) {
    res.json({message:'error while getting all posts',error});
}
}

//admin can block post 
const blockPost = async(req,res)=>{
    let {id} = req.params;
    let {iD} = req.body;
    try {
       let check = await Post.find({blocked:false})
       if(check && req.user.role == 'admin' || req.user.role == 'super admin' ){
        const post = await Post.updateOne({_id:id},{blocked:true});
        res.json({message:"post blocked success",post});
       }else{
           res.status(StatusCodes.BAD_REQUEST).json({message:'post already blocked or you are not authorized'})
       }
    } catch (error) {
    res.json({message:'error while blocking the post', error})
    }
}

//export all the functions to use it on posts.router.js
module.exports = {
createPost,
editPost,
deletePost,
getSinglePost,
getAllPost,
blockPost,

}