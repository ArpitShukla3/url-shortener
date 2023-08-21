const app=require("./app.js" );
const PORT=process.env.PORT ||5001;


app.listen(PORT,()=>{
    console.log("server is listening at port "+PORT);
  });  