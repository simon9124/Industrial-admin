import Mock from 'mockjs';

const list = [];
const count = 100;

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    number: /^[0-9A-Z]{11}$/,
    lineNumber: /^[0-9]{2}$/,
    'testing|1': [0, 1],
    testBeginTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    testInspector: '@cname',
    'mute|1': [0, 1],
    muteBeginTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    muteInspector: '@cname',
    appearanceInspector: '@cname'
  }));
}

export default list;
