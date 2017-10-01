var express = require('express');
var PORT = process.env.PORT || 3000;

var app  = express();

app.get('/',function(req,res){
  res.send({data:"Its Working"})
});

app.listen(PORT,function(){
  console.log("Server running at port "+ PORT);
})
