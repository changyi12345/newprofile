const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    title: { type: String, default: "About Me" },
    name: String,
    role: String,
    bio: String,
    profileImage: String,
    resumeUrl: String
});

module.exports = mongoose.model('About', aboutSchema);