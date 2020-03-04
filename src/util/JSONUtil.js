let JSONUtil = {
    sort: function (json) {
        let temp = {};
        let sort = Object.keys(json).sort();
        sort.map((item, index) => {
            temp[item] = json[sort[index]];
        });
        return temp;
    }
}

 export default JSONUtil;