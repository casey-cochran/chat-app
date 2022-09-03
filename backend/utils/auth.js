import jwt from "jsonwebtoken";
import User from '../models/User.js';


const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({msg: "Not Authorized"});

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.user;
        //can set userID here later on
        //can also set user role if needed
        next();
    }catch (e) {
        console.error(e);
        res.status(500).send({msg: "Invalid Token"});
    }
};

export const restoreUser = (req, res, next) => {
    const {token} = req.cookies;

    return jwt.verify(token, process.env.JWT_SECRET, null, async(err, jwtPayload) => {
        if(err){
            return next();
        }
        try {
            const {id} = jwtPayload.data;
            req.user = await User.findById(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if(!req.user) res.clearCookie('token');

        return next();
    })
}


export default requireAuth;
