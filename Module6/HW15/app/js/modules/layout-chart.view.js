'use strict';
const CONST = require('../CONST');
const charts = require('../services/charts');
const utils = require('../services/utils');

module.exports = new Vue({
    el: '#layout-chart-view',
    data: {
        filmsList: null
    },

    ready: function () {
        this._updateFilms(CONST.FILMS_URL);
    },

    methods: {
        _updateFilms: function (url) {
            return this.$http.get(url)
                .then( resp => {
                    const data = resp.data;
                    const films = data.results;
                    const _this = this;
                    setTimeout(allPlanetsLoadedCheck, 100);

                    films.forEach(film => {
                        film.planets.forEach((planet, index, planets) => {
                            this.$http.get(planet)
                                .then(resp => {
                                    planets[index] = {
                                        name: resp.data.name,
                                        size: parseInt(resp.data.diameter, 10) || 0
                                    };
                                });
                        });
                    });

                    function allPlanetsLoadedCheck() {
                        const isPlanetsLoaded  = films.every(film => {
                            return film.planets.every(planet => {
                                return typeof planet === 'object';
                            });
                        });

                        if(isPlanetsLoaded) {
                            _this.$set('filmsList', films);

                            const convertedData = utils
                                .convertDataForLayout(films, 'title', 'planets');

                            charts.buildLayoutChart(convertedData, CONST.FILMS_CHART_CLASS);

                        } else {
                            setTimeout(allPlanetsLoadedCheck, 200);
                        }
                    }

                    return resp;
                });
        }
    }
});
