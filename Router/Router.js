const express=require("express");
const router=express.Router();
const {short, openUrl}=require("../Controller/controller.js")
router.post("/set",short)
router.get("/get/*",openUrl)





module.exports=router;