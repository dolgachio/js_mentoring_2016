'use strict';

const CONST = require('../CONST');
let imagesLayers = [];
let avatarCanvas = null;
let avatarCanvasCtx = null;

module.exports = {
    init,
    setLayer,
    downloadAvatar,
    couldBeDownloaded
};

function init() {
    avatarCanvas = document.querySelector(CONST.AVATAR_CLASS);
    avatarCanvasCtx = avatarCanvas.getContext('2d');
}

function setLayer(type, img) {
    if(type && img) {
        const id = CONST.AVATAR_LAYERS_INDEXES[type];
        imagesLayers[id] = img;
        _render();
    }
}

function downloadAvatar(link) {
    if(avatarCanvas && link) {
        link.href = avatarCanvas.toDataURL();
        link.download = _generateUniqueFileName();
        _cleanImageLayers();
    }
}

function couldBeDownloaded() {
    return imagesLayers.length > 0;
}

function _render() {
    avatarCanvasCtx.clearRect(0, 0, avatarCanvas.width, avatarCanvas.height);
    imagesLayers.forEach(img => {
        avatarCanvasCtx.drawImage(img, 0, 0, img.width, img.height);
    });
}

function _cleanImageLayers() {
    imagesLayers = [];
}

function _S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function _generateUniqueFileName() {
    return (_S4()+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+_S4()+_S4()) + '.png';
}