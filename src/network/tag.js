import {request} from "@/network/request";
export function addTag(name, type, sort) {
    return request({
        url: '/tag/add',
        data: {
            name,
            type,
            sort
        },
        method: 'post'
    });
}

export function getTagList(page, size) {
    return request({
        url: '/tag/list',
        params: {
            page,
            size,
        }
    });
}

export function removeTag(id) {
    return request({
        url: '/tag/remove',
        data: {
            id,
        },
        method: 'post'
    });
}
