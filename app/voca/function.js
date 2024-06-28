const axios = require('axios');
const crypto = require('crypto');

const host = "https://api-bisnis.vocagame.com/v1/core" // User harus member aktif dan mempunyai saldo
const merchantID = "xxxx"
const secretKey = "xxxx"
const callbackKey = "xxxx"

async function voca_curl(url, post = false, datas = null){
    let config = {
        method : (post) ? "post" : "get",
        url: url,
        headers: {
            'X-Merchant': merchantID,
            'Content-type': "application/json",
        },
        data: (post) ? datas : null,
    }
    let respon = await axios(config);
    return respon.data;
}

function generate_signature(endpoint){
    let string = merchantID + endpoint;
    const signature = crypto.createHmac('sha256', secretKey)
        .update(merchantID + endpoint)
        .digest('hex');
    return signature;
}

module.exports = {
    host,
    merchantID,
    secretKey,
    callbackKey,
    voca_curl,
    generate_signature
}