const jwt = require("jsonwebtoken");
const rbac = require("./rbac/rbac");

module.exports = ()=> {
    return (req,res,next)=>{
        try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        var decoded = jwt.verify(token,'shhh');
        //const isAllowed = await rbac.can(decoded.role ,endPoint);
        req.user = decoded;
        next();
        } catch (error) {
            res.json({message:'token issue'});
        }
    };
};