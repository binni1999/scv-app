const asyncHandler = require('../middleware/asyncHandler')
const Contact = require('../models/Contact')
const User = require('../models/User')


exports.createContact = asyncHandler(async (req, res) => {
    let { name, email, phoneNumber, address, picture, description, favourite, websiteLink, linkedinLink } = req.body;
    const user = await User.findById(req.user._id);
    if (favourite) {
        favourite = favourite;
    } else {
        favourite = false;
    }
    if (user) {
        const contact = new Contact()
        contact.name = name;
        contact.email = email;
        contact.phoneNumber = phoneNumber;
        contact.address = address;
        contact.picture = picture;
        contact.description = description;
        contact.favourite = favourite;
        contact.websiteLink = websiteLink;
        contact.linkedinLink = linkedinLink;
        contact.user = user._id;
        await contact.save();
        res.status(200).json(contact)
    } else {
        res.status(200).json({
            message: 'Something went wrong !'
        })
    }
})


exports.updateContact = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, address, picture, description, favourite, websiteLink, linkedinLink } = req.body;
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);
    const user = await User.findById(req.user._id);
    if (contact && contact.user.toString() === user._id.toString()) {
        contact.name = name;
        contact.email = email;
        contact.phoneNumber = phoneNumber;
        contact.address = address;
        contact.picture = picture;
        contact.description = description;
        contact.favourite = favourite;
        contact.websiteLink = websiteLink;
        contact.linkedinLink = linkedinLink;
        contact.user = user._id;
        await contact.save();
        res.status(200).json({ contact })
    } else {
        res.status(401).json({ message: 'No contact found with the given id!' })
    }
})

exports.getAllContactOfUser = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.page) || 1;

    const { query } = req.query;

    const keyword = query ? {
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
            { phoneNumber: { $regex: query, $options: 'i' } }
        ]
    } : {};

    const count = await Contact.countDocuments({ ...keyword, user: req.user._id })
    const users = await Contact.find({ ...keyword, user: req.user._id }).limit(pageSize).skip(pageSize * (page - 1));
    if (users) {
        res.status(200).json({ contacts: users, page, pages: Math.ceil(count / pageSize) });
    } else {
        res.status(401).json({ message: 'No contact found with the given id!' })
    }
})

exports.getContactById = asyncHandler(async (req, res) => {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);
    if (contact) {
        res.status(200).json(contact)
    } else {
        res.status(401).json({ message: "No contact found with given id!" })
    }
})

exports.deleteContact = asyncHandler(async (req, res) => {
    const contactId = req.params.id;
    const user = await User.findById(req.user._id);
    const contact = await Contact.findById(contactId);
    if (contact && user._id.toString() === contact.user.toString()) {
        await Contact.findByIdAndDelete(contact._id)
        res.status(200).json({ message: "contact Deleted Successfully!" })
    } else {
        res.status(401).json({ message: "No contact found with given id!" })
    }
})

exports.getAllContact = asyncHandler(async (req, res) => {
    const contact = await Contact.find()
    if (contact) {
        res.status(200).json(contact)
    } else {
        res.status(401).json({ message: "No contact found!" })
    }
})
