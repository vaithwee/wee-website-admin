import DateUtil from "./date_util";
import JSONUtil from "./json_util";
const utility = {
  install: function (vue) {
    vue.prototype.$utility = {
      date: DateUtil,
      json: JSONUtil,
    }
  }
}

export default utility;