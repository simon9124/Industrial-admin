// 设备列表
const equipmentList = {
  1: [
    {
      id: "c133258602a54d34acbef7957cfedffc",
      funcTypeId: 1,
      equipmentMark: null,
      equipmentName: "综合检测设备22",
      readFlag: 1,
      items: [
        {
          equipmentId: "c133258602a54d34acbef7957cfedffc",
          sopId: 7,
          sop: "SOP.1.1002",
          sopDescription:
            "顺一，顺二，顺三，顺四，逆一，逆二，逆三，逆四，后置工序",
          qc: 1
        },
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
        }
      ]
    },
    {
      id: "ae4b62fe83e84ef6b6e7f33544b5dbcd",
      funcTypeId: 1,
      equipmentMark: null,
      equipmentName: "综合检测设备",
      readFlag: 1,
      items: [
        {
          equipmentId: "ae4b62fe83e84ef6b6e7f33544b5dbcd",
          sopId: 1,
          sop: "SOP.1.1000",
          sopDescription: "前序 顺三 逆三 验证行程 后序",
          qc: 1
        },
        {
          equipmentId: "ae4b62fe83e84ef6b6e7f33544b5dbcd",
          sopId: 3,
          sop: "SOP.1.1001",
          sopDescription: "前序 顺三 逆三 验证行程",
          qc: 1
        }
      ]
    }
  ],
  2: [
    {
      id: "cbf2b0da-7e2b-4279-8880-e9238df3a881",
      funcTypeId: 2,
      equipmentMark: null,
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
      id: "6315d4988474427b86c68e19d5ffb09d",
      funcTypeId: 2,
      equipmentMark: null,
      equipmentName: "静音测试设备23",
      readFlag: 0,
      items: [
        {
          equipmentId: "6315d4988474427b86c68e19d5ffb09d",
          sopId: 5,
          sop: "SOP.2.1002",
          sopDescription: "低压 噪音 交耐 接地 后序",
          qc: 2
        }
      ]
    }
  ]
};

export { equipmentList };
