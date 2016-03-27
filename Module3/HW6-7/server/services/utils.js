'use strict';

const CONST = require('../CONST');
const POSTS = CONST.POSTS;
const Post = require('../api/models/post.js');

module.exports = {
    getUserPublicInterface,
    getCurrentStrategy,
    normalizePosts,
    normalizeComments,
    getComments,
    getNormalizedCommentsLimit,
    getPosts
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

function getPosts(query, postsLimit) {
    const normalizedQuery = query || {};
    const normalizedPostsLimit = postsLimit || POSTS.DEF_LIMIT;
    const commentsLimit = getNormalizedCommentsLimit();

    return Post.find(normalizedQuery, {comments: {$sort: [['_id', -1]] }})
        .slice('comments', commentsLimit)
        .sort([['_id', -1]])
        .limit(normalizedPostsLimit)
        .populate('postedBy')
        .populate('comments.author')
}

function getComments(postId, commentsLimit) {
    const normalizedCommentsLimit = getNormalizedCommentsLimit(commentsLimit);

    return Post.findOne({_id: postId})
        .slice('comments', normalizedCommentsLimit)
        .populate('postedBy')
        .populate('comments.author')
        .then(post => {
            return normalizeComments(post.comments)
        })
}

function getNormalizedCommentsLimit(limitAmount) {
    let normalizedValue = parseInt(limitAmount, 10);

    return (0 - normalizedValue) || (0 - CONST.COMMENTS.DEF_LIMIT);
}
