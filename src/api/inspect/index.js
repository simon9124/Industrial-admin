// import axios from '@/libs/api.request.mock';
import axios from "@/libs/api.request";

// 测试员登录
export const loginLineUser = data => {
  return axios.request({
    url: "/api/line/loginLineUser",
    data,
    method: "post"
  });
};

// 获取测试人员信息
export const getLineUsers = () => {
  return axios.request({
    url: "/api/line/getLineUsers",
    method: "get"
  });
};
