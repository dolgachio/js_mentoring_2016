'use strict';

module.exports = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status = 401;

        res.json({type: 'unauthorized'});
    }
};