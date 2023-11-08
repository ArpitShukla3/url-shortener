const mongoose=require("mongoose");
require("dotenv").config();
const options={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
const connect=async ()=>
{
    const mongodb_atlas_url=process.env.mongodb_atlas_url;
    try { 
        await mongoose.connect(mongodb_atlas_url)
        console.log("connected");
    } catch (error) { 
        console.log("Error occurred due to  "+error);
    }
} 
module.exports=connect;    