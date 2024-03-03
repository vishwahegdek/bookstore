const secret = 'my-key'
const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(411).json({
            msg: "Invalid input"
        })
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,secret)
        req.username = decoded.username;

        next();
    }
    catch(err){
        res.status(403).json({
            msg: "Error"
        })
    }
}

module.exports= {
    authMiddleware
}