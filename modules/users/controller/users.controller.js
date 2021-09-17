const User = require("../model/users.model")
const bcrypt = require('bcrypt');
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken'); 
const crypto = require ("crypto");

//print all the users on the DB
const getAllUsers= async (req,res)=>{
  if(req.user.role == 'admin'){
    let users = await User.find({deactivated:false}).select('-password').select('-cPassword');
    res.json({message:'all users',data: users})
  }else{
    res.status(StatusCodes.UNAUTHORIZED).json({message:'Unauthorized'})
  }
}

//sign up or add a new user so we can make any action like get specific user or update ect...
const signUp = async (req,res)=>{
    let{userName,email,password,cPassword,phone,location,role}= req.body;
    try {
        bcrypt.hash(password,7,async function(err,hash){
        bcrypt.hash(cPassword,7,async function(err,hashed){
        bcrypt.hash(phone,7,async function(err,phash){
        if(err) throw err;
        const user = await User.findOne({email});
        if(user){
            res.status(StatusCodes.BAD_REQUEST).json({
                message:'email already exsist'
            })
        }else{
            let newUser = new User({userName,email,password:hash,cPassword:hashed,phone:phash,location,role});
            if(password == cPassword){
                const user = await newUser.save();
            res.json({message:'sign up success',user});
            }else{
            res.json({message:'password not match'});
            }
        }
        })})

        });
    } catch (error) {
    res.json({message:'sign up error', error})
    }
}

//sign in or get single user
const signIn = async(req,res)=>{
    let {email,password} = req.body;
    try {
      const user = await User.findOne({email, blocked:false});
      if(!user){
          res.status(StatusCodes.BAD_REQUEST).json({message:'email not found or blocked by admin'})
      }else{
          const match = await bcrypt.compare(password,user.password);
        if(match){
            let token = jwt.sign({_id:user._id,userName:user.userName,email:user.email,phone:user.phone,location:user.location,role:user.role,deactivated:false},'shhh');
            //let decoded = jwt.verify(token,'ggg');
            res.status(StatusCodes.OK).json({
                token,
                user
            });
        }else{
          res.status(StatusCodes.BAD_REQUEST).json({message:'wrong password'})
        }
      }
    } catch (error) {
    res.json({message:'sign in error', error})
    }
}

//update profile
const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { userName } = req.body;
    try {
      if(req.user._id == id){
        const userr = await User.updateOne({ _id:id}, { userName });
        res.json({ message: "updated success", userr });
      }
    } catch (error) {
      res.json({ message: "error", error });
    }
  };

//update password
const updatePassword = async (req, res) => {
    const {oldPassword,password,cPassword } = req.body;
    const email = req.user.email;
    console.log(email)
    try {
            bcrypt.hash(password,7,async function(err,hash){
            bcrypt.hash(cPassword,7,async function(err,hashed){
            if(err) throw err;
            const user = await User.findOne({email},{deactivated:false});
            const match = await bcrypt.compare(oldPassword,user.password);
            if(user && match){
                if(password == cPassword){
                    const userr = await User.updateOne({ email }, { password:hash, cPassword:hashed});
                    res.json({message:'password updated success',userr});
                }else{
              res.json({message:'password not updated'});
                }
            }else{
                res.status(StatusCodes.BAD_REQUEST).json({
                   message:'problem in updating the password'
                })
            }
            })
            });
    } catch (error) {
      res.json({ message: "error", error });
    }
  };

//user can deactivate his/her account
const deactivateAccount = async (req,res)=>{
    let id = req.user._id;
  try {
    const me = await User.updateOne({_id:id},{deactivated:true});
    res.json({message:'deactivated my account',me});
  } catch (error) {
    res.json({ message: "deactication error", error });
  }
}

//add admin with super admins only
const addSuperAdmin = async(req,res)=>{
  let{userName,email,password,cPassword,phone,location,role}= req.body;
  try {
    if(req.user.role == 'admin'){
      bcrypt.hash(password,7,async function(err,hash){
      bcrypt.hash(cPassword,7,async function(err,hashed){
      bcrypt.hash(phone,7,async function(err,phash){
      if(err) throw err;
      const user = await User.findOne({email});
      if(user){
          res.status(StatusCodes.BAD_REQUEST).json({
              message:'email already exsist'
          })
      }else{
          let newUser = new User({userName,email,password:hash,cPassword:hashed,phone:phash,location,role});
          if(password == cPassword){
              const user = await newUser.save();
          res.json({message:'sign up success',user});
          }else{
          res.json({message:'password not match'});
          }
      }
      })})

      });
    }else{
    res.status(StatusCodes.UNAUTHORIZED).json({message:'Unauthorized to add user/super admin'})
    }
  } catch (error) {
  res.json({message:'sign up error', error})
  }
}

//get all admins by super admins only
const getSuperAdmins = async(req,res)=>{
  if(req.user.role == 'admin'){
    let admins = await User.find({role:'super admin'}).select('-password').select('-cPassword');
    res.json({message:'all super admins',data: admins})
  }else{
    res.status(StatusCodes.UNAUTHORIZED).json({message:'Unauthorized'})
  }
}

//delete super admins by admin or super admin
const deleteSuperAdmin = async(req,res)=>{
    let {id} = req.params;
    try {
      if(req.user.role == 'admin' || req.user.role == 'super admin'){
        const user = await User.deleteOne({_id:id,role:'super admin'});
        res.json({message:'super admin deleted success',user});
      }else{
        res.status(StatusCodes.UNAUTHORIZED).json({message:'Unauthorized'})
      }
    
    } catch (error) {
        res.json({message:'error while deleting super admin',error});
    }
    
}

//admin can block user 
const blockUser = async(req,res)=>{
  let {id} = req.params;
  let {iD} = req.body;
  try {
     const check = await User.findOne({_id:id,blocked:false});
     if(check && (req.user.role == 'admin' || req.user.role == 'super admin' )){
      const user = await User.updateOne({_id:id},{blocked:true});
      res.json({message:"user blocked success",user});

     }else{
         res.status(StatusCodes.BAD_REQUEST).json({message:'user already blocked or you are not authorized'})
     }
  } catch (error) {
  res.json({message:'error while blocking the user', error})
  }
}


//export the functions to use it in users.router.js
module.exports ={
    getAllUsers,
    signUp,
    signIn,
    updateProfile,
    updatePassword,
    deactivateAccount,
    addSuperAdmin,
    getSuperAdmins,
    deleteSuperAdmin,
    blockUser,
}