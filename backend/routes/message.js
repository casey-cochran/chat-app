import express from 'express';
import asyncHandler from 'express-async-handler';
import Message from '../models/Message.js';
import requireAuth from '../utils/auth.js';


const router = express.Router();

//TODO add validation for creating messages and authorization
router.post('/', asyncHandler(async(req,res) => {
    const {chatRoomId, userId, text} = req.body;
    const newMessage = new Message({
        chatRoomId,
        userId,
        text
    })
     newMessage.save();
    console.log(newMessage)
    res.json(newMessage);
}))

//Get all messages based on conversationId, add Auth
router.get('/:conversationId', asyncHandler(async(req,res) => {
    const conversationId = req.params.conversationId;
    const messages = await Message.find({chatRoomId: conversationId});

    res.json({messages})
}))




export default router;
