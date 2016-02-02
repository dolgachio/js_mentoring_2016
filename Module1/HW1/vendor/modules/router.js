'use strict';

var xhr = require('../utils/xhr.js');

var router;
var el;

module.exports = getRouter;

function getRouter() {
    if(!router) {
        router = CreateRouter();
    }

    return router;
}

function CreateRouter() {
    el = document.querySelector('[data-view]');

    if(!el) {
        throw new Error('cannot init router, because of absence of HTML hook');
    }

    return {
        routes: [],
        curRoute: '',
        add: add,
        check: check,
        switchTo: switchTo,
        listen: listen
    };

    function add(url, config){
        if(typeof url === "string"){
            for (var i = 0; i < this.routes.length; i++) {
                if(this.routes[i].url === url) {
                    console.log("[Router]: Route ", url, "is already exist ");
                    return this;
                }
            }
            this.routes.push({url: url, templateUrl: config.templateUrl, views: config.views});
        }

        return this;
    }

    function check(route){
        for (var i = 0; i < this.routes.length; i++) {
            if(this.routes[i].url === route) {
                return i;
            }
        }
    }

    function switchTo(newRoute){
        var routeId = this.check(newRoute);
        var route = this.routes[routeId];

        if(route === this.routes[this.curRoute]){
            return;
        }

        if(route){
            location.hash = route.url;

            xhr.get(route.templateUrl, function (response) {
                if(el) {
                    el.innerHTML = response;
                }

                route.views.forEach(function (view) {
                    view.init();
                });
            });

            this.curRoute = routeId;
            console.log("[router]: switched to", newRoute);

            return true;
        }
        else{
            console.log("[router]: such route doesn't exist: ", newRoute);
            location.hash = this.routes[this.curRoute].url;
            return false;
        }
    }

    function listen(){
        var self = this;

        function fn(){
            var match = window.location.href.match(/#(.*)$/);
            var newHash = match ? match[1] : '';
            newHash = newHash.toString().replace(/#/, '');

            console.log("[router]hash changed to", newHash);
            switchTo.call(self, newHash);
        }

        clearInterval(self.interval);
        self.interval = setInterval(fn, 50);
    }
}
