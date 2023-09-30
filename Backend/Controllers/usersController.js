const asyncHandler = require('express-async-handler');
const {User}= require('../Models/User');
//Get all users profile
//route /api/users/profile
//get 
//access : private (only admin)
module.exports.getAllUsersProfile = asyncHandler(async(req,res)=>{
const users = await User.find();
res.status(200).json(users);
});