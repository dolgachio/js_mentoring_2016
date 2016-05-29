'use strict';
const BASE_URL = 'http://localhost:8080/';


module.exports = {
    DETAILS_URL: `${BASE_URL}data/details.json`,
    BLANK_IMG_URL: 'http://localhost:8080/img/avatar/blankface.gif',

    AVATAR_CLASS: '.js-avatar',

    DETAILS_CLASSES: {
        face: '.js-group-face',
        hair: '.js-group-hair',
        eyes: '.js-group-eyes',
        nose: '.js-group-nose',
        mouse: '.js-group-mouse',
        mustache: '.js-group-mustache'
    },

    CLASSES: {
        GROUP: {
            ITEM: 'group-list__item'
        },
        AVATAR: 'avatar'
    },

    AVATAR_LAYERS_INDEXES: {
        face: 0,
        nose: 1,
        eyes: 2,
        hair: 3,
        mouse: 4,
        mustache: 5
    },

    CANVAS_WIDTH: '96',
    CANVAS_HEIGHT: '96',

    ATTR: {
        DETAILS_GROUP: 'data-details-group',
        DETAIL_ID: 'data-detail-id'
    }
};
