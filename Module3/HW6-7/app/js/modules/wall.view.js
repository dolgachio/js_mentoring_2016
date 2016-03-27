'use strict';
const CONST = require('../CONST');

new Vue({
    el: '#js-wall',
    data: {
        posts: [],
        user: null,
        newPost: '',
        showMyPosts: false,
        socket: {}
    },
    ready: function () {
        const _this = this;

        this.$http.get('api/posts')
            .then(response => {
                const user = response.data.user;
                const posts = response.data.posts;

                this.$set('posts', posts);
                this.$set('user', user);

                if(user) {
                    _this.socket = io('http://localhost:3000');

                    _this.socket.on('updateComments', (data) => {
                        const postId = data.postId;
                        const comments = data.comments;

                        _this.posts.forEach((post) => {
                            if(post._id === postId) {
                                post.comments = comments;
                            }
                        });
                    });

                    _this.socket.on('updatePosts', (data) => {
                        console.log(data.posts);
                        _this.$set('posts', data.posts);
                    });
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
    },

    methods: {
        createPost: function (newPost) {
            this.$set('newPost', '');
            this.socket.emit('createPost', {text: newPost});
        },

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
            const postId = post._id;
            const text = post.newComment;
            const _this = this;

            post.newComment = '';
            _this.socket.emit('addComment', {postId: postId, text: text} );
        },

        removeComment: function (post, comment) {
            const postId = post._id;
            const commentId = comment._id;
            const _this = this;

            _this.socket.emit('removeComment', {postId, commentId});
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

function _getUrlForPosts(showMyPosts) {
    return showMyPosts ? 'api/myPosts' : 'api/posts';
}

