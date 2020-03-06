import {request} from "./request";

let HomeAPI = {
  getInfo: function () {
    return request({
      url: "/home/info",
    });
  },
  updateHomeInfo: function (id, coverID, greeting) {
    return request({
      url: "/home/info/update",
      method: 'post',
      data: {
        id,
        coverID,
        greeting,
      }
    });
  }
};

export default HomeAPI;