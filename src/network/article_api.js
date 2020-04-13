import {request} from "@/network/request";

let ArticleAPI = {
    postArticle: function(title, content, tags, categoryID, coverID) {
        return request({
            url: '/article/add',
            data: {
                title,
                content,
                tags,
                categoryID,
                coverID
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
    },
  getArticleDetail: function (id) {
    return request({
      url: '/article/detail/' + id,
    });
  }
};

export default ArticleAPI;

