const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,

    },
    about: {
        type: String

    },
    userType: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    profilePic: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    enabled: {
        type: Boolean,
        default: false
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    provider: {
        type: String,
        enum: ['SELF', 'GOOGLE', 'FACEBOOK', 'TWITTER', 'LINKEDIN', 'GITHUB'],
        default: 'SELF'
    },
    googleId: {
        type: String

    },
    emailToken: {
        type: String
    }

}, {
    timestamps: true
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema);
module.exports = User;