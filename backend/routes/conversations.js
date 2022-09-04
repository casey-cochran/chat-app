import express from 'express';
import asyncHandler from 'express-async-handler';
import ChatRoom from '../models/ChatRoom.js';
import requireAuth from '../utils/auth.js';

const router = express.Router();

//TODO add auth to these routes
router.get('/', asyncHandler(async(req,res) => {
    const chatRooms = await ChatRoom.find();
    res.json({rooms: chatRooms})
}))

//TODO add auth and validation
router.post('/new', asyncHandler(async(req,res) => {
    const {members, userId} = req.body;

    const newChatRoom = new ChatRoom({members, userId});
    newChatRoom.save()
    console.log(newChatRoom)
    res.json(newChatRoom)
}))


export default router;
