'use strict';
const navigationService = require('../services/navigation.service.js');

module.exports = {
    init: function () {
        return new Vue({
            el: '.state_main',
            data: {},

            methods: {
                navigateTo: function (stateName) {
                    navigationService.go(stateName);
                }
            }
        });

    }
};
