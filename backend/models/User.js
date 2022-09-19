import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
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
        async login(email, password){
            const user = await this.findOne({email})
            if(user){
                const validatedPassword = user.comparePassword(password)
                if(validatedPassword){
                    user.password = undefined
                    return user;
                }
            }
        },
        async signup(username, email, password){
            const user = await this.findOne({email});
            if(user){
                return 'Exists';
            }
            const newUser = new this({
                username, email, password
            })
            await newUser.save();
            newUser.password = undefined;
            return newUser;
        }
    }
})

UserSchema.pre("save", async function(next){
    // const user = this;
    if(!this.isModified('password')){
        next();
    }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
})

export default mongoose.model('User', UserSchema);
