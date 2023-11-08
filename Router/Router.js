const express=require("express");
const router=express.Router();
const {short, openUrl, showData}=require("../Controller/controller.js");
const {login, signup, logout, forgotPassword} =require("../Controller/Signing-Controller.js")
const {check,print}= require("../MiddleWare/middleware.js");
    router.post("/set",check,short);
    router.get("/open/*",check,openUrl);
    router.get("/show/*",check,showData);
    router.post("/login",login);
    router.post("/signup",signup);
    router.post("/logout",logout);
    router.post("/forgotPassword",forgotPassword);
    router.post("/check",check);
module.exports=router;    