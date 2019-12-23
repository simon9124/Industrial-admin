// import axios from '@/libs/api.request.mock';
import axios from "@/libs/api.request";
import {
  objectMerge
} from "@/libs/util";

// 获取电机检测列表
export const getCheckList = () => {
  return axios.request({
    url: "/api/product/getQcRecord",
    method: "get"
  });
};

// 获取电机检测列表（后端分页）
export const getCheckListByPage = (pageIndex, pageSize) => {
  return axios.request({
    url: `/api/qcResult/finByPage?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: "get"
  });
};

// 根据id获取检测详情
export const getCheckProduct = (id) => {
  return axios.request({
    url: `/api/product/get?id=${id}`,
    method: "get"
  });
};

// 更新外观检测
export const updateQc3 = (data) => {
  return axios.request({
    url: "/api/product/updateQc3",
    method: "put",
    data
  });
};

// 根据条件获取不合格产品列表
export const findUnqualified = (lineNo, qcIndex) => {
  return axios.request({
    url: `/api/QcResult/FindUnqualifiedProductByQcIndex?lineNo=${lineNo}&qcIndex=${qcIndex}`,
    method: "get"
  });
};

// 根据条件获取不合格产品列表 - 后端分页
export const findUnqualifiedWithPage = (object) => {
  const params = objectMerge({
    pageSize: object.pageSize,
    pageIndex: object.pageNum,
    lineNo: object.lineNo,
    isResolved: object.isResolved,
    qcIndex: object.tabSelected
  }, {}
    // object.filterFormData
  );
  return axios.request({
    url: "/api/QcResult/FindUnqualifiedProductByQcIndexWithPage",
    method: "get",
    params: params
  });
};

// 根据条件获取错误原因下拉列表
export const getDropDownList = (qcIndex) => {
  return axios.request({
    url: `/api/Unqualified/GetDropDownList?qcIndex=${qcIndex}`,
    method: "get"
  });
};

// 编辑错误原因
export const updateCheckReason = (data) => {
  return axios.request({
    url: "/api/qcResult/setUnqualifiedProductReason",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

// 根据条研码查询检测结果（外层collapse）
export const findByBarcode = (barcode) => {
  return axios.request({
    url: `/api/qcResult/findByBarcode?barcode=${barcode}`,
    method: "get"
  });
};

// 根据条研码和步骤查询检测结果（内层collapse）
export const findQcResultByBarcode = (barcode, qcindex) => {
  return axios.request({
    url: `/api/qcResult/findQcResultByBarcode?barcode=${barcode}&qcindex=${qcindex}`,
    method: "get"
  });
};
