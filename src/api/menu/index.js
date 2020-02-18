import axios from "@/libs/api.request";

// 获取全部菜单
export const getAllMenus = () => {
  return axios.request({
    url: "/api/roleMenu/getAllMenus",
    method: "get"
  });
};
