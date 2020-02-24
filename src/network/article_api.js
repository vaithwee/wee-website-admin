import {request} from "@/network/request";

let ArticleAPI = {
    postArticle: function(title, content, tags, categoryID) {
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
    },
    getArticleList: function(page, size) {
        return request({
            url: '/article/list',
            params: {
                page,
                size
            }
        });
    }
};

export default ArticleAPI;

