import Mock from 'mockjs';

const list = [];
const count = 5;

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    // 基本信息
    account: '@protocol',
    userName: '@cname',
    'userGroup|1': ['测试组', '开发组', '产品组'],
    'login|1': [0, 1],
    'lock|1': [0, 1],
    loginTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
  }));
}

export default list;
