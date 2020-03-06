import Axios from "axios";
import cryptoJS from "crypto-js";
import JSONUtil from "../util/json_util";
import SecurityUtil from "../config/security_util";
import SecurityConfig from "../config/security_config";

export function request(config) {

  let info = {
    "en": 0,
    "appid": 1,
    "timestamp": Date.parse(new Date()),
  };


  /////////////////////////////////////////////////////////////////
  ///首次次签名
  /////////////////////////////////////////////////////////////////

  let infoSign = SecurityUtil.encryptJsonToMD5(SecurityConfig.accessKey, info);
  let pathSign = SecurityUtil.encryptStringToMD5(SecurityConfig.accessKey, config.url.toString());
  info["sign"] = cryptoJS.MD5(infoSign + pathSign).toString();

  /////////////////////////////////////////////////////////////////
  ///二次签名
  /////////////////////////////////////////////////////////////////
  info = JSONUtil.sort(info);
  let infoSSign = SecurityUtil.encryptJsonToMD5(SecurityConfig.accessKey, info);
  let bodySign = "";
  console.log(typeof config.data);
  if (config.data !== undefined) {
     let data = JSONUtil.sort(config.data);
    bodySign = SecurityUtil.MD5(JSON.stringify(data));
    if (config.isFile === undefined || config.isFile === false) {
      config.data = data;
    }
  }
  let secondSign = cryptoJS.MD5(infoSSign + bodySign).toString();

  let headers = {
    'info': JSON.stringify(info),
    'sign': secondSign,
  };

  if (config.isFile === undefined || config.isFile === false) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
  }


  const instance = Axios.create({
    baseURL: 'http://api.vaith.xyz:9088',
    timeout: 60000,
    transformRequest: [function (data) {
      if (data === undefined) {
        return data;
      }
      if (info.en === 0) {
        return JSON.stringify(data);
      }
      return SecurityUtil.encryptJson(SecurityConfig.accessKey, data);
    }],
    headers,
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
      return JSON.parse(SecurityUtil.decryptString(SecurityConfig.securityKey, res.data));
    }
  }, error => {
    console.log(error);
  });

  return instance(config);
}




