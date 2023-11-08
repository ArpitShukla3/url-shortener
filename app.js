const express=require("express");
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');
const app=express();
const route=require("./Router/Router.js")
const cors=require("cors");
const urlEncoded = express.urlencoded;
app.use(cookieParser());
app.use(express.json());
app.use(cors(
{  origin:'http://localhost:5173',
   credentials:true
}
));
app.use(bodyParser.json());
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