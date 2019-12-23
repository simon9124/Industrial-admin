import axios from "@/libs/api.request";

// 1.分页查询sn码列表
export const findSnWithPage = (pageIndex, pageSize) => {
  return axios.request({
    url: `/api/testprocess/findSnWithPage?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: "get"
  });
};

// 2.新增sop组合
export const addSn = data => {
  return axios.request({
    url: "/api/testprocess/addSn",
    method: "post",
    data
  });
};

// 3.更新sop组合
export const editSn = data => {
  return axios.request({
    url: "/api/testprocess/editsn",
    method: "post",
    data
  });
};

// 4.删除sop组合
export const removeSn = sn => {
  return axios.request({
    url: `/api/testprocess/removeSn?sn=${sn}`,
    method: "get"
  });
};
