
/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
'use strict';
/**
 * SMS MESSENGER https://portal.vietguys.biz/
 * API docs:
 * https://portal.vietguys.biz/downloads/VIETGUYS_MESSENGER_USER_GUIDE_EN_2019.pdf
 * http://sms.vietguys.biz/resource/api/HTTPGET_VIETGUYS_SMS_API_VN.pdf
 */
const axios = require('axios');

const SMSService = {
    /**
    * sending general sms
    * @param {params}
    */
    send: async (params) => {
        winston.info('===== SMSService.send =====');
        let data = {};
        try {
            data = JSON.stringify({
                'u': params.user,
                'pwd': params.password,
                'from': params.from,
                'phone': params.phone,
                'sms': params.sms,
                'bid': params.bid,
                'json': params.json,
            });
        } catch (e) {
            winston.error(util.format('===== SMSService.send =====', e));
            return;
        }

        const config = {
            method: 'post',
            url: 'https://cloudsms4.vietguys.biz:4438/api/index.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                winston.info(JSON.stringify(response.data));
                return;
            })
            .catch(function (e) {
                winston.error(util.format('===== SMSService.send', e));
                return;
            });
        return;
    }
};
module.exports = SMSService;
