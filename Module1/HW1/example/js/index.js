'use strict';
var dispatcher = require('./modules/app.dispatcher.js');
var clockView = require('./modules/clock/clock-view.js');

var router = seal.router();

router
    .add('docs', {
        templateUrl : '/templates/docs.html',
        views: []
    })
    .add('home', {
        templateUrl : '/templates/home.html',
        views: [clockView]
    })
    .add('donate', {
        templateUrl : '/templates/donate.html',
        views: []
    });

router.switchTo('home');
router.listen();

