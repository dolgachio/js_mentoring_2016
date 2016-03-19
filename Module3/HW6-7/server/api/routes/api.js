'use strict';

const express = require('express');
const router = express.Router();
const apiCtrl = require('../controllers/api.controller.js');

router.get('/posts', apiCtrl.getPosts);

module.exports = router;