import {request} from "@/network/request";

let ArticleAPI = {
  postArticle: function (title, content, tags, categoryID, coverID) {
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

  updateArticle: function (id, title, content, tags, categoryID, coverID) {
    return request({
      url: '/article/update',
      data: {
        id,
        title,
        content,
        tags,
        categoryID,
        coverID
      },
      method: 'post'
    });
  },
  getArticleList: function (page, size) {
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
  },
  removeArticle: function (id) {
    return request({
      url: '/article/remove',
      data: {
        id,
      },
      method: 'post'
    });
  }
};

export default ArticleAPI;

