const mongoose=require("mongoose");
// const {Schema}=mongoose;
const userSchema=new mongoose.Schema({
    url:{
        type:String
    },
    shortUrl:{
        type:String,
        required:true,
        createdDate: Date.now
    },
    email:{
        type:String,
        required:true
    }

})


 
const model=mongoose.model("urlData",userSchema);
module.exports=model;