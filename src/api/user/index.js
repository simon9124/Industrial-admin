import axios from "@/libs/api.request";
// import axios from '@/libs/api.request.mock';

export const getUserInfo = () => {
  return axios.request({
    url: "/api/user/getUserInfo",
    method: "get"
  });
};

export const getUserList = () => {
  return axios.request({
    // url: '/api/user/users',
    url: "/api/user/getAllUsers",
    method: "get"
  });
};

export const getUserData = id => {
  return axios.request({
    // url: `/api/user/get/${id}`,
    url: `/api/user/get?id=${id}`,
    method: "get"
  });
};

export const insertUser = data => {
  return axios.request({
    url: "/api/user/insert",
    data,
    method: "post"
  });
};

export const updateUser = data => {
  return axios.request({
    url: "/api/user/update",
    data,
    method: "put"
  });
};

export const deleteUser = id => {
  return axios.request({
    // url: `/api/user/delete/${id}`,
    url: `/api/user/delete?id=${id}`,
    method: "delete"
  });
};
