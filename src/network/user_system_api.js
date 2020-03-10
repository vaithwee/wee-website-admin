import {request} from "@/network/request";

let UserSystemAPI = {
  login: function (username, password) {
    return request({
      url: '/user/login',
      data: {
        username,
        password
      },
      method: 'post'
    })
  },
  valid: function () {
    return request({
      url: '/user/valid',
    });
  }
};

export default UserSystemAPI;
