// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import i18n from "@/locale";
import config from "@/config";
import importDirective from "@/directive";
import { directive as clickOutside } from "v-click-outside-x";
import installPlugin from "@/plugin";
import "./index.less";
import "@/assets/icons/iconfont.css";
import TreeTable from "tree-table-vue";
import VOrgTree from "v-org-tree";
import "v-org-tree/dist/v-org-tree.css";

// element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// v-chart
import VCharts from "v-charts";

// iview
import iView from "iview";

// isMock时，引入一些mockjs接口
if (config.isMock) require("@/mock");

Vue.use(ElementUI);
Vue.use(VCharts);
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
});

// iview4.0
// import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
// Vue.use(ViewUI, {
//   i18n: (key, value) => i18n.t(key, value)
// })

Vue.use(TreeTable);
Vue.use(VOrgTree);
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue);
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
Vue.prototype.isMock = config.isMock;
/**
 * 注册指令
 */
importDirective(Vue);
Vue.directive("clickOutside", clickOutside); // ①新增  引入动态菜单渲染

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  i18n,
  store,
  render: h => h(App)
});
