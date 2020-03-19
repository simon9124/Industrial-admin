import axios from "@/libs/api.request";

// 获取模板列表
export const getReportList = () => {
  return axios.request({
    url: "/api/customeReport/getReportList",
    method: "get"
  });
};

// 根据id获取模板基础信息
export const getReortBaseInfo = id => {
  return axios.request({
    url: `/api/customeReport/getReortBaseInfo?id=${id}`,
    method: "get"
  });
};

// 新增模板 & 更新模板
export const addOrEditReportBaseInfo = data => {
  return axios.request({
    url: "/api/customeReport/addOrEditReportBaseInfo",
    method: "post",
    data
  });
};

// 删除模板
export const removeReport = id => {
  return axios.request({
    url: `/api/customeReport/remove?id=${id}`,
    method: "get"
  });
};

// 根据id获取参数信息
export const getReortConditionInfo = id => {
  return axios.request({
    url: `/api/customeReport/getReortConditionInfo?id=${id}`,
    method: "get"
  });
};

// 更新参数信息
export const addOrEditReportConditionInfo = data => {
  return axios.request({
    url: "/api/customeReport/addOrEditReportConditionInfo",
    method: "post",
    data
  });
};

// 根据id获取表头信息
export const getReortHeaderInfo = id => {
  return axios.request({
    url: `/api/customeReport/getReortHeaderInfo?id=${id}`,
    method: "get"
  });
};

// 更新表头信息
export const addOrEditReporSorceInfo = data => {
  return axios.request({
    url: "/api/customeReport/addOrEditReporSorceInfo",
    method: "post",
    data
  });
};

// 获取报表数据
export const getReportData = data => {
  return axios.request({
    url: "/api/customeReport/getReportData",
    method: "post",
    data
  });
};
