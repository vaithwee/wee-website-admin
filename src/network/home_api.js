import {request} from "./request";

let HomeAPI = {
  getInfo: function () {
    return request({
      url: "/home/info",
    });
  }
};

export default HomeAPI;