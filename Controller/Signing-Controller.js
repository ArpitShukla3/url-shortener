const dotenv = require("dotenv");
dotenv.config();
const userModel = require("../Schema/UserSchema")
const emailValidator= require("email-validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken") 
 const  signup=async (req,res)=>{
     const{ email, password, confirmPassword} = req.body;
     if( !email || !password ||!confirmPassword)
        {
               return res.status(401).json({
                      success:false,
                      data: "all field are compulsory"
               })
        }
      
        const emailValid=emailValidator.validate(email);
        if(!emailValid)
        { 
               return res.status(402).json({
                      success:false,
                      data: "enter correct email id"
               }) 
        }
       
        if(password!==confirmPassword)
        {
               return res.status(403).json({
                      success:false,
                      data: "password !=confirm Password"
               }) 
 
        }
        const foundItem = await userModel.findOne({email});
        
        if (foundItem) {
           return res.status(404).json({
               success:false,
               message:"user exists"
           }) 
        }
       
        const newObj = { 
            email,
            password,
            confirmPassword
         }
        try{
         const userInfo=new userModel(newObj);
         const result=await userInfo.save();
         return res.status(200).json({
                success: true,
                data: "users credentials have been saved"
               })
           }
           catch(err) 
           {
                console.log("FG",err.message)
                 return res.status(405).json({
                  success: false,
                  message: "error in signing up" +err.message
                 })
           }
}
 const  login =async (req,res)=>{
    try{
        const {email ,password }=req.body; 
        if(!email || !password)
        {
               return res.status(401).json({
                      succes:false,
                      message: "enter email and password"
                     })  
        }
         if(!emailValidator.validate(email))
        {
               return res.status(401).json({
                      succes:false,
                      message: "enter correct email"
                     })    
        }
        const user=await userModel.findOne({email}).select('+password');
        // const payload={email: user.email, };
        if(!user||!(await bcrypt.compare(password,user.password )))
        {
              
               return res.status(403).json({
                      succes:true,
                      message: "Enter correct credentials"
                     }) 
        }
          const token=jwt.sign(user.toJSON(), process.env.SECRET, { expiresIn: '180000000000s' });;
          user.password=undefined;  
          const cookieOption={
          maxAge:20*24*60*60*1000,
          };
          const cookieOptions = {
              maxAge:7*24*60*60*1000,
              // httpOnly:true,
              secure:true, 
              sameSite: 'None'
          }
          res.cookie ("token",token,cookieOptions);
       //    res.clear
          return res.status(200).json({ 
          success:true,     
           data:user   
          });   
}
catch(error){
       console.log(error)
        res.status(405).json({ 
        success: false,
        reason_of_failure: ""+error
 })
} 
}
const logout = async (req,res)=>{
    try {
        const option={  
               expires:new Date(),
        }
         res.cookie("token",null,option);
         res.status(200).json({
               success:true,
               message:'logged out' 
        })
     } catch (error) { 
        res.status(400).json({
               success: false,
               message: error.message
        })
     }
}
const forgotPassword =(req,res)=>{
            const {email,password,confirmPassword} = req.body;
            return res.status(200).json({
                success:true,
                message: ""
            })
}
module.exports={login, signup, logout, forgotPassword}; 