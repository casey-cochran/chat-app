import express from "express";
import asyncHandler from "express-async-handler";
import ChatRoom from "../models/ChatRoom.js";
import User from "../models/User.js";
import requireAuth from "../utils/auth.js";
import handleValidationErrors from "../utils/validation.js";
import { check } from "express-validator";

const router = express.Router();

//TODO add auth to these routes
router.get(
  "/:userId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const chatRooms = await ChatRoom.find({
      members: { $in: userId },
    });
    res.json({ rooms: chatRooms });
  })
);

const validateNewConversation = [
  check("username", "Please enter a valid email").isEmail(),
  handleValidationErrors,
];
//TODO add auth and validation
//Need to validate username, query user by that user name and get their id then create a conversation
//Would be better to search user and click on their username which sends id
//or is it the same because you would have to query twice either way with search
//search for current convos and if current convo with both users send back error
router.post(
  "/new",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { username, userId } = req.body;
    const friend = await User.findOne({ username });
    if (!friend) {
      return res.json({ err: "User does not exist" });
    }
    const convoAlreadyExists = await ChatRoom.find({
      members: friend._id.toString(),
      userId,
    });
    if (convoAlreadyExists) {
      return res.json({ err: "Conversation with this user already exists" });
    }
    const members = [friend._id.toString(), userId];
    const newChatRoom = new ChatRoom({ members, userId });
    newChatRoom.save();
    res.json(newChatRoom);
  })
);

export default router;
