const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");


exports.login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,

        })
    } else {
        res.status(401).json({ message: "Invalid email or password" })
    }

})

exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, about, profilePic, phoneNumber } = req.body;
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(401)
        throw new Error('User Already Exist')
    }
    const user = await User.create({ name, email, password, about, profilePic: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600", phoneNumber });
    if (user) {
        generateToken(res, user._id);
        const usertosend = await User.findById(user._id).select('_id name email phoneNumber profilePic userType')
        res.status(200).json({
            user: usertosend,
            message: 'success'
        })
    }
})


exports.logout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        message: "Logged out successfully"
    })
})


exports.updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { name, email, about, profilePic, phoneNumber } = req.body;
    if (user) {
        user.email = email;
        user.name = name;
        user.about = about;
        user.profilePic = profilePic;
        user.phoneNumber = phoneNumber;
        await user.save();
        res.status(200).json({
            user,
            message: 'User Updated Successfully'
        })
    }
    else {
        res.status(401).json({ message: 'User Not Found ' })
    }

})


exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        await user.findByIdAndDelete(user._id);
        res.status(200).json({
            message: 'User Deleted Sucessfully '
        })
    }
    else {
        res.status(401).json({
            message: 'User is not Found or already deleted! '
        })
    }
})


exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
})


exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('name email phoneNumber about userType profilePic');
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(401).json({ message: 'User Not Found ' })
    }

})

exports.updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        const updatedUser = await User.findByIdAndUpdate(user._id, req.body, { new: true })
        const newuser = await User.findById(updatedUser._id).select('name email phoneNumber profilePic about userType')
        res.status(200).json({
            message: 'User Updated Successfully',
            user: newuser
        })
    }
    else {
        res.status(401).json({ message: 'User Not Found ' })
    }
})