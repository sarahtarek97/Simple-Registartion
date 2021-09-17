const Reports = require('../model/reports.model');


//user report post
const userReportPost = async(req,res)=>{
    let {reportComment} = req.body;
    let {id} = req.params;
    let userID = req.user._id;
    try {
      const user = await Reports.findOne({id,userID});
      if (user){
        res.json({message:'you reported this post prevously',error});
      }else{
        if(req.user.role == 'user'){
        let newReport = new Reports({userID,id,reportComment});
        console.log(newReport);
        console.log(userID)
        const report = await newReport.save();
        res.json({message:'report added success',report});
        }else{
        res.json({message:'you can not report a post'});
    }}
  }catch (error) {
      res.json({message:'could not report the post',error});
    }
  }

//admins can get all reports
const allReports = async(req,res)=>{
  try {
    if(req.user.role == 'admin' || req.user.role == 'super admin'){
      let reports = await Reports.find({});
      res.json({message:'view all reports',data: reports})
    }else{
      res.status(StatusCodes.UNAUTHORIZED).json({message:'Unauthorized'})
    }
  } catch (error) {
    res.json({message:'error while reviewing reports'})
  }
}

module.exports = {
    userReportPost,
    allReports,
}