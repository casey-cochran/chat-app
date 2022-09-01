import mongoose from 'mongoose';

const ChatRoomSchema = new mongoose.Schema({
    members: {
        type: Array,
    },
}, {timestamps: true});

export default mongoose.model('ChatRoom', ChatRoomSchema);
