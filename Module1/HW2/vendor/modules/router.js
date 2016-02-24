'use strict';

var xhr = require('../utils/xhr.js');
var typeChecker = require('../utils/typeChecker.js');

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
        this.el = document.querySelector('.js-data-view');
        if(this.el) {
            this._routes = [];
            this.curRoute = '';

        } else {
            throw new Error('cannot init router, because of absence of HTML hook');
        }
    }

    route(url, config) {
        if(typeof url === 'string'){
            let normalizedConfig = {};
            let configUrls = _splitUrl(url);
            Object.assign(normalizedConfig, configUrls, config);

            let normalizedRoute = _normalizeRoute(normalizedConfig);

            this._routes.push(normalizedRoute);
        }

        return this;
    }

    switchTo(newRouteUrl) {
        let _this = this;
        let route = this._getRouteByUrl(newRouteUrl);

        if(route === _this.curRoute){
            return;
        }

        if(typeChecker.isObject(_this.curRoute)) {
            _destroyViews(_this.curRoute.views);
        }

        if(route){
            location.hash = route.url;
            this.curRoute = route;

            xhr.get(route.templateUrl, function (response) {
                if(route.parent) {
                    let parser = new DOMParser();
                    let parsedTemplate = parser.parseFromString(response, 'text/xml');

                    _this._switchNested(parsedTemplate, _this._getRouteByUrl(route.parent));
                } else {
                    _this._insertTemplate(response, route);
                }
            });

            return true;
        } else {
            console.log('[router]: such route doesn\'t exist: ' + newRouteUrl);
            location.hash = this.curRoute.url;

            return false;
        }
    }

    listen() {
        let _this = this;

        function fn(){
            var match = window.location.href.match(/#(.*)$/);
            var newHash = match ? match[1] : '/home';
            newHash = newHash.toString().replace(/#/, '');

            _this.switchTo(newHash);
        }

        clearInterval(_this.interval);
        _this.interval = setInterval(fn, 50);
    }

    _insertTemplate(template) {
        let el = this.el;
        let normalizedTemplate;

        if(el) {
            if(!seal.isString(template)) {
                normalizedTemplate = new XMLSerializer().serializeToString(template);
            } else {
                normalizedTemplate = template;
            }

            el.innerHTML = normalizedTemplate;

            this._initRouteViews();
        }
    }

    _initRouteViews(route) {
        var processRoute;

        processRoute = route || this.curRoute;

        _initViews(processRoute.views);

        if(processRoute.parent) {
            this._initRouteViews(this._getRouteByUrl(processRoute.parent));
        }
    }

    _getRouteByUrl(route) {
        let routes = this._routes;
        let routesQty = routes.length;
        let i;

        for (i = 0; i < routesQty; i++) {
            if(routes[i].url === route) {
                return routes[i];
            }
        }
    }

    _switchNested(childTemplate, parentRoute) {
        let _this = this;
        let currentParent = parentRoute;

        seal.xhr.get(currentParent.templateUrl, function (template) {
            let parser = new DOMParser();
            let parsedTemplate = parser.parseFromString(template, 'text/xml');
            let insertView = parsedTemplate.querySelector('.js-data-view');
            insertView.innerHTML = _XMLtoString(childTemplate);

            if(currentParent.parent) {
                _this._switchNested(parsedTemplate, _this._getRouteByUrl(currentParent.parent));
            } else {
                _this._insertTemplate(parsedTemplate);
            }
        });
    }
}

function _destroyViews(views) {
    if(typeChecker.isArray(views)) {
        views.forEach((view) => view.destroy());
    }
}

function _initViews(views) {
    if(typeChecker.isArray(views)) {
        views.forEach((view) => view.init());
    }
}

function _XMLtoString(xml) {
    return new XMLSerializer().serializeToString(xml);
}

function _normalizeRoute(config) {
    let normalizedRoute = {
        templateUrl: config.templateUrl,
        views: config.views || []
    };

    if(config.parent) {
        normalizedRoute.parent = config.parent;
    }

    normalizedRoute.url = config.url;

    return normalizedRoute;
}

function _splitUrl(url) {
    let paths = url.split('/');
    let pathsLength = paths.length;

    if(pathsLength > 1) {
        paths.pop();

        return {
            url: url,
            parent: paths.join('/')
        };
    }
}