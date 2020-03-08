import {request} from "./request";

let HomeAPI = {
  getInfo: function () {
    return request({
      url: "/home/info",
    });
  },
  addInfo: function(greeting, coverID) {
    return request({
      url: '/home/addInfo',
      data: {
        greeting,
        coverID
      },
      method: 'post'
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
