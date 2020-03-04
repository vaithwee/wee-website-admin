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
    console.log(JSON.stringify(info));
    let infoAESString = encryptJson(info).toString();
    console.log("header aes:" + infoAESString);
    let headerSign = cryptoJS.MD5(infoAESString).toString();
    console.log("header sign" + headerSign);


    //3.path
    let path = config.url.toString();
    console.log("path: " + path);
    path = encryptString(path).toString();
    console.log("path aes: " + path);
    let pathSign = cryptoJS.MD5(path).toString();
    console.log("path sign :"+pathSign);


    let firstSign = cryptoJS.MD5(headerSign + pathSign).toString();
    console.log("first:"+ firstSign + " info: " + info) ;

    info["sign"] = firstSign;

    /////////////////////////////////////////////////////////////////
    ///二次签名
    /////////////////////////////////////////////////////////////////
    info = JSONUtil.sort(info);
    let infoSSign = cryptoJS.MD5(encryptJson(info).toString()).toString();
    console.log("second info sign :" + infoSSign);
    config.data = JSONUtil.sort(config.data);
    let bodySign = cryptoJS.MD5(JSON.stringify(config.data)).toString();
    console.log("second body sign :" + bodySign);

    let secondSign = cryptoJS.MD5(infoSSign + bodySign).toString();


    const instance = Axios.create({
        baseURL: 'http://api.vaith.xyz:9088',
        timeout: 60000,
        transformRequest: [function (data) {
            console.log("data" + data);
            if (info.en === 0) {
                return JSON.stringify(data);
            }
            return encryptJson(data);
        }],
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'info': JSON.stringify(info),
            'sign': secondSign,
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

function encryptJson(data) {
    let key = "h2uh123haj89wjoj";
    let str = JSON.stringify(data);
    key = cryptoJS.enc.Utf8.parse(key); //秘钥
    str = cryptoJS.enc.Utf8.parse(str);
    return cryptoJS.AES.encrypt(str, key, {
        mode: cryptoJS.mode.ECB,
        padding: cryptoJS.pad.Pkcs7
    });
}

function  encryptString(str) {
    let key = "h2uh123haj89wjoj";
    key = cryptoJS.enc.Utf8.parse(key); //秘钥
    str = cryptoJS.enc.Utf8.parse(str);
    return cryptoJS.AES.encrypt(str, key, {
        mode: cryptoJS.mode.ECB,
        padding: cryptoJS.pad.Pkcs7
    });
}




