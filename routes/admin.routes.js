const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const adminAuth = require('../middleware/adminAuth');
const upload = require('../middleware/upload');

// Auth Routes
router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);
router.get('/logout', adminController.logout);

// Protected Routes
router.use(adminAuth);

router.get('/dashboard', adminController.getDashboard);

// Hero
router.get('/hero', adminController.getEditHero);
router.post('/hero', upload.single('heroImage'), adminController.postEditHero);

// About
router.get('/about', adminController.getEditAbout);
router.post('/about', upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), adminController.postEditAbout);

// Contact
router.get('/contact', adminController.getEditContact);
router.post('/contact', adminController.postEditContact);

// Skills
router.get('/skills', adminController.getManageSkills);
router.post('/skills', adminController.postAddSkill);
router.delete('/skills/:id', adminController.deleteSkill);

// Projects
router.get('/projects', adminController.getManageProjects);
router.post('/projects', upload.single('image'), adminController.postAddProject);
router.delete('/projects/:id', adminController.deleteProject);

// Experience
router.get('/experience', adminController.getManageExperience);
router.post('/experience', adminController.postAddExperience);
router.delete('/experience/:id', adminController.deleteExperience);

module.exports = router;