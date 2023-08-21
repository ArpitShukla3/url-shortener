const express=require("express");
const app=express();
const route=require("./Router/Router.js")
const urlEncoded = express.urlencoded
app.use(express.json());
app.use("/short",route);

app.use(urlEncoded({
    extended : true 
}))
app.use("/",(req,res)=>
{
  res.status(200).json({
    success:true,
    message:"server is up"
  })
})



module.exports=app; 