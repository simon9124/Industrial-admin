// 工序列表
const processList = {
  1: [
    {
      id: "1",
      description: "前置工序",
      params: [],
      plcResultAdd: "DB42.DBW120",
      describeParams: []
    },
    {
      id: "2",
      description: "顺转一",
      params: [
        {
          description: "行程(CM)",
          id: "1",
          code: "1"
        },
        {
          description: "转速(RPM)",
          id: "2",
          code: "2"
        },
        {
          description: "电压(V)",
          id: "3",
          code: "3"
        },
        {
          description: "电流(A)",
          id: "4",
          code: "4"
        },
        {
          description: "功率(W)",
          id: "5",
          code: "5"
        }
      ],
      plcResultAdd: "DB42.DBW121",
      describeParams: [
        {
          paramDescription: "行程(CM)",
          plcType: 1,
          plCAdd: "DB42.DBW111",
          isEdit: false,
          id: "1-1"
        },
        {
          paramDescription: "行程(CM)",
          plcType: 2,
          plCAdd: "DB42.DBW113",
          isEdit: false,
          id: "1-2"
        },
        {
          paramDescription: "转速(RPM)",
          plcType: 2,
          plCAdd: "DB42.DBW130",
          isEdit: false,
          id: "2-2"
        },
        {
          paramDescription: "电压(V)",
          plcType: 1,
          plCAdd: "DB42.DBW135",
          isEdit: false,
          id: "3-1"
        },
        {
          paramDescription: "电流(A)",
          plcType: 3,
          plCAdd: "DB42.DBW235",
          isEdit: false,
          id: "4-3"
        },
        {
          paramDescription: "功率(W)",
          plcType: 3,
          plCAdd: "DB42.DBW220",
          isEdit: false,
          id: "5-3"
        }
      ]
    },
    {
      id: "3",
      description: "顺转二",
      params: [
        {
          description: "行程(CM)",
          id: "1",
          code: "1"
        },
        {
          description: "转速(RPM)",
          id: "2",
          code: "2"
        },
        {
          description: "电压(V)",
          id: "3",
          code: "3"
        },
        {
          description: "电流(A)",
          id: "4",
          code: "4"
        },
        {
          description: "功率(W)",
          id: "5",
          code: "5"
        }
      ],
      plcResultAdd: "",
      describeParams: [
        {
          paramDescription: "行程(CM)",
          plcType: 3,
          plCAdd: "DB42.DBW120",
          isEdit: false,
          id: "1-3"
        },
        {
          paramDescription: "转速(RPM)",
          plcType: 2,
          plCAdd: "DB42.DBW130",
          isEdit: false,
          id: "2-2"
        },
        {
          paramDescription: "电压(V)",
          plcType: 1,
          plCAdd: "DB42.DBW135",
          isEdit: false,
          id: "3-1"
        },
        {
          paramDescription: "电流(A)",
          plcType: 2,
          plCAdd: "DB42.DBW137",
          isEdit: false,
          id: "4-2"
        },
        {
          paramDescription: "功率(W)",
          plcType: 2,
          plCAdd: "DB42.DBW138",
          isEdit: false,
          id: "5-2"
        }
      ]
    },
    {
      id: "4",
      description: "顺转三",
      params: [
        {
          description: "行程(CM)",
          id: "1",
          code: "1"
        },
        {
          description: "转速(RPM)",
          id: "2",
          code: "2"
        },
        {
          description: "电压(V)",
          id: "3",
          code: "3"
        },
        {
          description: "电流(A)",
          id: "4",
          code: "4"
        }
      ],
      plcResultAdd: "DB42.DBW123",
      describeParams: [
        {
          paramDescription: "行程(CM)",
          plcType: 2,
          plCAdd: "DB42.DBW99",
          isEdit: false,
          id: "1-2"
        },
        {
          paramDescription: "转速(RPM)",
          plcType: 2,
          plCAdd: "DB42.DBW130",
          isEdit: false,
          id: "2-2"
        },
        {
          paramDescription: "电压(V)",
          plcType: 1,
          plCAdd: "DB42.DBW135",
          isEdit: false,
          id: "3-1"
        },
        {
          paramDescription: "电流(A)",
          plcType: 1,
          plCAdd: "DB42.DBW132",
          isEdit: false,
          id: "4-1"
        }
      ]
    },
    {
      id: "5",
      description: "逆转一",
      params: [
        {
          description: "转速(RPM)",
          id: "2",
          code: "2"
        },
        {
          description: "电压(V)",
          id: "3",
          code: "3"
        }
      ],
      plcResultAdd: "DB42.DBW124",
      describeParams: [
        {
          paramDescription: "转速(RPM)",
          plcType: 2,
          plCAdd: "DB42.DBW142",
          isEdit: false,
          id: "2-2"
        },
        {
          paramDescription: "电压(V)",
          plcType: 2,
          plCAdd: "DB42.DBW147",
          isEdit: false,
          id: "3-2"
        }
      ]
    },
    {
      id: "6",
      description: "逆转二",
      params: [],
      plcResultAdd: "DB42.DBW125",
      describeParams: []
    },
    {
      id: "7",
      description: "逆转三",
      params: [
        {
          description: "行程(CM)",
          id: "1",
          code: "1"
        },
        {
          description: "转速(RPM)",
          id: "2",
          code: "2"
        },
        {
          description: "电压(V)",
          id: "3",
          code: "3"
        },
        {
          description: "电流(A)",
          id: "4",
          code: "4"
        }
      ],
      plcResultAdd: "DB42.DBW126",
      describeParams: [
        {
          paramDescription: "行程(CM)",
          plcType: 3,
          plCAdd: "DB42.DBW117",
          isEdit: false,
          id: "1-3"
        },
        {
          paramDescription: "转速(RPM)",
          plcType: 2,
          plCAdd: "DB42.DBW142",
          isEdit: false,
          id: "2-2"
        },
        {
          paramDescription: "电压(V)",
          plcType: 2,
          plCAdd: "DB42.DBW145",
          isEdit: false,
          id: "3-2"
        },
        {
          paramDescription: "电流(A)",
          plcType: 1,
          plCAdd: "DB42.DBW133",
          isEdit: false,
          id: "4-1"
        }
      ]
    },
    {
      id: "8",
      description: "后续工序",
      params: [],
      plcResultAdd: "DB42.DBW127",
      describeParams: []
    }
  ],
  2: [
    {
      id: "1",
      description: "顺转噪音",
      params: [
        {
          description: "分贝(dB)",
          id: "1",
          code: "1"
        }
      ],
      plcResultAdd: "DB42.DBW112",
      describeParams: [
        {
          paramDescription: "分贝(dB)",
          plcType: 1,
          plCAdd: "DB42.DBW333",
          isEdit: false,
          id: "1-1"
        }
      ]
    },
    {
      id: "2",
      description: "逆转噪音",
      params: [
        {
          description: "分贝(dB)",
          id: "1",
          code: "1"
        }
      ],
      plcResultAdd: "",
      describeParams: [
        {
          paramDescription: "分贝(dB)",
          plcType: 3,
          plCAdd: "DB42.DBW222",
          isEdit: false,
          id: "1-3"
        }
      ]
    },
    {
      id: "3",
      description: "交耐测试",
      params: [
        {
          description: "交耐电流(mA)",
          id: "2",
          code: "2"
        },
        {
          description: "接地电阻(mΩ)",
          id: "3",
          code: "3"
        }
      ],
      plcResultAdd: "DB42.DBW114",
      describeParams: [
        {
          paramDescription: "交耐电流(mA)",
          plcType: 1,
          plCAdd: "DB42.DBW330",
          isEdit: false,
          id: "2-1"
        },
        {
          paramDescription: "交耐电流(mA)",
          plcType: 2,
          plCAdd: "DB42.DBW334",
          isEdit: false,
          id: "2-2"
        },
        {
          paramDescription: "接地电阻(mΩ)",
          plcType: 1,
          plCAdd: "DB42.DBW335",
          isEdit: false,
          id: "3-1"
        },
        {
          paramDescription: "接地电阻(mΩ)",
          plcType: 2,
          plCAdd: "DB42.DBW336",
          isEdit: false,
          id: "3-2"
        }
      ]
    },
    {
      id: "4",
      description: "接地测试",
      params: [
        {
          description: "分贝(dB)",
          id: "1",
          code: "1"
        },
        {
          description: "交耐电流(mA)",
          id: "2",
          code: "2"
        },
        {
          description: "接地电阻(mΩ)",
          id: "3",
          code: "3"
        }
      ],
      plcResultAdd: "DB42.DBW115",
      describeParams: [
        {
          paramDescription: "分贝(dB)",
          plcType: 1,
          plCAdd: "DB42.DBW333",
          isEdit: false,
          id: "1-1"
        },
        {
          paramDescription: "分贝(dB)",
          plcType: 2,
          plCAdd: "DB42.DBW333",
          isEdit: false,
          id: "1-2"
        },
        {
          paramDescription: "交耐电流(mA)",
          plcType: 3,
          plCAdd: "DB42.DBW334",
          isEdit: false,
          id: "2-3"
        },
        {
          paramDescription: "接地电阻(mΩ)",
          plcType: 3,
          plCAdd: "DB42.DBW335",
          isEdit: false,
          id: "3-3"
        }
      ]
    }
  ]
};

