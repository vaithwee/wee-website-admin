import {request} from "./request";
let TestApi = {
  sec: function () {
      return request({
          url: '/test/sec',
          method: 'post',
          data:{
              "title": "标222题",
              "zw": "汉222字",
              "id": 98378277
          },
          params: {
              "page": 1,
              "size": 20,
          }
      })
  },
    noen: function () {
        return request({
            url: "/test/noen",
            method: 'get'
        });
    }
    ,login: function (username, password) {
        return request({
            url: '/user/login',
            method: 'post',
            data: {
                username,
                password,
            }
        });
    }
};

export default TestApi;
