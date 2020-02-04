export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  // title: '杜亚机电',
  title: window.location.href.indexOf("/erp") > -1 ? "ERP" : "质量检测追溯系统",
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  // useI18n: true,
  useI18n: false,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    // dev: 'http://192.168.200.99',
    // dev: ' https://www.easy-mock.com/mock/5d5e559ed064102521b410b2',
    // pro: 'http://192.168.200.168:8001'
    dev: "",
    pro: ""
  },
  pdfUrl: {
    dev: "",
    pro: ""
  },
  mockUrl: {
    // dev: 'https://www.easy-mock.com/mock/5d5e559ed064102521b410b2',
    dev: "http://192.168.111.162:5000",
    pro: "https://www.easy-mock.com/mock/5d5e559ed064102521b410b2"
  },
  // 是否使用mock数据或接口（前后端联调时设置为false）
  isMock: true,
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: "home",
  /**
   * @description 需要加载的插件
   */
  plugin: {
    "error-store": {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
};
