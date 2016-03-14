'use strict';

var express = require('express');
var db = require('../db');
var router = express.Router();

router.get('/', function(req, res, next) {
    db.getUsers()
        .then((data) => {
            let mainUserName = data[1].name;

            res.render('index', { name: mainUserName });
        });
});

module.exports = router;
