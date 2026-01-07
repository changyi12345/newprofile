const About = require('../../models/About');
const Hero = require('../../models/Hero');
const Skill = require('../../models/Skill');
const Project = require('../../models/Project');
const Experience = require('../../models/Experience');
const Contact = require('../../models/Contact');

exports.getHome = async (req, res) => {
    try {
        const hero = await Hero.findOne();
        res.json({ success: true, data: hero });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getContact = async (req, res) => {
    try {
        const contact = await Contact.findOne();
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAbout = async (req, res) => {
    try {
        const about = await About.findOne();
        res.status(200).json({ success: true, data: about });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json({ success: true, count: skills.length, data: skills });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getExperience = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ startDate: -1 });
        res.status(200).json({ success: true, count: experiences.length, data: experiences });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
