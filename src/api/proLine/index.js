import axios from "@/libs/api.request";

// 1.分页查询产线
export const findProLineByPage = (pageIndex, pageSize, qc) => {
  return axios.request({
    url: `/api/line/findWithPage?pageIndex=${pageIndex}&pageSize=${pageSize}&qc=${qc}`,
    method: "get"
  });
};

// 2.查询sop-支持参数工序或Sop名
export const findAllEquipment = qcIndex => {
  return axios.request({
    url: `/api/equipment/findall?qcIndex=${qcIndex}`,
    method: "get"
  });
};

// 3.新增产线
export const addLine = data => {
  return axios.request({
    url: "/api/line/add",
    method: "post",
    data
  });
};

// 4.更新产线
export const editLine = data => {
  return axios.request({
    url: "/api/line/edit",
    method: "post",
    data
  });
};

// 5.删除产线
export const removeLine = id => {
  return axios.request({
    url: `/api/line/remove?id=${id}`,
    method: "get"
  });
};
