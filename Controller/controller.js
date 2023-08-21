const connectDataBase=require("../dataBaseConfig/config.js");
connectDataBase();
require("dotenv").config();
const mongoose=require('mongoose');
const Schema=require("../Schema/shema.js")
const isUrlValid = require('url-validation');
const opener=require("openurl");
const  short=async(req,res,next)=>{
   try {
    const {url, str}=req.body;
    if(!url ||! str)
    {
        return res.status(400).json({
            success:false,
            message:"All fields are compulsory"
        })
    }
    if(!isUrlValid(url))
    {
        return res.status(400).json({
            success:false,
            message:"Url is invalid"
        })
    }
     const dataobj=new Schema({
        url:url,
        shortUrl:"http://localhost:5001/short/get/"+str.trim()
     })
     const result=await dataobj.save();
       return res.status(200).json({
        success:true,
        message:result
       })
   } catch (error) {
    return res.status(400).json({
        success:false,
        message:"error is due to : "+error
    })
   }

}
const openUrl=async(req,res,next)=>
{
   
   try {
    const shortUrl= req.protocol + '://' + req.get('host') + req.originalUrl;
    let element="";
    const data=Schema.findOne({shortUrl}).then(val=>{opener.open(val.url)})
    return res.status(200).json({
        success:true,
        message:"done"
    })
   }
    catch (error) {
    return res.status(400).json({
        success:false,
        message:"error occurred due to : "+error
    }) 
   }
}
module.exports={short, openUrl};
  




