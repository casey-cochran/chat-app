import express from "express";
import asyncHandler from 'express-async-handler';
import { check } from "express-validator";
import jwt from "jsonwebtoken";
import handleValidationErrors from "../utils/validation.js";

import User from "../models/User.js";
import requireAuth, { restoreUser } from "../utils/auth.js";

const router = express.Router();

const validateUser = [
    check("username", "Please Enter a Valid Username")
    .not()
    .isEmpty(),
    check('email', 'Please enter a valid email')
    .isEmail(),
    check('password', 'Please enter a valid password')
    .isLength({min: 6}),
    handleValidationErrors
]

router.post('/signup', validateUser, asyncHandler(async(req,res, next) => {
    const {username, email, password} = req.body;
    const user = await User.signup(username, email, password);
    if(user === 'Exists'){
        //TODO Format error here for mongoose
        const error = new Error()
        error.errors = {exists: 'User Already Exists'}
        error.title = "Mongoose error"
        error.status = 400;
       return next(error)
    }

    const payload = {
        user: {
            id: user._id
        }
    }

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET, {
            expiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10)
        },
    );
    res.cookie('token', token, {
        maxAge: process.env.JWT_EXPIRES_IN * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' && "Lax"
    })
    return res.json(user)
}))

const validateLogin = [
    check('email', 'Please enter a valid email')
        .isEmail(),
    check('password', 'Please enter a valid password')
        .isLength({min: 6}),
    handleValidationErrors
];

router.post('/login', validateLogin, asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    let user = await User.login(email, password);
    if(!user){
        return res.status(400).json({msg: "User Does Not Exist"})
    }

    const payload = {
        user:{
            id: user._id
        }
    }

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN},
    );
    res.cookie('token', token, {
        maxAge: process.env.JWT_EXPIRES_IN * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' && "Lax"
    })
    return res.json(user)
}))

router.delete('/logout', requireAuth, asyncHandler(async(req,res) => {
    res.clearCookie('token');
    return res.json({msg: 'success'});
}))

//restore a session user
router.get('/', restoreUser, (req,res) => {
    const {user} = req;
    if(user) {
        return res.json({
            user
        })
    }else{
        return res.json([]);
    }
})

//test route remove this later
router.get('/all', asyncHandler(async(req,res) => {
    const allUsers = await User.find()
    res.json(allUsers);
}))


export default router;
