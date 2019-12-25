import axios from "@/libs/api.request";

// 1.分页查询设备信息
export const findEquipmentByPage = (pageIndex, pageSize, qc) => {
  return axios.request({
    url: `/api/equipment/findWithPage?pageIndex=${pageIndex}&pageSize=${pageSize}&qc=${qc}`,
    method: "get"
  });
};

// 2.查询sop-支持参数工序或Sop名
export const findSopByKey = funcTypeId => {
  return axios.request({
    url: `/api/testprocess/findSopByKey?funcTypeId=${funcTypeId}`,
    method: "get"
  });
};

// 3.新增设备
export const addEquipment = data => {
  return axios.request({
    url: "/api/equipment/add",
    method: "post",
    data
  });
};

// 4.更新设备
export const editEquipment = data => {
  return axios.request({
    url: "/api/equipment/edit",
    method: "post",
    data
  });
};

// 5.删除设备
export const removeEquipment = id => {
  return axios.request({
    url: `/api/equipment/remove?id=${id}`,
    method: "get"
  });
};
