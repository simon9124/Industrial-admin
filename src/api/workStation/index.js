import axios from "@/libs/api.request";

// 1.查询产线工位
export const getWorkStationsByLineNo = lineno => {
  return axios.request({
    url: `/api/line/getWorkStationsByLineNo?lineno=${lineno}`,
    method: "get"
  });
};

// 2.新增产线工位
export const addLineWorkStation = data => {
  return axios.request({
    url: "/api/line/addLineWorkStation",
    method: "post",
    data
  });
};

// 3.更新产线工位
export const updateLineWorkStation = data => {
  return axios.request({
    url: "/api/line/updateLineWorkStation",
    method: "post",
    data
  });
};

// 4.删除产线工位
export const removeLineWorkStation = id => {
  return axios.request({
    url: `/api/line/removeLineWorkStation?id=${id}`,
    method: "get"
  });
};
