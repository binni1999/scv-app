const express = require('express')
const router = express.Router();
const contactController = require('../controller/contactController')
const authMiddleware = require('../middleware/authMiddleware')
const { createContact, deleteContact, getAllContact, getAllContactOfUser, getContactById, updateContact } = contactController;
const { protect, } = authMiddleware;

router.route('/').post(protect, createContact).get(getAllContact)
router.route('/user').get(protect, getAllContactOfUser);
router.route('/:id').get(getContactById).put(protect, updateContact).delete(protect, deleteContact)

module.exports = router;