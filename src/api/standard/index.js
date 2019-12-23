// import axios from '@/libs/api.request.mock';
import axios from "@/libs/api.request";

// 获取所有标准项
export const findByProductClass = data => {
  return axios.request({
    url: "/api/standardValues/findByProductClass",
    method: "post",
    data
  });
};

// 编辑标准项
export const editByProductClass = data => {
  return axios.request({
    url: "/api/standardValues/editByProductClass",
    method: "post",
    data
  });
};

// 使用标准项
export const activeByProductClass = data => {
  return axios.request({
    url: "/api/standardValues/activeByProductClass",
    method: "post",
    data
  });
};

// 1.获取标准标签列表
export const findSopTagsByQcIndex = qcIndex => {
  return axios.request({
    url: `/api/standardValues/findSopTagsByQcIndex?qcIndex=${qcIndex}`,
    method: "get"
  });
};

// 2.查询标准
export const findBySopTag = tagId => {
  return axios.request({
    url: `/api/standardValues/findBySopTag?tagId=${tagId}`,
    method: "get"
  });
};

// 3.新增标准
export const addStandardValues = data => {
  return axios.request({
    url: "/api/standardValues/add",
    method: "post",
    data
  });
};

// 4.更新标准
export const editStandardValues = data => {
  return axios.request({
    url: "/api/standardValues/edit",
    method: "post",
    data
  });
};

// 5.删除标准
export const removeTag = tagId => {
  return axios.request({
    url: `/api/standardValues/removeTag?tagId=${tagId}`,
    method: "get"
  });
};
