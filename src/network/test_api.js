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
  }
};

export default TestApi;