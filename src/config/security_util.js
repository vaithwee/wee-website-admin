import cryptoJS from "crypto-js";
import JSONUtil from "../util/json_util";

let SecurityUtil = {

  encryptString: function (key, str) {
    console.log("key: "+ key + " str: " + str);
    key = cryptoJS.enc.Utf8.parse(key);
    str = cryptoJS.enc.Utf8.parse(str);
    console.log("1111 key: "+ key + " str: " + str);
    return cryptoJS.AES.encrypt(str, key, {
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7
    }).toString();
  },

  encryptJson: function (key, data) {
    data = JSONUtil.sort(data);
    let str = JSON.stringify(data);
    return this.encryptString(key, str);
  },

  decryptString: function (key, str) {
    key = cryptoJS.enc.Utf8.parse(key);
    let decrypt = cryptoJS.AES.decrypt(str, key, {mode: cryptoJS.mode.ECB, padding: cryptoJS.pad.Pkcs7});
    return cryptoJS.enc.Utf8.stringify(decrypt).toString();
  },

  MD5: function (str) {
    return cryptoJS.MD5(str).toString();
  },

  encryptJsonToMD5: function (key, json) {
    return this.MD5(this.encryptJson(key, json))
  },

  encryptStringToMD5: function (key, json) {
    return this.MD5(this.encryptString(key, json))
  }

};

export default SecurityUtil;