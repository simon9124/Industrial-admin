import axios from "@/libs/api.request";

// 1.查询产线工位
export const getWorkStationsByLineNo = lineno => {
  return axios.request({
    url: `/api/line/getWorkStationsByLineNo?lineno=${lineno}`,
    method: "get"
  });
};

// 2.分页查询产线
export const findProLineByPage = (pageIndex, pageSize, workStationId) => {
  return axios.request({
    url: `/api/line/findWithPage?pageIndex=${pageIndex}&pageSize=${pageSize}&workStationId=${workStationId}`,
    method: "get"
  });
};

// 3.根据设备功能查询设备
export const findByFunctionType = functype => {
  return axios.request({
    url: `/api/equipment/findByFunctionType?functype=${functype}`,
    method: "get"
  });
};

// 4.新增产线
export const addLine = data => {
  return axios.request({
    url: "/api/line/add",
    method: "post",
    data
  });
};

// 5.更新产线
export const editLine = data => {
  return axios.request({
    url: "/api/line/edit",
    method: "post",
    data
  });
};

// 6.删除产线
export const removeLine = id => {
  return axios.request({
    url: `/api/line/remove?id=${id}`,
    method: "get"
  });
};
