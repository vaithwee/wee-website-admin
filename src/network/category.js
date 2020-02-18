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

export function getCategoryList(page, size) {
    return request({
        url: '/category/list',
        params: {
            page,
            size
        }
    });
}

export function removeCategoryById(id) {
    return request({
        url: '/category/remove',
        data: {
            id
        },
        method: 'post'
    });
}
