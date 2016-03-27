'use strict';

module.exports = {
    DEF_IMG: 'img/upload/default-pic.jpg',

    UNAUTH: {
        NAME: 'Stranger',
        MESSAGE: 'I don\'t know you yet, please login'
    },

    POSTS: {
        DEF_LIMIT: 10
    },

    COMMENTS: {
        DEF_LIMIT: 3
    },

    STRATEGY: {
        LOCAL: 'local',
        GITHUB: 'github'
    },

    USER: {
        PUBLIC_PROPS: [
            '_id',
            'name',
            'email',
            'imageUrl'
        ]
    }

};
