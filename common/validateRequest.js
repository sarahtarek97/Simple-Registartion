 const {StatusCodes} = require('http-status-codes');

 module.exports = (schema)=>{
     return (req,res,next)=>{
         const validation = []
         const validateResult = schema.body.validate(req.body);
        if(validateResult.error){
            validation.push(validateResult.error.details[0].message);
        }
        if(validation.length){
            res.status(StatusCodes.BAD_REQUEST).json({message:`validation: ${validation.join()}`});
            return;
        }        
        next();
    };
 };