import {request} from "@/network/request";
let ImageAPI = {
    getImageList :function(page, size) {
    return request({
        url: '/image/list',
        params: {
            page,
            size
        }
    });
    },
    upload: function (file, filename) {

        let data = new FormData();
        data.append('file', file);
        data.append('type', 1);
        data.append('filename', filename);

        return request({
            url: '/image/upload',
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                return data
            }],
            isFile: true,
        });
    },
  mkupload: function (file, filename) {

    let data = new FormData();
    data.append('file', file);
    data.append('type', 0);
    data.append('filename', filename);

    return request({
      url: '/image/upload',
      method: 'post',
      data: data,
      transformRequest: [function (data) {
        return data
      }],
      isFile: true,
    });
  },
    remove: function (id) {
        return request({
            url: '/image/remove',
            method: 'post',
            data: {
                id
            },
        })
    }
};

export default ImageAPI;
