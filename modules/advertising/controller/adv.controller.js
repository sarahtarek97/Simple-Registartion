const { StatusCodes } = require('http-status-codes');
const Adv = require('../model/adv.model');

//admin can add new adv
const createAdv = async(req,res)=>{
    let{name,description}= req.body;
    try {
        if(req.user.role == 'admin' || req.user.role == 'super admin'){
            let newAdv = new Adv({name,description});
            await newAdv.save();
            res.json({message:'advertisment added success'});
        }else{
            res.status(StatusCodes.UNAUTHORIZED).json({message:'Unauthorized'});
        }
    } catch (error) {
    res.json({message:'could not create advertisment', error})
    }
}

//admins and users can see all adv
const getAllAdvs = async (req,res)=>{
    try {
        if(req.user.role == 'user'){
        const advs = await Adv.find({});
        res.json({message:'advs',advertistments:advs});
        }else{
            res.status(StatusCodes.UNAUTHORIZED).json({message:'Unauthorized'});
        }
    } catch (error) {
        res.json({message:'error while getting the advs'}); 
    }  
}

//get single adv
const getSingleAdv = async(req,res)=>{
    let {id} = req.params;
    let {iD} = req.body;
try {
    if(req.user.role == 'user'){
    const adv = await Adv.find({_id:id});
    res.json({message:'adv',advertistments:adv});
    }else{
        res.status(StatusCodes.UNAUTHORIZED).json({message:'Unauthorized'});
    }
} catch (error) {
    res.json({message:'error while getting the adv'}); 
}  
}

//update adv name
const updateAdvName = async(req,res)=>{
    let {id} = req.params;
    let {name} = req.body;
    try {
       if(req.user.role == 'admin' || req.user.role == 'super admin' ){
        const adv = await Adv.updateOne({_id:id},{name});
        res.json({message:"adv name updated success",adv});
       }else{
           res.status(StatusCodes.UNAUTHORIZED).json({message:'Unauthorized'})
       }
    } catch (error) {
    res.json({message:'error while updating the post', error})
    }
}

//delete adv
const deleteSingleAdv = async(req,res)=>{
    let {id} = req.params;
    let {iD} = req.body;
try {
    if(req.user.role == 'admin' || req.user.role == 'super admin'){
    const adv = await Adv.deleteOne({_id:id});
    res.json({message:'adv deleted success',advertistments:adv});
    }else{
        res.status(StatusCodes.UNAUTHORIZED).json({message:'Unauthorized'});
    }
} catch (error) {
    res.json({message:'error while deleting the adv'}); 
}  
}

//export to use them on the end points 
module.exports = {
    createAdv,
    getAllAdvs,
    getSingleAdv,
    updateAdvName,
    deleteSingleAdv,
}