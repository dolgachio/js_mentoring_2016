'use strict';
const CONST = require('../CONST');

new Vue({
    el: '#js-wall',
    data: {
        posts: [],
        user: {},
        showMyPosts: false
    },
    ready: function () {
        this.$http.get('api/posts')
            .then(response => {
                this.$set('posts', response.data.posts);
                this.$set('user', response.data.user);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    },

    methods: {
        filterPosts: function () {
            const url = _getUrlForPosts(this.showMyPosts);

            this.$http.get(url)
                .then(response => {
                    const data = response.data || {};

                    this.$set('posts', data.posts || []);
                })
                .catch(error => {
                    console.log('Error:', error);
                });
        },

        getMorePosts: function () {
            const url = _getUrlForPosts(this.showMyPosts);
            const limit = this.posts.length + CONST.POSTS.DELTA_AMOUNT;

            this.$http.get(url, {limit})
                .then(response => {
                    const data = response.data || {};

                    this.$set('posts', data.posts || []);
                })
                .catch(error => {
                    console.log('Error:', error);
                });

        },
        
        addComment: function (post) {
            let postId = post._id;
            let text = post.newComment;

            this.$http.post('api/addComment', {postId: postId, text: text})
                .then(response => {
                    _fillComments(post, response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },

        removeComment: function (post, comment) {
            const postId = post._id;
            const commentId = comment._id;

            this.$http.delete('api/removeComment', { commentId, postId })
                .then(response => {
                    _fillComments(post, response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },

        loadMoreComments: function (post) {
            const url = 'api/comments';
            const limit = post.comments.length + CONST.COMMENTS.DELTA_AMOUNT;
            const postId = post._id;

            this.$http.get(url, {limit, postId})
                .then(response => {
                    post.comments = response.data || [];
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
});

function _fillComments(post, data) {
    post.comments = data;
    post.newComment = '';
}

function _getUrlForPosts(showMyPosts) {
    return showMyPosts ? 'api/myPosts' : 'api/posts';
}

