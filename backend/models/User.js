import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true,
    methods:{
        async comparePassword(password){
            const validated = await bcrypt.compare(password, this.password);
            return validated
        }
    },
    statics:{
        async logIn(email, password){
            const user = await this.findOne({email})
            if(user){
                const validatedPassword = user.comparePassword(password)
                if(validatedPassword){
                    user.password = undefined
                    return user;
                }
            }
        },
    }
})

// UserSchema.methods.comparePassword = async function(password){
//     const validated = await bcrypt.compare(password, this.password);
//     return validated
// }

export default mongoose.model('User', UserSchema);
