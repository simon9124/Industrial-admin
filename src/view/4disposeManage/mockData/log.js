import Mock from "mockjs";

const list = [];
const count = 45;

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    URL: "@url",
    "classification|1": ["login"],
    "message|1": ["Manager ID 1：登录成功！"],
    "user|1": ["超级用户", "检测员"],
    logIP: "@ip",
    logTime: "@datetime(\"2019-MM-dd HH:mm:ss\")"
  }));
}

export default list;
