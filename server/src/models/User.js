import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100,
            trim: true,
        },
        userName: {
            type: String,
            require: true,
            trim: true,
            unique: true,
        },
        idName: {
            type: String,
            require: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        briefDesc: {
            type: String,
            trim: true,
        },
        avatar: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            default: 'Admin',
        },
        isActived: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);
