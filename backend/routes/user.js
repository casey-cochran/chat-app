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

}))




export default router;
