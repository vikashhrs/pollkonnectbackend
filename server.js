var express = require('express');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

var app  = express();
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.send({data:"Its Working"})
});


app.post('/user/login/app',function(req,res){
  console.log(req.body);
  res.send({data : "Its WOrking"});
})

app.listen(PORT,function(){
  console.log("Server running at port "+ PORT);
});
