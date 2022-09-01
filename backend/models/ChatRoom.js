import mongoose from 'mongoose';

const ChatRoomSchema = new mongoose.Schema({
    members: {
        type: Array,
    },
    userId: {
        type: String,
        required: true,
    }
}, {timestamps: true});

export default mongoose.model('ChatRoom', ChatRoomSchema);
