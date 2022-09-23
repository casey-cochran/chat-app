import express from "express";
import asyncHandler from "express-async-handler";
import ChatRoom from "../models/ChatRoom.js";
import User from "../models/User.js";
import requireAuth from "../utils/auth.js";
import handleValidationErrors from "../utils/validation.js";
import { check } from "express-validator";

const router = express.Router();

//Retrieve all ChatRooms based upon a users id
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


//Creates a new ChatRoom, if username does not exists it sends back err
//Likewise if the ChatRoom already exists between the two same users it sends back error
router.post(
  "/new",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { username, userId } = req.body;
    const friend = await User.findOne({ username });
    const userChatRoom = await ChatRoom.findOne({_id: userId})
    console.log(userChatRoom, ' what is this, should be nothing')
    if (!friend) {
      return res.json({ err: "User does not exist" });
    }
    const convoAlreadyExists = await ChatRoom.find({
      members: friend._id.toString(),
      userId,
    });
    if (convoAlreadyExists && userChatRoom) {
      return res.json({ err: "Conversation with this user already exists" });
    }
    const members = [friend._id.toString(), userId];
    const newChatRoom = new ChatRoom({ members, userId });
    newChatRoom.save();
    //Added timestamps to model? for new room?
    res.json({room: newChatRoom});
  })
);

//Deletes ChatRoom based upon UserId
router.delete('/delete', requireAuth, asyncHandler(async(req,res) => {
    const {convoId} = req.body;
    const deleteRoom = await ChatRoom.deleteOne({_id: convoId});
    console.log(deleteRoom.deletedCount === 1)
}))




export default router;
