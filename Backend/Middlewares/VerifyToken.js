const jwt = require("jsonwebtoken");

//Verify Token
function VerifyToken(req, res, next) {
const authToken = req.headers.authorization;
console.log('tul', authToken);
if(authToken){
    const Token = authToken.split(" ")[1];
    console.log('tik',Token);
    try {
        const decodedPayload = jwt.verify(Token,process.env.JWT_SECRET);
        console.log('decodedPayload',decodedPayload);
        req.user = decodedPayload;
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid token ,access denied"});
    }
}
else {
res.status(401).json({message:"No token ,access denied"});
}

}
module.exports ={ VerifyToken}
