const mongoose=require("mongoose");
const connect=async ()=>
{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/url?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.3")
        console.log("connected");
    } catch (error) {
        console.log("Error occurred due to"+error);
    }
}
module.exports=connect;