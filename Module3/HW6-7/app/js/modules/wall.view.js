'use strict';

let vm = new Vue({
    el: '#js-wall',
    data: {
        posts: {}
    },
    ready: function () {
        this.$http.get('api/posts')
            .then(response => {
                this.$set('posts', response.data);
                console.log(response.data);
            })
    }
});
