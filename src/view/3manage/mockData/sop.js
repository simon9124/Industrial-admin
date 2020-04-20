// 工位列表
const workStationList = [
  {
    id: 1,
    typeName: "综合检测"
  },
  {
    id: 2,
    typeName: "静音检测"
  },
  {
    id: 3,
    typeName: "外观检测"
  }
];

// 顶部tab列表
const tabList = [
  {
    id: 1,
    typeName: "综合检测"
  },
  {
    id: 2,
    typeName: "静音检测"
  }
];

// sop列表
const sopList = {
  1: [
    {
      items: [
        {
          code: 143,
          description: "顺转二",
          sopId: 6,
          plcRusltAddr: null,
          sort: 1,
          createBy: null,
          createTime: "2019-12-13 13:28:28",
          id: "fc84807c90b546ecb66b21552d917e32"
        },
        {
          code: 142,
          description: "顺转一",
          sopId: 6,
          plcRusltAddr: null,
          sort: 2,
          createBy: null,
          createTime: "2019-12-13 13:28:28",
          id: "ecf8d9fca4444c94adb0cfc86762da73"
        },
        {
          code: 144,
          description: "顺转三",
          sopId: 6,
          plcRusltAddr: null,
          sort: 3,
          createBy: null,
          createTime: "2019-12-13 13:28:28",
          id: "471d10c0ffe54ea1838b93c8680a697a"
        },
        {
          code: 145,
          description: "逆转一",
          sopId: 6,
          plcRusltAddr: null,
          sort: 4,
          createBy: null,
          createTime: "2019-12-13 13:28:28",
          id: "b4a749e023a14fd993a5ad628f8c4a44"
        },
        {
          code: 146,
          description: "逆转二",
          sopId: 6,
          plcRusltAddr: null,
          sort: 5,
          createBy: null,
          createTime: "2019-12-13 13:28:28",
          id: "d47890a49fb149ffbbf08ec9410378bc"
        },
        {
          code: 147,
          description: "逆转三",
          sopId: 6,
          plcRusltAddr: null,
          sort: 6,
          createBy: null,
          createTime: "2019-12-13 13:28:28",
          id: "aa8e630312ea4713ab824fd239795a37"
        },
        {
          code: 148,
          description: "后置工序",
          sopId: 6,
          plcRusltAddr: null,
          sort: 7,
          createBy: null,
          createTime: "2019-12-13 13:28:28",
          id: "baecf7d274e64ead8e02c8a010213f85"
        }
      ],
      id: 6,
      sop: "SOP.1.0008",
      sopDescription: "R型",
      qc: 1,
      status: 1,
      lineNo: 0
    },
    {
      items: [
        {
          code: 146,
          description: "前置工序",
          sopId: 1,
          plcRusltAddr: "DB41.DBW314",
          sort: 1,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:15:17",
          id: "af6c0e54a40d4070a5104452c256ce68"
        },
        {
          code: 147,
          description: "顺转1",
          sopId: 1,
          plcRusltAddr: "DB41.DBW94",
          sort: 2,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:15:45",
          id: "511dc182e39146398338258d13e2473c"
        },
        {
          code: 148,
          description: "顺转2",
          sopId: 1,
          plcRusltAddr: "DB41.DBW96",
          sort: 3,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:17:31",
          id: "0c83d621c1d4466da06fc4d267653c89"
        },
        {
          code: 149,
          description: "顺转3",
          sopId: 1,
          plcRusltAddr: "DB41.DBW98",
          sort: 4,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:20:35",
          id: "a057791c6e574345912f7d55212b9eb9"
        },
        {
          code: 150,
          description: "逆转1",
          sopId: 1,
          plcRusltAddr: "DB41.DBW100",
          sort: 5,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:24:04",
          id: "10bfb5d958da470c849e2bc4ef0906b6"
        },
        {
          code: 151,
          description: "逆转2",
          sopId: 1,
          plcRusltAddr: "DB41.DBW102",
          sort: 6,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:25:23",
          id: "f1cc6c4adfa142a5b524683fea0d3ec0"
        },
        {
          code: 152,
          description: "逆转3",
          sopId: 1,
          plcRusltAddr: "DB41.DBW104",
          sort: 7,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:25:37",
          id: "cda963546a83476f8dab0b3b618c6782"
        },
        {
          code: 153,
          description: "验证上行程",
          sopId: 1,
          plcRusltAddr: "DB41.DBW108",
          sort: 8,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:29:05",
          id: "30a288e5b19f4aeb991ddd9fbee0ff95"
        },
        {
          code: 154,
          description: "验证下行程",
          sopId: 1,
          plcRusltAddr: "DB41.DBW108",
          sort: 9,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:30:03",
          id: "083975573c24426d9b425b8521f79066"
        },
        {
          code: 155,
          description: "后置工序",
          sopId: 1,
          plcRusltAddr: "DB41.DBW316",
          sort: 10,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:31:06",
          id: "e633f29f83f4426c83f1ac80b83dfda3"
        }
      ],
      id: 1,
      sop: "SOP.1.1000",
      sopDescription: "前序 顺三 逆三 验证行程 后序",
      qc: 1,
      status: 1,
      lineNo: 0
    },
    {
      items: [
        {
          code: 145,
          description: "前置工序",
          sopId: 3,
          plcRusltAddr: "DB41.DBW314",
          sort: 1,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:36:11",
          id: "82b2e3ecaa7140f3a7b0b8defa2f9ef4"
        },
        {
          code: 146,
          description: "顺转1",
          sopId: 3,
          plcRusltAddr: "DB41.DBW94",
          sort: 2,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:36:39",
          id: "161908f7e3514396953f992354c00d45"
        },
        {
          code: 147,
          description: "顺转2",
          sopId: 3,
          plcRusltAddr: "DB41.DBW96",
          sort: 3,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:37:40",
          id: "f17c870077a742068524cfdeca4918d1"
        },
        {
          code: 148,
          description: "顺转3",
          sopId: 3,
          plcRusltAddr: "DB41.DBW98",
          sort: 4,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:38:33",
          id: "13c3ea05ca484e1fad3c58989a810743"
        },
        {
          code: 149,
          description: "逆转1",
          sopId: 3,
          plcRusltAddr: "DB41.DBW100",
          sort: 5,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:43:17",
          id: "0de077d3a307494a8834821a57ba6c72"
        },
        {
          code: 150,
          description: "逆转2",
          sopId: 3,
          plcRusltAddr: "DB41.DBW102",
          sort: 6,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:43:58",
          id: "fea543e632c245e989d19fef759dc388"
        },
        {
          code: 151,
          description: "逆转3",
          sopId: 3,
          plcRusltAddr: "DB41.DBW104",
          sort: 7,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:44:52",
          id: "4b058bca26054cb28ecc07c5f20f5bd0"
        },
        {
          code: 152,
          description: "验证上行程",
          sopId: 3,
          plcRusltAddr: "DB41.DBW106",
          sort: 8,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:47:29",
          id: "0543978553fb41938c50bf21b878d713"
        },
        {
          code: 153,
          description: "验证下行程",
          sopId: 3,
          plcRusltAddr: "DB41.DBW108",
          sort: 9,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:48:06",
          id: "6ce8d982559449f4a7d01921f767ce33"
        }
      ],
      id: 3,
      sop: "SOP.1.1001",
      sopDescription: "前序 顺三 逆三 验证行程",
      qc: 1,
      status: 1,
      lineNo: 0
    },
    {
      items: [
        {
          code: 142,
          description: "顺转一",
          sopId: 7,
          plcRusltAddr: "DB41.DBW94",
          sort: 1,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-16 14:30:37",
          id: "b8ba577338bb4f228b98e9be387ef780"
        },
        {
          code: 143,
          description: "顺转二",
          sopId: 7,
          plcRusltAddr: "DB41.DBW96",
          sort: 2,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 15:43:27",
          id: "5e289b5af88641ddb5de36366008006c"
        },
        {
          code: 144,
          description: "顺转三",
          sopId: 7,
          plcRusltAddr: "DB41.DBW98",
          sort: 3,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 15:44:44",
          id: "fed8cb561e6648c8ba25d4f9fb7a5fa9"
        },
        {
          code: 145,
          description: "逆转一",
          sopId: 7,
          plcRusltAddr: "DB41.DBW100",
          sort: 4,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 15:48:45",
          id: "3cd486bc76d94e95a9bc7a4dafd04711"
        },
        {
          code: 146,
          description: "逆转二",
          sopId: 7,
          plcRusltAddr: "DB41.DBW102",
          sort: 5,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 15:49:34",
          id: "cdab4d4f15144a08a4cbcab18f0de2c9"
        },
        {
          code: 147,
          description: "逆转三",
          sopId: 7,
          plcRusltAddr: "DB41.DBW104",
          sort: 6,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 15:50:18",
          id: "3088132d3e7d498ea7fb77c9536ee689"
        },
        {
          code: 149,
          description: "验证上行程",
          sopId: 7,
          plcRusltAddr: "DB41.DBW106",
          sort: 7,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 15:52:03",
          id: "fe391f54262b42e09c9dc1d280999c29"
        },
        {
          code: 150,
          description: "验证下行程",
          sopId: 7,
          plcRusltAddr: "DB41.DBW108",
          sort: 8,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 15:48:07",
          id: "c8fadbc27ea64e298ff8c69c6d0ade13"
        },
        {
          code: 148,
          description: "后置工序",
          sopId: 7,
          plcRusltAddr: "DB41.DBW316",
          sort: 9,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 15:47:39",
          id: "5d9cc9aa537f47cabb7b1951a08f8eed"
        }
      ],
      id: 7,
      sop: "SOP.1.1002",
      sopDescription:
        "顺一，顺二，顺三，顺四，逆一，逆二，逆三，逆四，后置工序",
      qc: 1,
      status: 1,
      lineNo: 0
    }
  ],
  2: [
    {
      items: [
        {
          code: 247,
          description: "前置工序",
          sopId: 2,
          plcRusltAddr: "DB42.DBW108",
          sort: 1,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:50:27",
          id: "191b4443883e475b988033d11a680bcd"
        },
        {
          code: 242,
          description: "低压",
          sopId: 2,
          plcRusltAddr: "DB42.DBW94",
          sort: 2,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:33:31",
          id: "5a948b4132e648e19cf246fc3688d0bd"
        },
        {
          code: 248,
          description: "顺转噪音",
          sopId: 2,
          plcRusltAddr: "DB42.DBW96",
          sort: 3,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:35:22",
          id: "00b8581681924188bd52a004d9abca74"
        },
        {
          code: 249,
          description: "逆转噪音",
          sopId: 2,
          plcRusltAddr: "DB42.DBW102",
          sort: 4,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:35:58",
          id: "1d67e957fbad4b36848b6ef44d517f3d"
        },
        {
          code: 250,
          description: "交耐",
          sopId: 2,
          plcRusltAddr: "DB42.DBW98",
          sort: 5,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:51:14",
          id: "fa08c246801144f6865e95af77b5f883"
        },
        {
          code: 245,
          description: "接地",
          sopId: 2,
          plcRusltAddr: "DB42.DBW100",
          sort: 6,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:39:20",
          id: "1e60cafb27974259a734835d05af034b"
        },
        {
          code: 251,
          description: "后置工序",
          sopId: 2,
          plcRusltAddr: "DB42.DBW110",
          sort: 7,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:40:08",
          id: "7b5de8d23689484c9b9a97527d8879dc"
        }
      ],
      id: 2,
      sop: "SOP.2.1000",
      sopDescription: "前序 低压 噪音 交耐 接地 后序",
      qc: 2,
      status: 1,
      lineNo: 0
    },
    {
      items: [
        {
          code: 246,
          description: "前置工序",
          sopId: 4,
          plcRusltAddr: "DB42.DBD128",
          sort: 1,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:53:59",
          id: "80661e76e47444d4a3255fd0702d2aee"
        },
        {
          code: 242,
          description: "低压",
          sopId: 4,
          plcRusltAddr: "DB42.DBW94",
          sort: 2,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:51:27",
          id: "ca31f93654d441b4adfee43bc018ed12"
        },
        {
          code: 247,
          description: "顺转噪音",
          sopId: 4,
          plcRusltAddr: "DB42.DBW96",
          sort: 3,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:54:20",
          id: "8142997bf65240a39ad7107a1dccb208"
        },
        {
          code: 248,
          description: "逆转噪音",
          sopId: 4,
          plcRusltAddr: "DB42.DBW102",
          sort: 4,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:54:56",
          id: "eb61bda17a2b448996a3ee1a71e43c75"
        },
        {
          code: 244,
          description: "交耐",
          sopId: 4,
          plcRusltAddr: "DB42.DBW102",
          sort: 5,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:51:54",
          id: "fd70161339354c8b9230dcc37f63266b"
        },
        {
          code: 245,
          description: "接地",
          sopId: 4,
          plcRusltAddr: "DB42.DBW100",
          sort: 6,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:53:25",
          id: "569b5c569ce545fbbea75b5e48be92da"
        }
      ],
      id: 4,
      sop: "SOP.2.1001",
      sopDescription: "前序 低压 噪音 交耐 接地",
      qc: 2,
      status: 1,
      lineNo: 0
    },
    {
      items: [
        {
          code: 246,
          description: "低压",
          sopId: 5,
          plcRusltAddr: "DB42.DBW94",
          sort: 1,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:59:26",
          id: "cc63bfc9c43644c680bfa6830706436f"
        },
        {
          code: 247,
          description: "顺转噪音",
          sopId: 5,
          plcRusltAddr: "DB42.DBW96",
          sort: 2,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:59:53",
          id: "adedebd65992418f9585d4cc537b8787"
        },
        {
          code: 248,
          description: "逆转噪音",
          sopId: 5,
          plcRusltAddr: "DB42.DBW102",
          sort: 3,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 11:01:23",
          id: "0702e77b41ce481ba247ef72c12544b2"
        },
        {
          code: 249,
          description: "交耐",
          sopId: 5,
          plcRusltAddr: "DB42.DBW98",
          sort: 4,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 11:03:18",
          id: "64b1667cedfc420d98bfc5cbaf317490"
        },
        {
          code: 250,
          description: "接地",
          sopId: 5,
          plcRusltAddr: "DB42.DBW100",
          sort: 5,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 11:05:03",
          id: "43d16fbec8b94a25831ecece5ebe4fa4"
        },
        {
          code: 251,
          description: "后置工序",
          sopId: 5,
          plcRusltAddr: "DB42.DBW110",
          sort: 6,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 11:05:28",
          id: "ebd8a2898bbe45c991fb10ef6e3e1ec2"
        }
      ],
      id: 5,
      sop: "SOP.2.1002",
      sopDescription: "低压 噪音 交耐 接地 后序",
      qc: 2,
      status: 1,
      lineNo: 0
    }
  ],
  3: []
};

// 默认工序列表
const itemList = {
  1: [
    {
      description: "前置工序"
    },
    {
      description: "顺转一"
    },
    {
      description: "顺转二"
    },
    {
      description: "顺转三"
    },
    {
      description: "逆转一"
    },
    {
      description: "逆转二"
    },
    {
      description: "逆转三"
    },
    {
      description: "后置工序"
    }
  ],
  2: [
    {
      description: "低压测试"
    },
    {
      description: "顺转噪音"
    },
    {
      description: "逆转噪音"
    },
    {
      description: "交耐测试"
    },
    {
      description: "接地测试"
    }
  ]
};

export { workStationList, tabList, sopList, itemList };
