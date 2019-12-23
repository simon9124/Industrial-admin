import axios from "axios";
import { Message } from "iview";

// import store from "@/store";
import { getToken } from "./util";
// import { Spin } from 'iview'
// const addErrorLog = errorInfo => {
//   const {
//     statusText,
//     status,
//     request: {
//       responseURL
//     }
//   } = errorInfo;
//   let info = {
//     type: "ajax",
//     code: status,
//     mes: statusText,
//     url: responseURL
//   };
//   if (!responseURL.includes("save_error_logger")) store.dispatch("addErrorLog", info);
// };

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {}
    };
    return config;
  }
  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 如果响应含有token
        if (getToken()) {
          // 让每个请求携带token，将token放入请求头的Authorization
          config.headers.Authorization = "Bearer " + getToken();
        }

        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // 响应拦截
    instance.interceptors.response.use(
      res => {
        switch (res.status) {
          case 200:
            if (res.data.status !== true && res.data.status !== 200) {
              // 200 -> 服务器连接正确
              // 全局提示5秒的错误讯息
              Message.error({
                content: res.data.message,
                duration: 5
              });
            }
            break;
          case 500:
            console.log(res.status.message);

            // 500 -> 服务器错误
            Message.error({
              content: "服务器异常，请联系技术人员",
              duration: 5
            });
            break;
        }

        this.destroy(url);
        const { data, status } = res;
        return {
          data,
          status
        };
      },
      error => {
        if (error.toString().indexOf("500") > -1) {
          Message.error({
            content: "服务器异常，请联系技术人员",
            duration: 5
          });
        }

        // this.destroy(url);
        // let errorInfo = error.response;
        // if (!errorInfo) {
        //   const {
        //     request: {
        //       statusText,
        //       status
        //     },
        //     config
        //   } = JSON.parse(JSON.stringify(error));
        //   errorInfo = {
        //     statusText,
        //     status,
        //     request: {
        //       responseURL: config.url
        //     }
        //   };
        // }
        // addErrorLog(errorInfo);
        // console.log(error.error_description);

        return Promise.reject(error);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
