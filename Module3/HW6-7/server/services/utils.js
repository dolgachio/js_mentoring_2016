'use strict';

const CONST = require('../constants');

module.exports = {
    getUserPublicInterface,
    getCurrentStrategy,
    normalizePosts,
    normalizeComments
};

function getUserPublicInterface(user) {
    if(!user) {
        return null;
    }

    const strategy = getCurrentStrategy(user);
    const normalizedUser = user[strategy];
    normalizedUser._id = user._id;

    return CONST.USER.PUBLIC_PROPS.reduce((prevValue, publicProp) => {
        prevValue[publicProp] = normalizedUser[publicProp] || '';
        return prevValue;
    }, {})
}


function getCurrentStrategy(user) {
    const local = CONST.STRATEGY.LOCAL;
    const github = CONST.STRATEGY.GITHUB;
    const PUBLIC_PROPS = CONST.USER.PUBLIC_PROPS;

    return PUBLIC_PROPS.some((prop) => {return user[local][prop];}) ? local : github;
}

function normalizePosts(posts) {
    return posts.map(post => {
        return {
            _id: post._id,
            title: post.title,
            postedBy: getUserPublicInterface(post.postedBy),
            comments: normalizeComments(post.comments)
        }
    });
}

function normalizeComments(comments) {
    return comments.map(comment => {
        return {
            _id: comment._id,
            text: comment.text,
            author: getUserPublicInterface(comment.author)
        }
    })
}