// sop下拉列表
const sopSelectList = {
  1: [
    { id: 1, sop: "JS-9-1.12", sopDescription: "R型电机", qc: 1 },
    {
      id: 2,
      sop: "JS-9-1-588",
      sopDescription: "DM35QL/Y016型电机[CM10820#]",
      qc: 1
    },
    { id: 3, sop: "JS-9-1-927", sopDescription: "S型-M型-Q型综合测试", qc: 1 },
    {
      id: 4,
      sop: "JS-9-2.146",
      sopDescription: "EAB、EAF型电机（双向）",
      qc: 1
    },
    { id: 5, sop: "JS-9-2-610", sopDescription: "R/Z型电机[CM833#]", qc: 1 }
  ],
  2: [
    {
      id: 5,
      sop: "JS-9-1.445",
      sopDescription: "DM35QL/Y016型电机[CM10820#]",
      qc: 2,
      status: 1
    },
    {
      id: 7,
      sop: "JS-9-1.538",
      sopDescription: "EAB、EAF型电机（双向）",
      qc: 2,
      status: 1
    },
    {
      id: 2,
      sop: "JS-9-1.589",
      sopDescription: "BJ型电机",
      qc: 2,
      status: 1
    },
    {
      id: 8,
      sop: "JS-9-1.639",
      sopDescription: "R/Z型电机[CM833#]",
      qc: 2,
      status: 1
    }
  ]
};

