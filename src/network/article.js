import {request} from "@/network/request";

export function postArticle(title, content, tags, categoryID) {
    return request({
        url: '/article/add',
        data: {
            title,
            content,
            tags,
            categoryID
        },
        method: 'post'
    });
}

export function getArticleList(page, size) {
    return request({
        url: '/article/list',
        params: {
            page,
            size
        }
    });
}
