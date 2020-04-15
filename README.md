## Industrial-admin

**安装运行：**

- cd ~npm install
- 解决xlsx-style插件的bug.png：![Image text](https://github.com/simon9124/Industrial-admin/blob/master/src/assets/%E8%A7%A3%E5%86%B3xlsx-style%E7%9A%84bug.png)
- npm run dev

**平台介绍：**

- 基于 view-admin 和 工业互联网 4.0 的质量追溯平台
- 平台用途：智能检测生产产品，严格制定标准、极大提高效率
- 适用场所：工厂、车间等

**技术架构：**

- nodejs + vuejs + [iview-admin](https://github.com/iview/iview-admin) + [echarts](https://echarts.apache.org/zh/index.html)
- [js-xlsx](https://github.com/protobi/js-xlsx) - excel带样式的导入导出（合并单元格等）
- [JsBarcode](https://github.com/lindell/JsBarcode) - 生成在线条形码
- [Print.js](https://github.com/lindell/JsBarcode) - 页面打印插件
- [MQTT.js](https://github.com/mqttjs/MQTT.js) - js连接mqtt

**产品亮点：**
- 纯前端 or 前后端联调，所有页面双份功能一键切换：**src>config>index，isMock: true or false**
- 当前版本为纯前端，所用数据均为mockData，但与实际生产中的业务逻辑相符，完整版已部署在各大合作工厂
- 用户、角色、菜单...所有的数据都是“假”的，但又都是相互关联的，只要你不刷新页面，所有的操作都将保留（我是不是很辛苦呀哈哈..）

**账户密码：**

- cestc：工程师
- admin：管理员
- workshop_manager：车间主管
- proline_leader：产线线长
- test：检测员

*密码均为2019@cestc
