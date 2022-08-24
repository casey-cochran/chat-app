import express from "express";
import asyncHandler from 'express-async-handler';
import { check } from "express-validator";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import handleValidationErrors from "../utils/validation.js";

import User from "../models/User.js";
import requireAuth from "../utils/auth.js";

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

router.post('/signup', validateUser, asyncHandler(async(req,res) => {
    const {username, email, password} = req.body;
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({msg: 'User Already Exists'})
    }

    user = new User({
        username,
        email,
        password
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({msg: "User Does Not Exist"})
    }

    const userMatch = await bcrypt.compare(password, user.password);
    if(!userMatch){
        return res.status(400).json({msg: "Incorrect Password !"})
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

router.get('/me', requireAuth, asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);
    res.json(user);
}))

export default router;
