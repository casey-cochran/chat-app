import express from "express";
import asyncHandler from 'express-async-handler';
import { check } from "express-validator";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import handleValidationErrors from "../utils/validation.js";

import User from "../models/User.js";

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
            id: user.id
        }
    }

    jwt.sign(
        payload,
        "randomString", {
            expiresIn: 10000
        },
        (err, token) => {
            if(err) throw err;
            res.status(200).json({
                token
            })
        }
    )
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
            id: user.id
        }
    }

    jwt.sign(
        payload,
        "randomstring",
        {expiresIn: 3600},
        (err, token) => {
            if(err) throw err;
            res.status(200).json({token})
        }
    )
}))

export default router;
