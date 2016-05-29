'use strict';
const BASE_API_URL = 'http://swapi.co/api/';

module.exports = {
    HEROES_URL: BASE_API_URL +  'people/',
    VEHICLES_URL: BASE_API_URL + 'vehicles/',
    FILMS_URL: BASE_API_URL + 'films/',

    HEROES_HEIGHT_CHART_CLASS: '.js-chart-heroes-height',
    VEHICLES_CREW_CHART_CLASS: '.js-chart-vehicles-crew',
    FILMS_CHART_CLASS: '.js-chart-films'
};
