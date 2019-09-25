//引入express
const express = require("express");
//实例化一个app
const app =express();
//设置路由
app.get("/",(req,res)=>{
    res.send("Giu");
})
//设置端口号
const port=process.env.PORT ||5000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})