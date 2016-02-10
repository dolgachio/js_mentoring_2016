'use strict';
var dispatcher = require('./dispatcher/app.dispatcher.js');
var clockView = require('./views/clock.view.js');
var maenteesView = require('./views/mentees.view.js');

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
        templateUrl : '/templates/mentees.html',
        views: [maenteesView]
    });

router.switchTo('home');
router.listen();

