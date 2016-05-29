'use strict';
const CONST = require('../CONST');
const imageStore = require('./image.store');
const CLASSES = CONST.CLASSES;
const ATTR = CONST.ATTR;

module.exports = {
    createDetailsRow
};

function createDetailsRow(row) {
    const doc = document;
    const rootDetailsEl = doc.querySelector(CONST.DETAILS_CLASSES[row.title]);
    const fragment = doc.createDocumentFragment();
    imageStore[row.title] = [];
    const currentStore = imageStore[row.title];

    row.options.forEach(option => {
        const li = doc.createElement('li');
        const canvas = doc.createElement('canvas');
        li.className = CLASSES.GROUP.ITEM;
        canvas.className = CLASSES.AVATAR;
        canvas.width = CONST.CANVAS_WIDTH;
        canvas.height = CONST.CANVAS_HEIGHT;

        li.appendChild(canvas);
        _addCanvasImages(canvas, option.url, row.title);
        _setDataAttributes(canvas, row.title, option.id);

        fragment.appendChild(li);
    });

    rootDetailsEl.appendChild(fragment);

    function _addCanvasImages(canvas, mainUrl, rowTitle) {
        const canvasCtx = canvas.getContext('2d');
        const bgImg= new Image();
        const mainImg = new Image();

        bgImg.src = CONST.BLANK_IMG_URL;
        bgImg.onload = function () {
            canvasCtx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);
        };

        mainImg.src = mainUrl;
        mainImg.onload = function () {
            canvasCtx.drawImage(mainImg, 0, 0, mainImg.width, mainImg.height);
            currentStore.push(mainImg);

            if(rowTitle === 'face') {
                const animate = _getAnimationFunction(canvasCtx, bgImg, mainImg);
                animate();
            }
        };
    }
}

function _setDataAttributes(el, group, id) {
    el.setAttribute(ATTR.DETAILS_GROUP, group);
    el.setAttribute(ATTR.DETAIL_ID, id);
}

function _getAnimationFunction(ctx, bgImg, img) {
    return animate;

    function animate() {
        ctx.clearRect(0, 0, 96, 96);
        rotate(ctx, img);
        ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);

        requestAnimationFrame(animate);
    }
}

function rotate(ctx, img) {
    ctx.translate(img.width / 2, img.height / 2);
    ctx.rotate(Math.PI / 180);
    ctx.translate(-img.width / 2, - img.height / 2);
}
