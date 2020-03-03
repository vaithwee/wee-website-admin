import Axios from "axios";
import cryptoJS from "crypto-js";

export function request(config) {

    let info = {
        "en": 0,
        "appid": 1
    };
    let sign = cryptoJS.MD5(encrypt(info).toString()).toString();

    const instance = Axios.create({
        baseURL: 'http://localhost:9088',
        timeout: 60000,
        transformRequest: [function (data) {
            console.log("data" + data);
            if (info.en === 0) {
                return JSON.stringify(data);
            }
            return encrypt(data);
        }],
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'info': JSON.stringify(info),
            sign
        }
    });
    instance.interceptors.request.use(config => {
        console.log(config);
        return config;
    }, error => {
        console.log(error);
    });

    instance.interceptors.response.use(res => {
        return res.data;
    }, error => {
        console.log(error);
    });


    return instance(config);
}

function encrypt(data) {
    let key = "h2uh123haj89wjoj";
    let str = JSON.stringify(data);
    key = cryptoJS.enc.Utf8.parse(key); //秘钥
    str = cryptoJS.enc.Utf8.parse(str);
    return cryptoJS.AES.encrypt(str, key, {
        mode: cryptoJS.mode.ECB,
        padding: cryptoJS.pad.Pkcs7
    });
}
