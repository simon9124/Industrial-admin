import axios from "@/libs/api.request";

// export const login = ({
//   userName,
//   password
// }) => {
//   // const data = {
//   //   username: userName,
//   //   password: password,
//   //   grant_type: 'password'
//   // };
//   const param = new URLSearchParams();
//   param.append('username', userName);
//   param.append('password', password);
//   // param.append('grant_type', 'password');
//   return axios.request({
//     url: '/api/token',
//     data: param,
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   });
// };

// 用户登录
export const login = data => {
  return axios.request({
    url: "/api/token",
    data,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    }
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return axios.request({
    url: "/api/user/getUserInfo",
    method: "get"
  });
};

// 修改用户密码
export const editUserPassword = data => {
  return axios.request({
    url: "/api/user/editUserPassword",
    data,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const logout = token => {
  return axios.request({
    url: "logout",
    method: "post"
  });
};

export const getUnreadCount = () => {
  return axios.request({
    url: "message/count",
    method: "get"
  });
};

export const getMessage = () => {
  return axios.request({
    url: "message/init",
    method: "get"
  });
};

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: "message/content",
    method: "get",
    params: {
      msg_id
    }
  });
};

export const hasRead = msg_id => {
  return axios.request({
    url: "message/has_read",
    method: "post",
    data: {
      msg_id
    }
  });
};

export const removeReaded = msg_id => {
  return axios.request({
    url: "message/remove_readed",
    method: "post",
    data: {
      msg_id
    }
  });
};

export const restoreTrash = msg_id => {
  return axios.request({
    url: "message/restore",
    method: "post",
    data: {
      msg_id
    }
  });
};
