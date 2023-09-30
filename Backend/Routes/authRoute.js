const router = require('express').Router();
const {registerUser,loginUser}=require('../Controllers/authController');

//api/auth/register
 router.post('/register',registerUser);
 router.post('/login', loginUser);








module.exports = router;