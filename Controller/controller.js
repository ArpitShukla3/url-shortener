//requiring DevDependecies
const connectDataBase=require("../dataBaseConfig/config.js");
connectDataBase();
require("dotenv").config();
const mongoose=require('mongoose');
const Schema=require("../Schema/shema.js")
const isUrlValid = require('url-validation');
const backendPort="https://us-six.vercel.app";
const  short=async(req,res)=>{
    credentials: "include"
   try {
    const {longUrl}=req.body;
    //if Url is absent in request body 
    if(!longUrl)
    {
        return res.status(401).json({
            success:false,
            message:"Url missing"
        })
    }
 
     
   if(await Schema.findOne({url:longUrl,email:req.email}))
   {
    try{
      const checks= await Schema.findOneAndUpdate({url:longUrl},{new:true})
        return res.status(200).json({
            success:true,
            message:"done using update ",
            shortUrl: checks.shortUrl
         })
        }

       catch(err){
            return res.status(405).json({
                success:false,
                message: "error : "+err
            })
        } 
   }
   const index=await Schema.find().count();
     const dataobj=new Schema({
        url:longUrl,
        shortUrl:`${backendPort}/short/open/`+ index,
        email:req.email
     })
     const result=await dataobj.save();
       return res.status(200).json({
        success:true,
        shortUrl:`${backendPort}/short/open/`+index
       })
   } catch (error) {
    return res.status(406).json({
        success:false,
        message:"error is due to : "+error
    })
   }

}
const openUrl=async(req,res,next)=>
{
   try {
    
    const shortUrl= req.protocol + '://' + req.get('host') + req.originalUrl;
    const data=await Schema.findOne({shortUrl:shortUrl, email:req.email}).then(async(val)=>{
        if(val)
        {
            try{
                await res.redirect(307,val.url);
            }
            catch(error)
            {
                console.log("error : "+error);
            }
        }
        else
        {
            return res.status(400).json({
                success:false,
                message:"short url is invalid/ url is not found :"+shortUrl
            })
        }
    }
    )
   }
    catch (error) {   
    return res.status(400).json({
        success:false,
        message:"error occurred due to : "+error
    }) 
   }
}
const showData=async(req,res)=>{
   try {    
    const data= await Schema.find({email:req.email});
    return res.status(200).json({
        success:true,
        data:data
    })
   } catch (error) {
    return res.status(403).json({
        success:false,
        message:"error is in show block in showData function"+error.message
    })
   }
}

module.exports={short, openUrl, showData};   
  


 

