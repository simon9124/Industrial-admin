/**
 * ①添
 * @新增：定义初始化菜单
 */
import store from "@/store";
import { localSave, localRead } from "@/libs/util";
import { lazyLoadingCop } from "@/libs/tools";
import mockMenuData from "@/mock/data/menus-data";
import config from "@/config";
import Main from "@/components/main"; // Main 是架构组件，不在后台返回，在文件里单独引入
import parentView from "@/components/parent-view"; // parentView 是二级架构组件，不在后台返回，在文件里单独引入
import { getAllMenus } from "@/api/menu"; // api - 获取当前用户的全部菜单

// 初始化路由数据
export const initRouter = async () => {
  var gotRouter = []; // 获得的动态路由
  if (localRead("dynamicRouter") === "") {
    /* localStorage里dynamicRouter值为空 -> 没有路由数据 -> 获取路由数据 */
    console.log("获取路由：从api");
    if (!config.isMock) {
      // 接口数据
      getAllMenus().then(result => {
        var routerData = routerDataHanding(result.data.data);
        localSave("dynamicRouter", JSON.stringify(routerData)); // 存储routerData到localStorage
        gotRouter = filterAsyncRouter(routerData); // 过滤路由,路由组件转换
        store.dispatch("updateMenuList", gotRouter);
      });
    } else {
      // mock数据
      var routerData = JSON.parse(JSON.stringify(mockMenuData)); // 拿到路由模拟动态数据
      localSave("dynamicRouter", JSON.stringify(routerData)); // 存储routerData到localStorage
      gotRouter = filterAsyncRouter(routerData); // 过滤路由,路由组件转换
      store.dispatch("updateMenuList", gotRouter);
    }
  } else {
    /* 有路由数据 -> 直接从localStorage里面获取 */
    console.log("获取路由：从localStorage");
    gotRouter = dynamicRouterAdd("router-util.js");
    store.commit("setMenuList", {
      menuList: gotRouter,
      access: store.state.user.access
    });
  }
  return gotRouter;
};

// 加载路由菜单,从localStorage拿到路由,在创建路由时使用
export const dynamicRouterAdd = from => {
  let data = localRead("dynamicRouter");
  let dynamicRouter = data !== "" ? filterAsyncRouter(JSON.parse(data)) : [];
  console.log(`动态路由数据：${from}`, dynamicRouter);
  return dynamicRouter;
};

// @函数：遍历后台传来的路由数据，转为路由基础数据(与menus-data的数据格式相同)
export const routerDataHanding = apiRouterData => {
  const asyncRouterMap = [];

  // 外层节点
  apiRouterData.forEach(route => {
    if (route.parenetId === "root") {
      asyncRouterMap.push({
        path: route.url === "/" ? route.url : "/" + route.url,
        name: route.name,
        component: "Main",
        meta: {
          icon: route.ico,
          title: route.title,
          hideInBread: true,
          id: route.id // 根据id确定子组件
        },
        children: []
      });
    }
  });

  // 内层节点 - 递归
  const handleRecurrence = recurrenceData => {
    recurrenceData.forEach(data => {
      apiRouterData.forEach(route => {
        if (data.meta.id === route.parenetId) {
          data.children.push({
            path: route.url,
            name: route.name,
            meta: {
              icon: data.meta.icon,
              title: route.title
            },
            component: route.path,
            children: []
          });
        }
      });
      // console.log(data);
      handleRecurrence(data.children);
    });
  };
  handleRecurrence(asyncRouterMap);

  // 首页概览：追加 redirect 和 notCache
  asyncRouterMap.forEach(route => {
    if (route.path === "/") {
      route.redirect = route.children[0].path;
      route.meta.notCache = true;
      route.children[0].meta.notCache = true;
    }
  });

  return asyncRouterMap;
};

// @函数: 遍历路由基础数据，转换为前端组件对象
export const filterAsyncRouter = asyncRouterMap => {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === "Main") {
        route.component = Main; // Main组件特殊处理
      } else if (route.component === "parentView") {
        route.component = parentView; // parentView组件特殊处理
      } else {
        route.component = lazyLoadingCop(route.component);
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children); // 子组件递归
    }
    return true;
  });
  // console.log(accessedRouters);
  return accessedRouters;
};
