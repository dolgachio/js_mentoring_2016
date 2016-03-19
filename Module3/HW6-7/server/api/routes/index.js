'use strict';

const defaultRoutes = require('./default');
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const apiRoutes = require('./api')

module.exports = (app) => {
    app.use('/', defaultRoutes);
    app.use('/', authRoutes);
    app.use('/', profileRoutes);
    app.use('/api', apiRoutes)
};