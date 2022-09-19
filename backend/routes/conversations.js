import express from 'express';
import asyncHandler from 'express-async-handler';
import ChatRoom from '../models/ChatRoom.js';
import User from '../models/User.js';
import requireAuth from '../utils/auth.js';

const router = express.Router();

//TODO add auth to these routes
router.get('/:userId', requireAuth, asyncHandler(async(req,res) => {
    const userId = req.params.userId;
    const chatRooms = await ChatRoom.find({
        members: {$in: userId}
    });
    res.json({rooms: chatRooms})
}))

//TODO add auth and validation
//Need to validate username, query user by that user name and get their id then create a conversation
//Would be better to search user and click on their username which sends id
//or is it the same because you would have to query twice either way with search
router.post('/new', requireAuth, asyncHandler(async(req,res) => {
    const {members, userId} = req.body;

    const newChatRoom = new ChatRoom({members, userId});
    newChatRoom.save()
    console.log(newChatRoom)
    res.json(newChatRoom)
}))



export default router;
