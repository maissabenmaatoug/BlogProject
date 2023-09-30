const mongoose = require('mongoose');
//user schema
const Joi = require('joi');
const UserSchema= new mongoose.Schema({

username :{
    type:String,
    required:true,
    trim :true,
    minlength :2,
    maxlength : 100,
}
,
email :{
    type:String,
    required:true,
    trim :true,
    minlength :5,
    maxlength : 100,
    unique :true,
},
password :{
    type:String,
    required:true,
    trim :true,
    minlength :8,
},
profilePhoto :{
type :Object,
default:{
    url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    publicId:null,
}

},
bio :{
    type :String,
},
isAdmin :{
    type :Boolean,
    default :false,
},
isAccountVerified :{
    type :Boolean,
    default :false,
},


},{
 // timestamps ajoute deux propriétés updated at et created at
timestamps :true,});

// user model
const User = mongoose.model("User", UserSchema);

// validate register User sur express js framework par contre la validation qui la précède 
// au niveau du schema c'est une validation coté Base de données
function validateRegisterUser(obj){
const schema = Joi.object({
username : Joi.string().trim().min(2).max(100).required(),
email : Joi.string().trim().min(5).max(100).required().email(),
password : Joi.string().trim().min(8).required(),
});
return schema.validate(obj);
}
function validateLoginUser(obj){
    const schema = Joi.object({
    email : Joi.string().trim().min(5).max(100).required().email(),
    password : Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
    }
module.exports = {User , validateRegisterUser,validateLoginUser};