import Mock from "mockjs";

const list = [];
const count = 25;

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    // 基本信息
    identification: /^[1-9]{1}[0-9]{4}$/,
    synchroTime: "@datetime(\"yyyy-MM-dd HH:mm:ss\")",
    number: /^[0-9A-Z]{11}$/,
    "isUsed|1": [0],
    isCreateCode: false
  }));
}

export default list;
