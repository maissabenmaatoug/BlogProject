const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {User,validateRegisterUser,validateLoginUser} = require('../Models/User');
const jwt = require('jsonwebtoken');
//Register = signUp new User 
// route : /api/auth/register
//method : POST
//access : public
module.exports.registerUser = asyncHandler( async(req, res) => {
//validation (i will write it in User Model)
// isUser exists
// bcrypt password 
//new user and save in db
// send response to client

const {error}=validateRegisterUser(req.body);
if(error){
    // bad request , le client nous a donné de fausses données (erreur coté client)
    res.status(400).json({message:error.details[0].message});
}

let user= await User.findOne({email : req.body.email})
if(user){
    return res.status(400).json({message :"user already exists"});
}
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);
user = new User({
    username : req.body.username,
    email : req.body.email,
    password : hashedPassword,
});

await user.save();
res.status(201).json({message: 'User created successfully!!please login'});
//201 : created successfully

});
//Login User
//validation (i will write it in User Model)
// isUser exists
// Check password
//generate Token
// send response to client
module.exports.loginUser = asyncHandler(async(req, res) => {

    const {error}=validateLoginUser(req.body);
    if(error){
        // bad request , le client nous a donné de fausses données (erreur coté client)
        res.status(400).json({message:error.details[0].message});
    }
const user = await User.findOne({email:req.body.email });
console.log('userr', user);
if(!user) {
return res.status(400).json({message:"Invalid email or password"});
}

const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
if(!isPasswordMatch) {
    return res.status(400).json({message:"Invalid password"});
     }
//generate auth token
const token = jwt.sign({_id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET,{expiresIn :'30d'});
console.log('tok',token);
return res.status(200).json({
    _id:user._id,
    isAdmin : user.isAdmin,
    profilePhoto : user.profilePhoto,
    token:token
})



});