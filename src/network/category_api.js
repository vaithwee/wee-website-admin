import {request} from "@/network/request";

let CategoryAPI = {
    addCategory: function(name) {
        return request({
            url: '/category/add',
            data: {
                name,
            },
            method: 'post',
        });
    },

    getCategoryList: function(page, size) {
        return request({
            url: '/category/list',
            params: {
                page,
                size
            }
        });
    },

    removeCategoryById: function removeCategoryById(id) {
        return request({
            url: '/category/remove',
            data: {
                id
            },
            method: 'post'
        });
    }
};

export default CategoryAPI;
