import jwt from "jsonwebtoken";


const requireAuth = (req, res, next) => {
    const token = req.header("token");
    if(!token) return res.status(401).json({msg: "Not Authorized"});

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.user;
        next();
    }catch (e) {
        console.error(e);
        res.status(500).send({msg: "Invalid Token"});
    }
}

export default requireAuth;
