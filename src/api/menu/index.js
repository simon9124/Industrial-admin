import axios from "@/libs/api.request";

// 获取全部菜单
export const getAllMenus = () => {
  return axios.request({
    url: "/api/roleMenu/getAllMenus",
    method: "get"
  });
};

export const getMockMenuData = () => {
  return axios.request({
    url: "get_mock_menu_data",
    method: "post"
  });
};
