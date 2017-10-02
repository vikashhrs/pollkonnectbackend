var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    displayName : {
        type : String,
        required : true
    },
    email : {
      type : String,
      required : true
    },
    imageUrl : String,
    password : String,
    loginType : []
});
module.exports = mongoose.model('User',UserSchema);
