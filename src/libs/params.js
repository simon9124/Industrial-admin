/**
 * 路由跳转时，将router的params存储到localStorage，再从localStorage中获取数据
 * @param {String} key 要存储在localStorage的字段
 */
export function params(_this, key) {
  if (_this.$route.params[key]) {
    localStorage.setItem(key, _this.$route.params[key]);
    const pageParam = _this.$route.params[key];
    return pageParam;
  } else {
    const pageParam = localStorage.getItem(key);
    return pageParam;
  }
}

/**
 * 删除localStorage里的数据
 * @param {String} key 要删除的字段
 */
export function clearParam(key) {
  localStorage.removeItem(key);
}
