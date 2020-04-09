import axios from "@/libs/api.request";

// 获取角色列表
export const getRolelist = () => {
  return axios.request({
    url: "/api/roleMenu/getRoleList",
    method: "get"
  });
};

// 查询角色的下级角色
export const getRoles = () => {
  return axios.request({
    url: "/api/roleMenu/getRoles",
    method: "get"
  });
};

// 新增角色
export const addRole = data => {
  return axios.request({
    url: "/api/roleMenu/addRole",
    data,
    method: "post"
  });
};

// 更新角色
export const updateRole = data => {
  return axios.request({
    url: "/api/roleMenu/updateRole",
    data,
    method: "put"
  });
};

// 删除角色
export const removeRole = roleId => {
  return axios.request({
    url: `/api/roleMenu/removeRole?roleId=${roleId}`,
    method: "delete"
  });
};

// 根据角色id获取关联的用户
export const getUsersByRole = roleId => {
  return axios.request({
    url: `/api/roleMenu/getUsersByRole?roleId=${roleId}`,
    method: "get"
  });
};

// 角色 - 用户关系维护
export const updateRoleUser = data => {
  return axios.request({
    url: "/api/roleMenu/updateRoleUser",
    data,
    method: "post"
  });
};

// 根据角色id获取关联的菜单
export const getMenusByRole = roleId => {
  return axios.request({
    url: `/api/roleMenu/getMenusByRole?roleId=${roleId}`,
    method: "get"
  });
};

// 角色 - 菜单关系维护
export const updateRoleMenu = data => {
  return axios.request({
    url: "/api/roleMenu/updateRoleMenu",
    data,
    method: "post"
  });
};
