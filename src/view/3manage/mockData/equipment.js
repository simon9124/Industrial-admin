// 设备列表
const equipmentList = [
  {
    id: "6315d4988474427b86c68e19d5ffb09d",
    equipmentType: "2",
    equipmentName: "静音测试设备23",
    readFlag: 0,
    items: [
      {
        equipmentId: "6315d4988474427b86c68e19d5ffb09d",
        sopId: 2,
        sop: "SOP.2.1000",
        sopDescription: "前序 低压 噪音 交耐 接地 后序",
        qc: 2
      },
      {
        equipmentId: "6315d4988474427b86c68e19d5ffb09d",
        sopId: 5,
        sop: "SOP.2.1002",
        sopDescription: "低压 噪音 交耐 接地 后序",
        qc: 2
      },
      {
        equipmentId: "6315d4988474427b86c68e19d5ffb09d",
        sopId: 4,
        sop: "SOP.2.1001",
        sopDescription: "前序 低压 噪音 交耐 接地",
        qc: 2
      },
      {
        equipmentId: "6315d4988474427b86c68e19d5ffb09d",
        sopId: 7,
        sop: "SOP.1.1002",
        sopDescription:
          "顺一，顺二，顺三，顺四，逆一，逆二，逆三，逆四，后置工序",
        qc: 1
      },
      {
        equipmentId: "6315d4988474427b86c68e19d5ffb09d",
        sopId: 3,
        sop: "SOP.1.1001",
        sopDescription: "前序 顺三 逆三 验证行程",
        qc: 1
      },
      {
        equipmentId: "6315d4988474427b86c68e19d5ffb09d",
        sopId: 1,
        sop: "SOP.1.1000",
        sopDescription: "前序 顺三 逆三 验证行程 后序",
        qc: 1
      }
    ]
  },
  {
    id: "c133258602a54d34acbef7957cfedffc",
    equipmentType: "1",
    equipmentName: "综合检测设备22",
    readFlag: 1,
    items: [
      {
        equipmentId: "c133258602a54d34acbef7957cfedffc",
        sopId: 1,
        sop: "SOP.1.1000",
        sopDescription: "前序 顺三 逆三 验证行程 后序",
        qc: 1
      },
      {
        equipmentId: "c133258602a54d34acbef7957cfedffc",
        sopId: 3,
        sop: "SOP.1.1001",
        sopDescription: "前序 顺三 逆三 验证行程",
        qc: 1
      },
      {
        equipmentId: "c133258602a54d34acbef7957cfedffc",
        sopId: 7,
        sop: "SOP.1.1002",
        sopDescription:
          "顺一，顺二，顺三，顺四，逆一，逆二，逆三，逆四，后置工序",
        qc: 1
      }
    ]
  },
  {
    id: "cbf2b0da-7e2b-4279-8880-e9238df3a881",
    equipmentType: "0",
    equipmentName: "综合测试检测台23",
    readFlag: 0,
    items: [
      {
        equipmentId: "cbf2b0da-7e2b-4279-8880-e9238df3a881",
        sopId: 1,
        sop: "SOP.1.1000",
        sopDescription: "前序 顺三 逆三 验证行程 后序",
        qc: 1
      }
    ]
  },
  {
    id: "f03e7e3d-9125-405e-9e99-d176601b86cf",
    equipmentType: "0",
    equipmentName: "静音测试22",
    readFlag: 1,
    items: [
      {
        equipmentId: "f03e7e3d-9125-405e-9e99-d176601b86cf",
        sopId: 2,
        sop: "SOP.2.1000",
        sopDescription: "前序 低压 噪音 交耐 接地 后序",
        qc: 2
      },
      {
        equipmentId: "f03e7e3d-9125-405e-9e99-d176601b86cf",
        sopId: 1,
        sop: "SOP.1.1000",
        sopDescription: "前序 顺三 逆三 验证行程 后序",
        qc: 1
      }
    ]
  }
];

export { equipmentList };
