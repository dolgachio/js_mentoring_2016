/*
Trifon framework
*/

var factory = require('./modules/main.factory.js');

(function () {
    var root = (typeof self === 'object' && self.self === self && self);

    root.seal = factory();
})(factory);