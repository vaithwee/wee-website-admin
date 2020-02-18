import {request} from "@/network/request";

export function addCategory(name) {
    return request({
        url: '/category/add',
        data: {
            name,
        },
        method: 'post',
    });
}
