const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    greeting: { type: String, default: "Hi, I'm a Full Stack Developer" },
    title: { type: String, default: "Building Digital Products that matter." },
    subtitle: { type: String, default: "I specialize in building exceptional digital experiences with Next.js, Node.js, and modern web technologies." },
    primaryCtaText: { type: String, default: "View My Work" },
    secondaryCtaText: { type: String, default: "Contact Me" },
    heroImage: { type: String, default: "" }
});

module.exports = mongoose.model('Hero', heroSchema);
