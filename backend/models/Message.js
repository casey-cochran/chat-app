import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    chatRoomId:{
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    text:{
        type: String
    }
}, {timestamps: true});

export default mongoose.model('Message', MessageSchema);
