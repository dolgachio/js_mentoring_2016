'use strict';

const defaultRoutes = require('./default');
const authRoutes = require('./auth');
const profileRoutes = require('./profile');

module.exports = (app) => {
    app.use('/', defaultRoutes);
    app.use('/', authRoutes);
    app.use('/', profileRoutes);
};