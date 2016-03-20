'use strict';

let vm = new Vue({
    el: '#js-wall',
    data: {
        posts: {},
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
            })
    },

    methods: {
        filterPosts: function () {
            const showMyPosts = this.showMyPosts;
            const url = showMyPosts ? 'api/myPosts' : 'api/posts';

            this.$http.get(url)
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
                    post.comments = response.data;
                    post.newComment = '';
                })
                .catch(error => {
                    console.log(error);
                })
        },

        removeComment: function (post, comment) {
            const postId = post._id;
            const commentId = comment._id;

            this.$http.delete('api/removeComment', { commentId, postId })
                .then(response => {
                    post.comments = response.data;
                    post.newComment = '';
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
});

