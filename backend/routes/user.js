import express from "express";
import asyncHandler from 'express-async-handler';
import { check } from "express-validator";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import handleValidationErrors from "../utils/validation";

import User from "../models/User";

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

router.post('/signup', validateUser, asyncHandler((req,res) => {
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




export default router;
