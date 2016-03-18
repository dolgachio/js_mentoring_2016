'use strict';

const express = require('express');
const router = express.Router();
const ctrlProfile = require('../controllers/profile.controller.js');

router.get('/profile', ctrlProfile.getProfile);
router.post('/createPost', ctrlProfile.createPost);

module.exports = router;

