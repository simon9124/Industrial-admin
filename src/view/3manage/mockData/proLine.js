// 顶部tab列表
const tabList = [
  {
    workStationName: "QC1",
    lineNo: 22,
    sort: 1,
    funcTypeId: 1,
    id: "99BA5433-DF5F-A898-C8E0-78B8BA55F251"
  },
  {
    workStationName: "QC2fun",
    lineNo: 22,
    sort: 2,
    funcTypeId: 2,
    id: "3DB6B2A9-D4E5-B9D4-363F-0E83736C93C8"
  }
];

// 设备列表
const proLineList = {
  1: [
    {
      id: "05adaf9a-944a-4d44-ad82-763e9f6ab3d3",
      equipmentName: "综合检测设备22",
      equipmentId: "c133258602a54d34acbef7957cfedffc",
      lineNo: 22,
      qcIndex: 1,
      ip: "192.168.200.165",
      rack: 0,
      slot: 1,
      snAddr: "DB41.DBX0",
      startTimeAddr: "DB41.DBX44",
      finalTimeAddr: "DB41.DBX66",
      result0Addr: "DB41.DBW92",
      qcIdAddr: "DB41.DBW90",
      tagCodeAddr: "DB51.DBW10",
      statusAddr: "DB41.DBW88"
    },
    {
      id: "5d8595f3250e41b9b9bcca2ee89a2906",
      equipmentName: "综合测试检测台23",
      equipmentId: "cbf2b0da-7e2b-4279-8880-e9238df3a881",
      lineNo: 23,
      qcIndex: 1,
      ip: "192.168.200.165",
      rack: 0,
      slot: 1,
      snAddr: "DB1313",
      startTimeAddr: "DB1313",
      finalTimeAddr: "DB1313",
      result0Addr: "DB1313",
      qcIdAddr: "DB1313",
      tagCodeAddr: "DB1313",
      statusAddr: "DB1313"
    },
    {
      id: "68394fd7a1fc44cfa824c2d2866e30e1",
      equipmentName: "综合检测设备22",
      equipmentId: "c133258602a54d34acbef7957cfedffc",
      lineNo: 24,
      qcIndex: 1,
      ip: "192.168.200.165",
      rack: 0,
      slot: 1,
      snAddr: "DB42.DBX0",
      startTimeAddr: "DB42.DBX44",
      finalTimeAddr: "DB42.DBX66",
      result0Addr: "DB42.DBW92",
      qcIdAddr: "DB41.DBW90",
      tagCodeAddr: "DB51.DBW10",
      statusAddr: "DB42.DBW88"
    }
  ],
  2: [
    {
      id: "6ce6b859-b633-4aab-845f-167e09f14ede",
      equipmentName: "静音测试22",
      equipmentId: "f03e7e3d-9125-405e-9e99-d176601b86cf",
      lineNo: 22,
      qcIndex: 2,
      ip: "192.168.200.163",
      rack: 0,
      slot: 1,
      snAddr: "DB42.DBX0",
      startTimeAddr: "DB42.DBX44",
      finalTimeAddr: "DB42.DBX66",
      result0Addr: "DB42.DBW92",
      qcIdAddr: "DB42.DBW90",
      tagCodeAddr: "DB52.DBW10",
      statusAddr: "DB42.DBW88"
    },
    {
      id: "8b4bd83287844b2e808d240271231768",
      equipmentName: "静音测试设备23",
      equipmentId: "6315d4988474427b86c68e19d5ffb09d",
      lineNo: 23,
      qcIndex: 2,
      ip: "192.168.200.163",
      rack: 0,
      slot: 1,
      snAddr: "DB42.DBX0",
      startTimeAddr: "DB42.DBX44",
      finalTimeAddr: "DB42.DBX66",
      result0Addr: "DB42.DBW92",
      qcIdAddr: "DB42.DBW90",
      tagCodeAddr: "DB52.DBW10",
      statusAddr: "DB42.DBW88"
    }
  ]
};

export { tabList, proLineList };
