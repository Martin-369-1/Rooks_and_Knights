const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//user schema
const userShema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true

    },
    profilePicture: {
        type: String
    },

    googleID: {
        type: String,
        unique: true,
        sparse: true
    },

    isblocked: {
        type: Boolean,
        required:true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })



const User = mongoose.model('users', userShema);
module.exports = User;