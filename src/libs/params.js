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

export function clearParam(key) {
  localStorage.removeItem(key);
}
