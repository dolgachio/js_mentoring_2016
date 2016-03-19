'use strict';

const express = require('express');
const router = express.Router();
const apiCtrl = require('../controllers/api.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

router.get('/posts', apiCtrl.getPosts);
router.get('/myPosts', authMiddleware, apiCtrl.getMyPosts);

module.exports = router;