/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');

const WebSocketController = require('../api/controllers/WebSocketController');
const SMSController = require('../api/controllers/SMSController');

const initRoutes = (app) => {
    router.put('*/socket/push', multer().array('formData'), WebSocketController.push);
    router.put('*/socket/push-all', multer().array('formData'), WebSocketController.pushAll);

    router.post('*/sms/send', multer().array('formData'), SMSController.send);

    app.use('/', router);
};

module.exports = initRoutes;
