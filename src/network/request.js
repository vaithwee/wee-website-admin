import Axios from "axios";
import cryptoJS from "crypto-js";

export function request(config) {
    const instance = Axios.create({
        baseURL: 'http://localhost:9088',
        timeout: 60000,
        transformRequest: [function (data) {
            console.log(data);
            let key = "h2uh123haj89wjoj";
            let str = JSON.stringify(data);
            key = cryptoJS.enc.Utf8.parse(key); //秘钥
            str = cryptoJS.enc.Utf8.parse(str);
            console.log(str);
            let result = cryptoJS.AES.encrypt(str, key, {
                mode: cryptoJS.mode.ECB,
                padding: cryptoJS.pad.Pkcs7
            });
            console.log(result);
            return result;
            // return "SAKyhQahrGQPszDWnouZyCqs5Sjjamy73gfleaenNN10OI9WVGOcSsqd+q9nfAeu";
        }],
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });
    instance.interceptors.request.use(config => {
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
