const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,

    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    picture: {
        type: String
    },
    description: {
        type: String
    },
    favourite: {
        type: Boolean,
    },
    websiteLink: {
        type: String
    },
    linkedinLink: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

})


const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;