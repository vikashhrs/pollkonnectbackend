var express = require('express');
var bodyParser = require('body-parser');
var jwtSimple = require('jwt-simple');
var secret = '124446666688888888000000000';
var PORT = process.env.PORT || 3000;
var bcrypt = require('bcrypt-nodejs');

var USER = require('./models/user');

var app  = express();
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.send({data:"Its Working"})
});


app.post('/user/login/app',function(req,res){
  console.log(req.body);
  var user = req.body.user;
  if(user.password){
    USER.findOne({ email : user.email},function(err,foundUser){
      if(err){
        throw err;
      }

      if(!foundUser){
        res.send({ data : "User Not Found"});
      }
      if(foundUser){
        bcrypt.compare(user.password, foundUser.password, function(err, passwordMatched) {
          if(err){
            throw err;
          }
          if(passwordMatched){
            var token = jwt.encode(foundUser, secret)
            res.send({token : token});
          }else{
            res.send({token : null});
          }
        });
      }
    })
  }else{
    USER.findOne({email : user.email},function(err,foundUser){
      if(err){
        throw err;
      }
      if(!foundUser){
        var newUser = new USER({
          displayName : user.displayName,
          email : user.email,
          imageUrl : user.imageUrl,
          password : null,
          loginType : [user.loginType]
        });
        newUser.save(function(err){
          if(err){
            throw err;
          }
          var token = jwt.encode(newUser, secret);
          res.send({token : token});
        })
      }else{
        if(foundUser.loginType.indexOf(user.loginType) != -1){
          var token = jwt.encode(foundUser, secret)
          res.send({token : token});
        }else{
          foundUser.loginType.push(user.loginType);
          foundUser.save(function(err){
            if(err){
              throw err;
            }
            var token = jwt.encode(foundUser, secret);
            res.send({token : token})
          });
        }
      }

    })
  }
});

app.post('/user/register/app',function(req,res){
  console.log(req.body);
  var user = req.body.user;
  if(user.password){
    bcrypt.hash(user.password,null,null,function(err,encrypted){
      user.password = encrypted;
    })
  }
  var saveUser = new USER(user);
  saveUser.save(function(err){
    if(err){
      throw err;
    }
    res.status(200).send({data: "User Registerd"});
  });
});

app.listen(PORT,function(){
  console.log("Server running at port "+ PORT);
});
