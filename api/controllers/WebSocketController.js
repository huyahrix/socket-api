/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
'use strict';

const SMSController = {
    push: async (req, res) => {
        console.log('===== WebSocketController.push =====');
        let clietns = req.app.get('clietns');
        const params = req.body;
        if (!params || !params.to) {
            return res.json({ code: 'ERR001', message: 'invalid params.', data: null });
        }

        if (clietns && clietns[params.to] && clietns[params.to].readyState === 1) {
            clietns[params.to].send(JSON.stringify(params));
            console.log(`===== WebSocketController.push | id ${params.to} -> sent successful`);
            return res.json({ code: 200, message: '', data: { Status: 0, Message: 'successful' } });
        }
        console.log(`===== WebSocketController.push | id ${params.to} -> error : client id not found`);
        return res.json({ code: 200, message: '', data: { Status: 1, Message: 'client id not found' } });
    },
    pushAll: async (req, res) => {
        console.log('===== WebSocketController.pushAll =====');
        let socket = req.app.get('socket');
        const data = require('../services/data');
        socket.clients.forEach((client) => {
            if (client.readyState === 1) {
                console.log('id:', `'${client.id}'`);
                client.send(JSON.stringify(data));
            }
        });
        res.json({ code: 200, message: '', data: { Status: 0, Message: '' } });
    },
};

module.exports = SMSController;