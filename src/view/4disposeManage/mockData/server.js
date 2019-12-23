import Mock from "mockjs";

const dataBase = ["MYSQLI", "MYSQL", "PDO"];

const server = {
  ip: Mock.mock("@ip"),
  port: "80",
  frontEnd: Mock.mock("@domain"),
  dataBase: dataBase[Math.round(Math.random() * (dataBase.length - 1))],
  cache: false,
  upload: false,
  internalStorage: parseInt(Math.random() * 1000),
  uploadSize: parseInt(Math.random() * 100),
  GDPic: "启用",
  Mysql: "启用",
  Mysqli: "启用",
  XML: "启用",
  iconv: "启用",
  json: "启用",
  Zip: "启用",
  CURL: "启用"
};

export default server;
