import Mock from 'mockjs';

const list = [];
const count = 100;

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    // 基本信息
    number: /^[0-9A-Z]{11}$/,
    lineNumber: /^[0-9]{2}[#]$/,
    // 综合测试
    // 'testing|1': [0, 1],
    testBeginTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    testCompleteTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    testInspector: '@cname',
    'veer1|1': [1],
    'veer1Slip|1': [1],
    veer1cm: /^[1-9][0-9][.][1-9][1-9][c][m]$/,
    'veer2|1': [1],
    'veer2Slip|1': [1],
    veer2cm: /^[1-9][0-9][.][1-9][1-9][c][m]$/,
    'veer3|1': [0, 1],
    'veer3Slip|1': [0, 1],
    veer3cm: /^[1-9][0-9][.][1-9][1-9][c][m]$/,
    'turn1|1': [1],
    'turn1Slip|1': [1],
    turn1cm: /^[1-9][0-9][.][1-9][1-9][c][m]$/,
    'turn2|1': [1],
    'turn2Slip|1': [1],
    turn2cm: /^[1-9][0-9][.][1-9][1-9][c][m]$/,
    'turn3|1': [1],
    'turn3Slip|1': [1],
    turn3cm: /^[1-9][0-9][.][1-9][1-9][c][m]$/,
    current: /^[0-9][.][1-9][0-9][A]$/,
    voltage: /^[1-2][0-9]{2}[.][0-9][1-9][V]$/,
    power: /^[1-2][0-9]{2}[.][0-9][1-9][W]$/,
    // 静音测试
    // 'mute|1': [0, 1],
    muteBeginTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    muteCompleteTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    muteInspector: '@cname',
    'lowPressure|1': [1],
    'decibel|1': [1],
    'landing|1': [1],
    'pressurization|1': [1],
    // 外观测试
    'appearance|1': [1],
    appearanceTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    appearanceInspector: '@cname'
  }));
}

export default list;
