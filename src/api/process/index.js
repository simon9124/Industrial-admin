// import axios from '@/libs/api.request.mock';
import axios from "@/libs/api.request";

/* 任务管理 */

// 获取可使用的SOP级联选择
export const getSopTagFilteByEquipment = (
  qc1soptagId,
  qc2soptagId,
  qcIndex
) => {
  return axios.request({
    url: `/api/standardValues/getSopTagFilteByEquipment?qc1soptagId=${qc1soptagId}&qc2soptagId=${qc2soptagId}&qcIndex=${qcIndex}`,
    method: "get"
  });
};

// 获取检测步骤的Sop
export const getSopByQcIndex = qcIndex => {
  return axios.request({
    url: `/api/testprocess/getSopByQcIndex?qcIndex=${qcIndex}`,
    method: "get"
  });
};

// 派发任务 - 获取产品工序对应的SN编码
export const setProductLineSnBySop = data => {
  return axios.request({
    url: "/api/testprocess/setProductLineSnBySop",
    method: "post",
    data
  });
};

// 获取当前任务
export const getLineSn = () => {
  return axios.request({
    url: "/api/testprocess/getLineSn",
    method: "get"
  });
};

// 删除任务
export const removeTask = id => {
  return axios.request({
    url: `/api/testprocess/removeTask?id=${id}`,
    method: "get"
  });
};

// 获取顶部标签列表（除产线管理）
export const getAllEquipmentFunctype = () => {
  return axios.request({
    url: "/api/equipment/getAllEquipmentFunctype",
    method: "get"
  });
};

// 历史任务列表
export const findTaskByPage = (pageIndex, pageSize, lineno) => {
  return axios.request({
    url: `/api/testprocess/findTaskByPage?pageIndex=${pageIndex}&pageSize=${pageSize}&lineno=${lineno}`,
    method: "get"
  });
};

/* SOP管理 */

// 分页获取SOP列表
export const findSopByPage = (pageIndex, pageSize, qc) => {
  return axios.request({
    url: `/api/testprocess/findSopByPage?pageIndex=${pageIndex}&pageSize=${pageSize}&qc=${qc}`,
    method: "get"
  });
};

// 新增SOP
export const addSop = data => {
  return axios.request({
    url: "/api/testprocess/addSop",
    method: "post",
    data
  });
};

// 更新SOP
export const editSop = data => {
  return axios.request({
    url: "/api/testprocess/editSop",
    method: "post",
    data
  });
};

// 删除SOP
export const removeSop = sopId => {
  return axios.request({
    url: `/api/testprocess/removeSop?sopId=${sopId}`,
    method: "get"
  });
};

/* 工序参数 */

// 查询工序参数列表
export const findAllItemParam = qcIndex => {
  return axios.request({
    url: `/api/testprocess/findAllItemParam?qcIndex=${qcIndex}`,
    method: "get"
  });
};

// 修改工序参数
export const editItemParam = data => {
  return axios.request({
    url: "/api/testprocess/editItemParam",
    method: "post",
    data
  });
};

/* 过程数据管理 */

// 1.查询sop列表
export const findSopByKey = funcTypeId => {
  return axios.request({
    url: `/api/testprocess/findSopByKey?funcTypeId=${funcTypeId}`,
    method: "get"
  });
};

// 2.查询工序详情
export const findSopItemBySop = sopid => {
  return axios.request({
    url: `/api/testprocess/findSopItemBySop?sopid=${sopid}`,
    method: "get"
  });
};

// 3.依据工序获取参数地址列表
export const getItemParamAddByItemId = itemId => {
  return axios.request({
    url: `/api/testprocess/GetItemParamAddByItemId?itemId=${itemId}`,
    method: "get"
  });
};

// 4.Edit工序结果值地址
export const editSopItemPlcAdd = data => {
  return axios.request({
    url: "/api/testprocess/EditSopItemPlcAdd",
    method: "post",
    data
  });
};

// 5.add参数地址
export const addItemParamPlcAdd = data => {
  return axios.request({
    url: "/api/testprocess/AddItemParamPlcAdd",
    method: "post",
    data
  });
};

// 6.edit参数地址
export const editSopItemParamAdd = data => {
  return axios.request({
    url: "/api/testprocess/EditSopItemParamAdd",
    method: "post",
    data
  });
};

// 7.Remove参数地址
export const removeSopItemParamAdd = id => {
  return axios.request({
    url: `/api/testprocess/RemoveSopItemParamAdd?id=${id}`,
    method: "get"
  });
};
