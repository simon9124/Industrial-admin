// import axios from '@/libs/api.request.mock';
import axios from "@/libs/api.request";
import {
  objectMerge
} from "@/libs/util";

// 获取编号列表
export const getNumberList = () => {
  return axios.request({
    url: "/api/BarCode/GetAllBarCode",
    method: "get"
  });
};

// 获取编号列表（后台分页）
export const getNumberListByPage = (object) => {
  const params = objectMerge({
    pageSize: object.pageSize,
    pageIndex: object.pageNum,
    isUsed: object.isUsed,
    startTime: object.startTime,
    endTime: object.endTime
  }, {}
    // object.filterFormData
  );
  return axios.request({
    url: "/api/BarCode/GetBarCodeByPage",
    method: "get",
    params: params
  });
};

// 批量生成条形码
export const createCodes = (data) => {
  return axios.request({
    url: "/api/BarCode/BuildBarCode",
    method: "post",
    data,
    header: {
      "Content-Type": "application/json"
    }
  });
};

// 批量打印
export const printBarCodes = (data) => {
  return axios.request({
    url: "/api/BarCode/PrintBarCode",
    method: "post",
    data,
    header: {
      "Content-Type": "application/json"
    }
  });
};
