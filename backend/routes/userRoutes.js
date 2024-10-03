const express = require('express')
const router = express.Router();
const userController = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { getAllUsers, login, registerUser, deleteUser, updateUser, logout, getUserProfile, updateUserProfile } = userController;
const { protect, admin } = authMiddleware;

router.route('/').get(getAllUsers)
router.route('/signup').post(registerUser);
router.route('/login').post(login);
router.route('/logout').post(logout);
//router.route('/:id').delete(deleteUser).put(updateUser);
router.route('/profile').put(protect, updateUserProfile).get(protect, getUserProfile)

module.exports = router;