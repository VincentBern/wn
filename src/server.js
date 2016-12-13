var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname;
var port = process.env.PORT || 3000;

router.get("/",function(req,res){
  res.sendFile(path + "/index.html");
});

app.use("/",router);
app.use("/js", express.static(path + '/js/'));
app.use("/css", express.static(path + '/css/'));
app.use("/font", express.static(path + '/font/'));
app.use("/img", express.static(path + '/img/'));
app.use("/image", express.static(path + '/img/'));

app.use(express.static('dist'));

app.use("*",function(req,res){
  res.sendFile(path + "/404.html");
});

app.listen(port,function(){
  console.log("Live at Port"+ port);
});
