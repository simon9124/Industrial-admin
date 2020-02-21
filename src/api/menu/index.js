import axios from "@/libs/api.request";

// 获取全部菜单
export const getAllMenus = () => {
  return axios.request({
    url: "/api/roleMenu/getAllMenus",
    method: "get"
  });
};

// 新增菜单
export const addMenu = data => {
  return axios.request({
    url: "/api/roleMenu/addMenu",
    method: "post",
    data
  });
};

// 更新菜单
export const updateMenu = data => {
  return axios.request({
    url: "/api/roleMenu/updateMenu",
    method: "post",
    data
  });
};

// 删除菜单
export const removeMenu = id => {
  return axios.request({
    url: `/api/roleMenu/RemoveMenu?menuId=${id}`,
    method: "get"
  });
};
