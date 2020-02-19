/**
 * ①添
 * @@新增 定义初始化菜单
 */
import store from "@/store";
import { localSave, localRead } from "@/libs/util";
import { lazyLoadingCop } from "@/libs/tools";
// import { getMockMenuData } from "@/api/data";
import mockMenuData from "@/mock/data/menus-data";
import Main from "@/components/main"; // Main 是架构组件，不在后台返回，在文件里单独引入
import parentView from "@/components/parent-view"; // parentView 是二级架构组件，不在后台返回，在文件里单独引入

var gotRouter;

// 初始化路由数据
export const initRouter = () => {
  let antRouter = localRead("dynamicRouter");
  if (!antRouter) {
    /* localStorage里dynamicRouter值为空 -> 没有路由数据 -> 获取路由数据 */
    var routerData = JSON.parse(JSON.stringify(mockMenuData)); // 拿到路由模拟动态数据
    localSave("dynamicRouter", JSON.stringify(routerData)); // 存储路由到localStorage
    gotRouter = filterAsyncRouter(routerData); // 过滤路由,路由组件转换
    store.commit("updateMenuList", gotRouter); // 执行vuex的updateMenuList方法
    dynamicRouterAdd(); // 加载路由菜单
  } else {
    /* 有路由数据 -> 直接从localStorage里面获取 */
    gotRouter = dynamicRouterAdd();
  }
  return gotRouter;
};

// 加载路由菜单,从localStorage拿到路由,在创建路由时使用
export const dynamicRouterAdd = () => {
  let dynamicRouter = [];
  let data = localRead("dynamicRouter");
  if (!data) {
    return dynamicRouter;
  }
  dynamicRouter = filterAsyncRouter(JSON.parse(data));
  return dynamicRouter;
};

// @函数: 遍历后台传来的路由字符串，转换为组件对象
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
  return accessedRouters;
};
