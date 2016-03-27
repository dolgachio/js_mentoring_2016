'use strict';

const express = require('express');
const router = express.Router();
const apiCtrl = require('../controllers/api.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');
const fileOperator = require('../services/file-operator.js');

router.get('/posts', apiCtrl.getPosts);
router.get('/myPosts', authMiddleware, apiCtrl.getMyPosts);
router.get('/comments', authMiddleware, apiCtrl.getMoreComments);

router.post('/loadImg', authMiddleware, fileOperator.writeFileSafe);

module.exports = router;