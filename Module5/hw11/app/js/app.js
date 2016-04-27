'use strict';

const mainViewFactory = require('./modules/main.view.js');
const addViewFactory = require('./modules/add.view.js');
const listViewFactory = require('./modules/list.view.js');
const navigationService = require('./services/navigation.service.js');

document.addEventListener('deviceready', function () {
    Vue.use(VueTouch);

    mainViewFactory.init();
    const addView = addViewFactory.init();
    const listView = listViewFactory.init();

    navigationService.init({
        ADD: addView.init,
        LIST: listView.init
    });

}, false);