const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' }
});

module.exports = mongoose.model('Contact', contactSchema);
