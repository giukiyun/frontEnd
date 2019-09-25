//引入express
const express = require("express");
//引入mongoose
const mongoose = require("mongoose");
//引入bodyParser
const bodyParser =require("body-parser");
//实例化一个app
const app = express();

//引入user.js
const users = require("./routes/api/users");

//DB 配置
const db = require("./config/keys").mongoURI;

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//连接数据库mongoDB
mongoose.connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
//设置路由
app.get("/", (req, res) => {
    res.send("Giu");
})

//使用routes
app.use("/api/users",users);
//设置端口号
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})