const router = require('express').Router();
const {getAllUsersProfile}=require('../Controllers/usersController');
const {VerifyToken} = require('../Middlewares/VerifyToken');

router.get('/profile',VerifyToken, getAllUsersProfile);






module.exports = router;
