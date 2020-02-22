import {request} from "@/network/request";

export function getImageList(page, size) {
    return request({
        url: '/image/list',
        params: {
            page,
            size
        }
    });
}

export function upload(file, filename) {

    let data = new FormData();
    data.append('file', file);
    data.append('filename', filename);

    return request({
       url: '/image/upload',
        method: 'post',
        data: data,
        transformRequest: [function (data) {
            return data
        }]
    });
}
