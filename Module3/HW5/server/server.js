'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');
const multiparty = require('multiparty');
const fileOperator = require('./file-operator.js');
const routerFactory = require('./router.js');
const utils = require('./utils.js');

const config = require('./config');

const router = new routerFactory.Router();
const server = new http.createServer(routerFactory.rootListeningFunction.bind(router));

router.get('/', (req, res) => {
    fileOperator.sendFileSafe('index.html', res);
});

router.get('/secret', (req, res) => {
    if(utils.checkAccess(req)) {
        fileOperator.sendFileSafe('static/secret.html', res);
    } else {
        res.statusCode = 403;
        fileOperator.sendFileSafe('static/secret-prohibited.html', res);
    }
});

router.get('/post', (req, res) => {
    fileOperator.sendFileSafe('static/post-form.html', res);
});

router.post('/saveImg', (req, res) => {
    let filePath = url.parse(req.url).pathname;

    fileOperator.writeFileSafe(filePath, req, res);
});

server.listen(config.PORT);
console.log('server is listening on port: ' + config.PORT);
