'use strict';
var clockView = require('./views/clock.view.js');
var menteesView = require('./views/mentees.view.js');

var router = seal.router();

router
    .route('/home', {
        templateUrl : '/templates/home.html',
        views: [clockView]
    })
    .route('/mentees', {
        templateUrl : '/templates/mentees.html',
        views: [menteesView]
    })
    .route('/homework', {
        templateUrl : '/templates/homework.html',
        views: []
    });

router.switchTo('/home');
router.listen();

