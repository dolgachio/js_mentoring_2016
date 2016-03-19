'use strict';

let vm = new Vue({
    el: '#js-wall',
    data: {
        posts: {},
        showMyPosts: false
    },
    ready: function () {
        this.$http.get('api/posts')
            .then(response => {
                this.$set('posts', response.data);
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
                    this.$set('posts', response.data);

                    console.log(response.data);
                })
                .catch(error => {
                    console.log('Error:', error);
                });
        }
    }
});

