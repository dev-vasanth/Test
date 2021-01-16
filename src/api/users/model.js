import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    isVerify: {
        type: Boolean,
        default : false
    }
}, {
    timestamps: true
});

userSchema.methods = {
    view(full) {
        const view = {
            id: this.id,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            email : this.email,
            isVerify : this.isVerify,
            token: this.token
        }
        return view;
    }
}

const model = mongoose.model('Users', userSchema)

export default model
