import {request} from "@/network/request";


let TagAPI = {
    addTag:function(name, type, sort) {
        return request({
            url: '/tag/add',
            data: {
                name,
                type,
                sort
            },
            method: 'post'
        });
    },

    getTagList:function(page, size) {
        return request({
            url: '/tag/list',
            params: {
                page,
                size,
            }
        });
    },

    removeTag: function(id) {
        return request({
            url: '/tag/remove',
            data: {
                id,
            },
            method: 'post'
        });
    }
};

export default TagAPI;
