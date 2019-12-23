import axios from "@/libs/api.request";
// import axios from '@/libs/api.request.mock';

export const getUseGroupList = () => {
  return axios.request({
    url: "/api/userGroup/getUseGroupList",
    method: "get"
  });
};

export const getUserGroupData = id => {
  return axios.request({
    // url: `/api/usergroup/get/${id}`,
    url: `/api/usergroup/get?id=${id}`,
    method: "get"
  });
};

export const insertUseGroup = data => {
  return axios.request({
    url: "/api/userGroup/insert",
    data,
    method: "post"
  });
};

export const updateUseGroup = data => {
  return axios.request({
    url: "/api/userGroup/update",
    data,
    method: "put"
  });
};

export const deleteUseGroup = gid => {
  return axios.request({
    // url: `/api/userGroup/delete/${gid}`,
    url: `/api/usergroup/delete?id=${gid}`,
    method: "delete"
  });
};
