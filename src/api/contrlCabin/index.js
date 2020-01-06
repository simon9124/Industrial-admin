import axios from "@/libs/api.request";

// 首页概览 - 根据异常原因分组统计当日各个工序的异常报表
export const unqualifiedReasonWithProductClass = () => {
  return axios.request({
    url: "/api/report/unqualifiedReasonWithProductClass",
    method: "get"
  });
};

// 获取电机检测列表
export const findTotalByDate = (StartTime, EndTime, groupType) => {
  return axios.request({
    url: `/api/qcResult/findTotalByDate?StartTime=${StartTime}&EndTime=${EndTime}&groupType=${groupType}`,
    method: "get"
  });
};

// 获取电机检测列表（补齐日期）
export const findTotalWithCurrentMonthByDate = (
  StartTime,
  EndTime,
  groupType
) => {
  return axios.request({
    url: `/api/qcResult/findTotalWithCurrentMonthByDate?StartTime=${StartTime}&EndTime=${EndTime}&groupType=${groupType}`,
    method: "get"
  });
};

// 获取每条产线的生产型号
export const findActiveProductCalss = () => {
  return axios.request({
    url: "/api/standardValues/findActiveProductCalss",
    method: "get"
  });
};

// 按时间节点和产线分组，获取生产总量和合格率
export const getDateTotalByLineNo = (StartTime, EndTime) => {
  return axios.request({
    url: `/api/qcResult/getDateTotalByLineNo?StartTime=${StartTime}&EndTime=${EndTime}`,
    method: "get"
  });
};

// 每条产线的合格率
export const getDateQualifiedRateByLineNo = (StartTime, EndTime) => {
  return axios.request({
    url: `/api/qcResult/getDateQualifiedRateByLineNo?StartTime=${StartTime}&EndTime=${EndTime}`,
    method: "get"
  });
};

// 检测步骤分布分析不合格原因
export const getDateTotalByQc = startTime => {
  return axios.request({
    url: `/api/qcResult/getDateTotalByQc?startTime=${startTime}`,
    method: "get"
  });
};

// 获取当前产线报表
export const getCurrentLineReport = groupType => {
  return axios.request({
    url: `/api/qcResult/getCurrentLineReport?groupType=${groupType}`,
    method: "get"
  });
};
