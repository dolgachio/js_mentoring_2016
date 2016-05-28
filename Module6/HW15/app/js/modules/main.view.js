'use strict';
const CONST = require('../CONST');
const charts = require('../services/charts');
const utils = require('../services/utils');


module.exports = new Vue({
            el: '#main-view',
            data: {
                name: 'User',
                heroesData: {},
                heroesList: [],
                heroesPrevPage: null,
                heroesNextPage: null
            },
            ready: function () {
                this._updateHeroes(CONST.HEROES_URL);

                //buildExtendedBarChart();
            },

            methods: {
                isHeroesPrevDisabled: function () {
                    return !this.$get('heroesPrevPage');
                },

                isHeroesNextDisabled: function () {
                    return !this.$get('heroesNextPage');
                },

                getNextHeroesPage: function () {
                    const nextPageUrl = this.$get('heroesNextPage');

                    if(nextPageUrl) {
                        this._updateHeroes(nextPageUrl);
                    }
                },

                getPrevHeroesPage: function () {
                    const prevPageUrl = this.$get('heroesPrevPage');

                    if(prevPageUrl) {
                        this._updateHeroes(prevPageUrl);
                    }
                },

                changeHeroesChartColors: function () {
                    const heroes = this.$get('heroesList');

                    _buildHeroesChart(heroes, 'height');
                },

                _updateHeroes: function (url) {
                    return this.$http.get(url)
                        .then( resp => {
                            const data = resp.data;

                            this.$set('heroesData', data);
                            this.$set('heroesList', data.results);

                            this.$set('heroesPrevPage', data.previous);
                            this.$set('heroesNextPage', data.next);

                            return resp;
                        })
                        .then(resp => {
                            const heroes = resp.data.results;
                            _buildHeroesChart(heroes, 'height');
                        });
                }
            }
});

function _cleanRootChart() {
    const root = document.querySelector('.chart');
    root ? root.innerHTML = '' : '';
}

function _buildHeroesChart(heroes, compareField) {
    const heroesConvertedData = utils.convertDataForSimpleChart(heroes, 'name', compareField);
    _cleanRootChart();
    charts.buildSimpleChart(heroesConvertedData, compareField);
}

