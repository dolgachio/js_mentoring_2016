'use strict';

module.exports = {
    DEF_IMG: 'img/upload/default-pic.jpg',

    UNAUTH: {
        NAME: 'Stranger',
        MESSAGE: 'I don\'t know you yet, please login'
    },

    LINKS: {
        LOGIN: '/login',
        REGISTER: '/register',
        REGISTER_SUCCESS: '/register-success',
        GITHUB: '/login/github'
    },

    POSTS: {
        DEF_LIMIT: 3
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
