import Axios from "axios";
import cryptoJS from "crypto-js";
import JSONUtil from "../util/JSONUtil";

export function request(config) {

    let info = {
        "en": 1,
        "appid": 1,
        "timestamp": Date.parse(new Date()),
    };


    /////////////////////////////////////////////////////////////////
    ///首次次签名
    /////////////////////////////////////////////////////////////////

    //1. sort info
    info = JSONUtil.sort(info);
    let infoAESString = dencryptJson(info).toString();
    let headerSign = cryptoJS.MD5(infoAESString).toString();


    //3.path
    let path = config.url.toString();
    path = dencryptString(path).toString();
    let pathSign = cryptoJS.MD5(path).toString();


    let firstSign = cryptoJS.MD5(headerSign + pathSign).toString();

    info["sign"] = firstSign;

    /////////////////////////////////////////////////////////////////
    ///二次签名
    /////////////////////////////////////////////////////////////////
    info = JSONUtil.sort(info);
    let infoSSign = cryptoJS.MD5(dencryptJson(info).toString()).toString();
    let bodySign = "";
    if (config.data !== undefined) {
        config.data = JSONUtil.sort(config.data);
        bodySign = cryptoJS.MD5(JSON.stringify(config.data)).toString();
    }


    let secondSign = cryptoJS.MD5(infoSSign + bodySign).toString();


    const instance = Axios.create({
        baseURL: 'http://api.vaith.xyz:9088',
        timeout: 60000,
        transformRequest: [function (data) {
            if (info.en === 0) {
                return JSON.stringify(data);
            }
            return dencryptJson(data);
        }],
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'info': JSON.stringify(info),
            'sign': secondSign,
        },
        // transformResponse: [function (data) {
        //     let res = encryptString(JSON.parse(data));
        //     return res;
        // }]
    });
    instance.interceptors.request.use(config => {
        return config;
    }, error => {
        console.log(error);
    });

    instance.interceptors.response.use(res => {
        if (res.headers.en === "0") {
            return res.data;
        } else {
            return JSON.parse(encryptString(res.data));
        }
    }, error => {
        console.log(error);
    });


    return instance(config);
}

function dencryptJson(data) {
    let key = "h2uh123haj89wjoj";
    let str = JSON.stringify(data);
    key = cryptoJS.enc.Utf8.parse(key); //秘钥
    str = cryptoJS.enc.Utf8.parse(str);
    return cryptoJS.AES.encrypt(str, key, {
        mode: cryptoJS.mode.ECB,
        padding: cryptoJS.pad.Pkcs7
    });
}

function dencryptString(str) {
    let key = "h2uh123haj89wjoj";
    key = cryptoJS.enc.Utf8.parse(key); //秘钥
    str = cryptoJS.enc.Utf8.parse(str);
    return cryptoJS.AES.encrypt(str, key, {
        mode: cryptoJS.mode.ECB,
        padding: cryptoJS.pad.Pkcs7
    });
}

function encryptString(word) {
    let key = "h2uh123haj89wjoj";
    key = cryptoJS.enc.Utf8.parse(key);
    let decrypt = cryptoJS.AES.decrypt(word, key, {mode: cryptoJS.mode.ECB, padding: cryptoJS.pad.Pkcs7});
    return cryptoJS.enc.Utf8.stringify(decrypt).toString();
}






