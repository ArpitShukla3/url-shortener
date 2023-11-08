const jwt = require("jsonwebtoken");
const userModel = require("../Schema/UserSchema")
const check=async (req,res,next)=>{
    try {
    const token=req.cookies && req.cookies.token;
    const {email,password}= await jwt.verify(token,process.env.SECRET);
    const credential= await userModel.findOne({email}).select('+password');
   if(credential.password==password)
   {
    req.email=email;  
    await next(); 
   }
   else
   {
    return res.status(202).json({
        success:true,
        message:"error, token expired , relogin"
    })
   }
  ;
    } catch (error) {   
        console.log("error: "+error.message);
        return res.status(405);
    }
}      
const print=async(req,res)=>
{ 

}     
module.exports={check,print}; 