'use strict';

const express = require('express');
const router = express.Router();
const ctrlProfile = require('../controllers/profile.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');


router.get('/profile', ctrlProfile.getProfile);
router.get('/loadForm', authMiddleware, ctrlProfile.getImageLoadPage);
router.post('/createPost', authMiddleware, ctrlProfile.createPost);

module.exports = router;