// 工序参数列表
const processSelectList = {
  1: [
    {
      id: "C8B1362C0AA000019163C37E11781787",
      code: 1,
      qc: 1,
      description: "行程(CM)"
    },
    {
      id: "C8B1325198E00001B047134A96805040",
      code: 2,
      qc: 1,
      description: "转速(RPM)"
    },
    {
      id: "C8B1325199000001DCC116C71CAC1E40",
      code: 3,
      qc: 1,
      description: "电压(V)"
    },
    {
      id: "C8B1362C0B20000157CF1CC0D61511F6",
      code: 4,
      qc: 1,
      description: "电流(A)"
    },
    {
      id: "C8B1362C0B300001117C164E18B7FAE0",
      code: 5,
      qc: 1,
      description: "功率(W)"
    }
  ],
  2: [
    {
      id: "C8B1362C0B400001C4D31DD0E810149B",
      code: 1,
      qc: 2,
      description: "分贝(dB)"
    },
    {
      id: "C8B1362C0B500001C17C1E021D191A5E",
      code: 2,
      qc: 2,
      description: "交耐电流(mA)"
    },
    {
      id: "C8B1362C0B5000014F891CF08B274630",
      code: 3,
      qc: 2,
      description: "接地电阻(mΩ)"
    }
  ]
};

// 过程值下拉列表
const valueSelectList = [
  {
    key: 1,
    value: "下限"
  },
  {
    key: 2,
    value: "上限"
  },
  {
    key: 3,
    value: "过程值"
  }
];

export { processList, sopSelectList, processSelectList, valueSelectList };
