'use strict';
const CONST = require('../CONST');
const ATTR = CONST.ATTR;
const detailsCanvasService = require('../services/details-canvas');
const avatarCanvasService = require('../services/avatar-canvas');
const imageStore = require('../services/image.store');

module.exports = new Vue({
            el: '#main-view',
            data: {
                allImagesProcessed: false
            },
            ready,
            methods: {
                isAllProcessed: function () {
                    return this.$get('allImagesProcessed');
                },

                detailsClicked: function (event) {
                    const target = event.target;

                    if(target && target.nodeName.toLowerCase() === 'canvas') {
                        const detailType = target.getAttribute(ATTR.DETAILS_GROUP);
                        const detailId = target.getAttribute(ATTR.DETAIL_ID);
                        const detailImg = imageStore[detailType][detailId];

                        avatarCanvasService.setLayer(detailType, detailImg);
                    }
                },

                download: function (event) {
                    if(event && avatarCanvasService.couldBeDownloaded()) {
                        const link = event.target;

                        avatarCanvasService.downloadAvatar(link);
                    }
                }
            }
});

function ready() {
    avatarCanvasService.init();

    this.$http.get(CONST.DETAILS_URL)
        .then(resp => {
            resp.data.forEach(detailsCanvasService.createDetailsRow);
        });

    this.$set('allImagesProcessed', true);
}