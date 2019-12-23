// import axios from '@/libs/api.request.mock';
import axios from "@/libs/api.request";

// 不良品项列表
export const getUnqualifiedList = () => {
  return axios.request({
    url: "/api/unqualified/getall",
    method: "get"
  });
};

// 新增不良品项
export const insertUnqualified = data => {
  return axios.request({
    url: "/api/unqualified/add",
    method: "post",
    data
  });
};

// 更新不良品项
export const updateUnqualified = data => {
  return axios.request({
    url: "/api/unqualified/edit",
    method: "post",
    data
  });
};

// 删除不良品项
export const deleteUnqualified = id => {
  return axios.request({
    url: `/api/unqualified/remove?id=${id}`,
    method: "get"
  });
};
