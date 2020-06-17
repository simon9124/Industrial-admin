// 全局
import router from "@/router";
// import routers from "@/router/routers";
import config from "@/config";
// api
import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  // getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead
} from "@/libs/util";
import { saveErrorLogger } from "@/api/data";
import { getAllMenus } from "@/api/menu"; // api - 获取当前用户的全部菜单
// function
import {
  dynamicRouterAdd, // 加载路由菜单,从localStorage拿到路由,在创建路由时使用
  routerDataHanding, // @函数：遍历后台传来的路由数据，转为路由基础数据(与menus-data的数据格式相同)
  filterAsyncRouter // @函数: 遍历路由基础数据，转换为前端组件对象
} from "@/libs/router-util"; // ①添 引入加载菜单(仅mock时用)
import { getValueByKey } from "@/libs/dataHanding"; // 根据对象数组某个key的value，查询另一个key的value
// mockData
import { menuList, roleList } from "@/view/3manage/mockData/role";

const { homeName, isMock } = config; // mockData - 全部菜单
const closePage = (state, route) => {
  // const nextRoute = getNextRoute(state.tagNavList, route);
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route);
  });
  router.push(state.tagNavList[state.tagNavList.length - 1]); // 改造：动态标签关闭
  // router.push(nextRoute);
};

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    local: localRead("local"),
    errorList: [],
    hasReadErrorPage: false,
    menuList: [] // 拿到的路由数据
  },
  getters: {
    menuList: (state, getters, rootState) =>
      // getMenuByRouter(routers, rootState.user.access), // 原始方法
      getMenuByRouter(dynamicRouterAdd("app.js"), rootState.user.access), // 根据路由加载菜单(仅mock时用)
    errorCount: state => state.errorList.length
  },
  mutations: {
    // 配置面包屑导航
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute);
    },
    // 配置主页route
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName);
    },
    // 配置标签导航
    setTagNavList(state, list) {
      let tagList = [];
      if (list) {
        tagList = [...list];
      } else {
        tagList = getTagNavListFromLocalstorage() || [];
      }
      // if (tagList[0] && tagList[0].name !== homeName) tagList.shift();  // 改造：动态标签关闭
      let homeTagIndex = tagList.findIndex(item => item.name === homeName);
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0];
        tagList.unshift(homeTag);
      }
      state.tagNavList = tagList;
      setTagNavListInLocalstorage([...tagList]);
    },
    // 关闭标签导航
    closeTag(state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route));
      route = tag[0] ? tag[0] : null;
      if (!route) return;
      closePage(state, route);
    },
    // 添加标签导航
    addTag(state, { route, type = "unshift" }) {
      let router = getRouteTitleHandled(route);
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === "push") {
          if (router.name === homeName) state.tagNavList.unshift(router);
          else state.tagNavList.push(router);
        } else {
          if (router.name === homeName) state.tagNavList.unshift(router);
          else state.tagNavList.splice(1, 0, router);
        }
        setTagNavListInLocalstorage([...state.tagNavList]);
      }
    },
    setLocal(state, lang) {
      localSave("local", lang);
      state.local = lang;
    },
    addError(state, error) {
      state.errorList.push(error);
    },
    setHasReadErrorLoggerStatus(state, status = true) {
      state.hasReadErrorPage = status;
    },
    // 根据路由和权限，生成左侧菜单
    setMenuList(state, data) {
      state.menuList = getMenuByRouter(data.menuList, data.access);
    }
  },
  actions: {
    addErrorLog({ commit, rootState }, info) {
      if (!window.location.href.includes("error_logger_page")) {
        commit("setHasReadErrorLoggerStatus", false);
      }
      const {
        user: { token, userId, userName }
      } = rootState;
      let data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName
      };
      saveErrorLogger(info).then(() => {
        commit("addError", data);
      });
    },
    // 动态路由数据 -> 首次登录挂载路由
    addRouterData({ commit, rootState }, routes) {
      console.log("动态添加路由：", routes);
      // 动态添加路由 - 真正添加路由（不会立刻刷新，需要手动往router.options.routes里添加数据）
      router.addRoutes(routes);
      // 手动添加路由数据
      routes.forEach(route => {
        if (!router.options.routes.some(_route => _route.path === route.path)) {
          router.options.routes.push(route);
        }
      });
      // 动态渲染菜单数据
      commit("setMenuList", {
        menuList: routes,
        access: rootState.user.access
      });
    },
    // 获取动态路由数据
    getRouters({ dispatch, commit, rootState }, routes) {
      return new Promise((resolve, reject) => {
        var gotRouter = []; // 设置动态路由
        if (localRead("dynamicRouter") === "") {
          /* localStorage里dynamicRouter值为空 -> 没有路由数据 -> 获取路由数据 */
          console.log("获取路由：从api");
          if (!isMock) {
            // 接口数据
            try {
              getAllMenus(rootState.user.token)
                .then(res => {
                  // console.log(res);
                  var routerData = routerDataHanding(res.data.data); // 拿到路由接口数据
                  localSave("dynamicRouter", JSON.stringify(routerData)); // 存储routerData到localStorage
                  gotRouter = filterAsyncRouter(routerData); // 过滤路由,路由组件转换
                  dispatch("addRouterData", gotRouter).then(res => {
                    resolve(routerData);
                  });
                })
                .catch(err => {
                  reject(err);
                });
            } catch (error) {
              reject(error);
            }
          } else {
            /* mock数据 */
            // 1.根据用户角色，处理该角色的路由数据
            var menus = [];
            rootState.user.access.forEach(_access => {
              // 把该用户所有的角色对应的菜单都加进来
              menus = menus.concat(
                getValueByKey(roleList, "id", _access.id, "menus")
              );
            });
            menus = [...new Set(menus)]; // 然后去重
            // console.log(menus); // 获取该用户所有角色的所有菜单数据
            // 2.拿到路由模拟动态数据，与该角色处理后的数据做比对筛选
            var routerData = menuList.filter(menu => {
              return menus.some(
                _menu => _menu.id === menu.id // 根据id全等筛选数据
              );
            });
            routerData = routerDataHanding(
              JSON.parse(JSON.stringify(routerData))
            );
            // console.log(routerData);
            // 3.处理后路由数据生成路由和菜单等
            localSave("dynamicRouter", JSON.stringify(routerData)); // 存储routerData到localStorage
            gotRouter = filterAsyncRouter(routerData); // 过滤路由,路由组件转换
            dispatch("addRouterData", gotRouter).then(res => {
              resolve(routerData);
            });
          }
        } else {
          /* 有路由数据 -> 直接从localStorage里面获取 */
          console.log("获取路由：从localStorage");
          gotRouter = dynamicRouterAdd("router-util.js");
          commit("setMenuList", {
            menuList: gotRouter,
            access: rootState.user.access
          });
          resolve(routerData);
        }
      });
    }
  }
};
