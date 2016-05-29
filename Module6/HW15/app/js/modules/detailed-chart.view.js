'use strict';
const CONST = require('../CONST');
const charts = require('../services/charts');
const utils = require('../services/utils');

module.exports = new Vue({
    el: '#detailed-chart-view',
    data: {
        vehiclesData: null,
        vehiclesList: null,
        vehiclesPrevPage: null,
        vehiclesNextPage: null
    },

    ready: function () {
        this._updateVehicles(CONST.VEHICLES_URL);
    },

    methods: {
        isVehiclesPrevDisabled: function () {
            return !this.$get('vehiclesPrevPage');
        },

        isVehiclesNextDisabled: function () {
            return !this.$get('vehiclesNextPage');
        },

        getNextVehiclesPage: function () {
            const nextPageUrl = this.$get('vehiclesNextPage');

            if(nextPageUrl) {
                this._updateVehicles(nextPageUrl);
            }
        },

        getPrevVehiclesPage: function () {
            const prevPageUrl = this.$get('vehiclesPrevPage');

            if(prevPageUrl) {
                this._updateVehicles(prevPageUrl);
            }
        },

        changeVehiclesChartColors: function () {
            const vehicles = this.$get('vehiclesList');

            _buildVehiclesChart(vehicles);
        },

        _updateVehicles: function (url) {
            return this.$http.get(url)
                .then( resp => {
                    const data = resp.data;

                    this.$set('vehiclesData', data);
                    this.$set('vehiclesList', data.results);

                    this.$set('vehiclesPrevPage', data.previous);
                    this.$set('vehiclesNextPage', data.next);

                    return resp;
                })
                .then(resp => {
                    const vehicles = resp.data.results;
                    _buildVehiclesChart(vehicles);
                });
        }
    }
});

function _buildVehiclesChart(vehicles) {
    const vehiclesConvertedData = utils.convertDataForSimpleChart(vehicles, 'name', 'crew');
    utils.cleanRootChart(CONST.VEHICLES_CREW_CHART_CLASS);
    charts.buildExtendedBarChart(vehiclesConvertedData, CONST.VEHICLES_CREW_CHART_CLASS);
}

