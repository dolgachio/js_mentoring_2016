'use strict';

var xhr = require('../utils/xhr.js');

var router;

module.exports = getRouter;

function getRouter() {
    if(!router) {
        router = new Router();
    }

    return router;
}

class Router {
    constructor() {
        this.el = document.querySelector('[data-view]');
        if(this.el) {
            this._routes = [];
            this.curRoute = '';

        } else {
            throw new Error('cannot init router, because of absence of HTML hook');
        }
    }

    add(url, config) {
        if(typeof url === "string"){
            let routes = this._routes;
            let routesQty = routes.length;
            let i;

            for (i = 0; i < routesQty; i++) {
                if(routes.url === url) {
                    console.log("[Router]: Route ", url, "is already exist ");
                    return this;
                }
            }

            routes.push({url: url, templateUrl: config.templateUrl, views: config.views});
        }

        return this;
    }

    check(route) {
        let routes = this._routes;
        let routesQty = routes.length;
        let i;

        for (i = 0; i < routesQty; i++) {
            if(routes[i].url === route) {
                return i;
            }
        }
    }

    switchTo(newRouteUrl){
        let _this = this;
        let routes = this._routes;
        let routeId = this.check(newRouteUrl);
        let route = routes[routeId];

        if(route === routes[this.curRoute]){
            return;
        }

        if(route){
            location.hash = route.url;

            xhr.get(route.templateUrl, function (response) {
                if(_this.el) {
                    _this.el.innerHTML = response;
                }

                route.views.forEach(function (view) {
                    view.init();
                });

                _this.curRoute = routeId;
                console.log("[router]: switched to" + newRouteUrl);
            });

            return true;
        } else {
            console.log("[router]: such route doesn't exist: " + newRouteUrl);
            location.hash = this._routes[this.curRoute].url;
            return false;
        }


    }

    listen() {
        let _this = this;

        function fn(){
            var match = window.location.href.match(/#(.*)$/);
            var newHash = match ? match[1] : '';
            newHash = newHash.toString().replace(/#/, '');

            _this.switchTo(newHash);
        }

        clearInterval(_this.interval);
        _this.interval = setInterval(fn, 50);
    }
}
