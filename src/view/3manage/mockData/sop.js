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
          code: 141,
          description: "前置工序",
          sopId: 51,
          plcRusltAddr: "",
          sort: 1,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-04-10 14:14:03",
          id: "88af32ca19634819977e5dfc6f535602"
        },
        {
          code: 142,
          description: "顺转一",
          sopId: 51,
          plcRusltAddr: null,
          sort: 2,
          createBy: null,
          createTime: "2020-04-01 15:09:58",
          id: "81deb1d8820841e3bde54a41431795d1"
        },
        {
          code: 143,
          description: "顺转二",
          sopId: 51,
          plcRusltAddr: null,
          sort: 3,
          createBy: null,
          createTime: "2020-04-01 15:09:58",
          id: "78583632a51e44b5ade1bfdac370479b"
        },
        {
          code: 144,
          description: "顺转三",
          sopId: 51,
          plcRusltAddr: null,
          sort: 4,
          createBy: null,
          createTime: "2020-04-01 15:09:58",
          id: "3f3817a7fe7e414f97ece7684421e0f2"
        },
        {
          code: 145,
          description: "逆转一",
          sopId: 51,
          plcRusltAddr: null,
          sort: 5,
          createBy: null,
          createTime: "2020-04-01 15:09:58",
          id: "2438776939754b7c84ef999d4e7f392c"
        },
        {
          code: 146,
          description: "逆转二",
          sopId: 51,
          plcRusltAddr: null,
          sort: 6,
          createBy: null,
          createTime: "2020-04-01 15:09:58",
          id: "bc924e4b187f4eee9ec0cc88a7a3ef3e"
        },
        {
          code: 147,
          description: "逆转三",
          sopId: 51,
          plcRusltAddr: null,
          sort: 7,
          createBy: null,
          createTime: "2020-04-01 15:09:58",
          id: "696e19c745fc4264973ca101d96ea5e1"
        },
        {
          code: 148,
          description: "后置工序",
          sopId: 51,
          plcRusltAddr: null,
          sort: 8,
          createBy: null,
          createTime: "2020-04-01 15:09:58",
          id: "c890fdfee7db451f90dba2958c577cbc"
        }
      ],
      id: 51,
      sop: "HU.109.12",
      sopDescription: "测试1234",
      qc: 1,
      status: 1
    },
    {
      items: [
        {
          code: 146,
          description: "前置工序",
          sopId: 1,
          plcRusltAddr: "DB41.DBW314",
          sort: 1,
          createBy: "dea72145-1ff2-42de-ae94-6d936a74ba5c",
          createTime: "2020-01-07 17:04:53",
          id: "af6c0e54a40d4070a5104452c256ce68"
        },
        {
          code: 147,
          description: "顺转1",
          sopId: 1,
          plcRusltAddr: "DB41.DBW94",
          sort: 2,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-06 16:31:07",
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
          code: 156,
          description: "后置工序",
          sopId: 1,
          plcRusltAddr: "DB41.DBW316",
          sort: 10,
          createBy: "dea72145-1ff2-42de-ae94-6d936a74ba5c",
          createTime: "2020-01-07 11:33:14",
          id: "a7df3cdacf584a6c843536c134b00772"
        }
      ],
      id: 1,
      sop: "JS-9-1.10",
      sopDescription: "E型-F型综合测试",
      qc: 1,
      status: 1
    },
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
      sop: "JS-9-1.11",
      sopDescription: "R型综合测试",
      qc: 1,
      status: 1
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
          code: 153,
          description: "验证下行程",
          sopId: 3,
          plcRusltAddr: "DB41.DBW108",
          sort: 8,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:48:06",
          id: "6ce8d982559449f4a7d01921f767ce33"
        },
        {
          code: 152,
          description: "验证上行程",
          sopId: 3,
          plcRusltAddr: "DB41.DBW106",
          sort: 9,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 10:47:29",
          id: "0543978553fb41938c50bf21b878d713"
        }
      ],
      id: 3,
      sop: "JS-9-1.12",
      sopDescription: "B型综合测试",
      qc: 1,
      status: 1
    },
    {
      items: [
        {
          code: 142,
          description: "顺转一",
          sopId: 19,
          plcRusltAddr: "DB41.DBW94",
          sort: 1,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-30 13:10:26",
          id: "b16db19259fa4f178c7b3f44ccdf91f9"
        },
        {
          code: 143,
          description: "顺转二",
          sopId: 19,
          plcRusltAddr: "DB41.DBW96",
          sort: 2,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-30 13:08:44",
          id: "0faa0124d750431384334a1a938ff514"
        },
        {
          code: 144,
          description: "顺转三",
          sopId: 19,
          plcRusltAddr: null,
          sort: 3,
          createBy: null,
          createTime: "2019-12-30 12:59:11",
          id: "0db63825001542aa99d6de1ce1556c97"
        },
        {
          code: 145,
          description: "逆转一",
          sopId: 19,
          plcRusltAddr: null,
          sort: 4,
          createBy: null,
          createTime: "2019-12-30 12:59:11",
          id: "4bbf3662a0294f0086fddfac39266d48"
        },
        {
          code: 146,
          description: "逆转二",
          sopId: 19,
          plcRusltAddr: null,
          sort: 5,
          createBy: null,
          createTime: "2019-12-30 12:59:11",
          id: "57957b8bdd684fd5bb3043643eefc252"
        },
        {
          code: 147,
          description: "逆转三",
          sopId: 19,
          plcRusltAddr: null,
          sort: 6,
          createBy: null,
          createTime: "2019-12-30 12:59:11",
          id: "9cf6e797a38a47d58bc85d4905844d2a"
        },
        {
          code: 148,
          description: "后置工序",
          sopId: 19,
          plcRusltAddr: null,
          sort: 7,
          createBy: null,
          createTime: "2019-12-30 12:59:11",
          id: "1cdf4e82f84740d9ad1dd5a76a322919"
        }
      ],
      id: 19,
      sop: "JS-9-1.123",
      sopDescription: "DM35RQL086[CM278](230V)综合测试",
      qc: 1,
      status: 1
    },
    {
      items: [
        {
          code: 141,
          description: "前置工序",
          sopId: 26,
          plcRusltAddr: "DB41.DBW314",
          sort: 1,
          createBy: "1001",
          createTime: "2020-01-02 14:03:50",
          id: "1f89f135404643eea764e5fda0efabb9"
        },
        {
          code: 142,
          description: "顺转一",
          sopId: 26,
          plcRusltAddr: "DB41.DBW94",
          sort: 2,
          createBy: "1001",
          createTime: "2020-01-02 14:04:02",
          id: "7df5a2606ae34d8c81d0b581e2257172"
        },
        {
          code: 143,
          description: "顺转二",
          sopId: 26,
          plcRusltAddr: "DB41.DBW96",
          sort: 3,
          createBy: "1001",
          createTime: "2020-01-02 14:04:51",
          id: "ab52ab04b2894c26aeb81c6fba3fdd77"
        },
        {
          code: 144,
          description: "顺转三",
          sopId: 26,
          plcRusltAddr: "DB41.DBW98",
          sort: 4,
          createBy: "1001",
          createTime: "2020-01-02 14:05:39",
          id: "83502f1c688245cb887ca49adced99c0"
        },
        {
          code: 145,
          description: "逆转一",
          sopId: 26,
          plcRusltAddr: "DB41.DBW100",
          sort: 5,
          createBy: "1001",
          createTime: "2020-01-02 14:40:28",
          id: "176adbed8a134d6b8fa8aca0b594a124"
        },
        {
          code: 146,
          description: "逆转二",
          sopId: 26,
          plcRusltAddr: "DB41.DBW102",
          sort: 6,
          createBy: "1001",
          createTime: "2020-01-02 14:41:29",
          id: "c87ac677638149b48dcd8be82ee76bff"
        },
        {
          code: 147,
          description: "逆转三",
          sopId: 26,
          plcRusltAddr: "DB41.DBW104",
          sort: 7,
          createBy: "1001",
          createTime: "2020-01-02 14:42:43",
          id: "afe3617ee71843c5a8be8eeb7f7e3399"
        },
        {
          code: 148,
          description: "验证上行程",
          sopId: 26,
          plcRusltAddr: "DB41.DBW106",
          sort: 8,
          createBy: "1001",
          createTime: "2020-01-02 14:46:30",
          id: "9d079989b5474fe299037c8f4652848f"
        },
        {
          code: 149,
          description: "验证下行程",
          sopId: 26,
          plcRusltAddr: "DB41.DBW108",
          sort: 9,
          createBy: "1001",
          createTime: "2020-01-02 14:48:04",
          id: "df0e803e009345a79c15ceb55b9ac494"
        },
        {
          code: 150,
          description: "后置工序",
          sopId: 26,
          plcRusltAddr: "DB41.DBW316",
          sort: 10,
          createBy: "1001",
          createTime: "2020-01-02 14:48:14",
          id: "e0271e76e3b94d33b203074827de884a"
        }
      ],
      id: 26,
      sop: "JS-9-1.254",
      sopDescription: "BFBW系列电机综合测试",
      qc: 1,
      status: 1
    },
    {
      items: [
        {
          code: 144,
          description: "顺转一",
          sopId: 45,
          plcRusltAddr: "DB41.DBW94",
          sort: 1,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-06 16:39:37",
          id: "5e849f0714634e21b2f3fa4f1b7a8446"
        },
        {
          code: 145,
          description: "顺转二",
          sopId: 45,
          plcRusltAddr: "DB41.DBW96",
          sort: 2,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-06 16:56:10",
          id: "5f5161666ee341fc952bc255814997ce"
        },
        {
          code: 146,
          description: "顺转三",
          sopId: 45,
          plcRusltAddr: "DB41.DBW98",
          sort: 3,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-06 16:44:41",
          id: "ccea08a5f00e4060a5ea24b85eb4ccb3"
        },
        {
          code: 147,
          description: "逆转一",
          sopId: 45,
          plcRusltAddr: "DB41.DBW100",
          sort: 4,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-07 09:10:43",
          id: "c653e8dc85df4b23a53c4bc8b169b09b"
        },
        {
          code: 148,
          description: "逆转二",
          sopId: 45,
          plcRusltAddr: "DB41.DBW102",
          sort: 5,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-07 09:10:49",
          id: "d880ee9843714876bc270351ccea9391"
        },
        {
          code: 149,
          description: "逆转三",
          sopId: 45,
          plcRusltAddr: "DB41.DBW104",
          sort: 6,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-07 09:13:23",
          id: "0c676ac399e94b8995234032783c139e"
        }
      ],
      id: 45,
      sop: "JS-9-1.268",
      sopDescription: "B型电机综合测试（四芯线+行程头带按钮）",
      qc: 1,
      status: 1
    },
    {
      items: [
        {
          code: 141,
          description: "前置工序",
          sopId: 39,
          plcRusltAddr: "",
          sort: 1,
          createBy: "dea72145-1ff2-42de-ae94-6d936a74ba5c",
          createTime: "2020-01-03 12:05:11",
          id: "ef613efb3d2c47bf86ac56855ab0eb3d"
        },
        {
          code: 142,
          description: "顺转一",
          sopId: 39,
          plcRusltAddr: null,
          sort: 2,
          createBy: null,
          createTime: "2020-01-03 11:40:45",
          id: "3bd60a15d7514fdf83d58d597fd220ad"
        },
        {
          code: 143,
          description: "顺转二",
          sopId: 39,
          plcRusltAddr: null,
          sort: 3,
          createBy: null,
          createTime: "2020-01-03 11:40:45",
          id: "69905067f51c44bc80b45c0b0c96c2b2"
        },
        {
          code: 144,
          description: "顺转三",
          sopId: 39,
          plcRusltAddr: null,
          sort: 4,
          createBy: null,
          createTime: "2020-01-03 11:40:45",
          id: "e68fb1d3ab0d4efeac1d096f9c1e70c5"
        },
        {
          code: 145,
          description: "逆转一",
          sopId: 39,
          plcRusltAddr: null,
          sort: 5,
          createBy: null,
          createTime: "2020-01-03 11:40:45",
          id: "5bc73a1beec6495b862e198136c10f31"
        },
        {
          code: 146,
          description: "逆转二",
          sopId: 39,
          plcRusltAddr: null,
          sort: 6,
          createBy: null,
          createTime: "2020-01-03 11:40:45",
          id: "cceb95174636411191bf3d7e3fbb65af"
        },
        {
          code: 147,
          description: "逆转三",
          sopId: 39,
          plcRusltAddr: null,
          sort: 7,
          createBy: null,
          createTime: "2020-01-03 11:40:45",
          id: "3a8358ac0f344ec8b5dc2c7010c17b2a"
        },
        {
          code: 148,
          description: "后置工序",
          sopId: 39,
          plcRusltAddr: null,
          sort: 8,
          createBy: "dea72145-1ff2-42de-ae94-6d936a74ba5c",
          createTime: "2020-01-03 11:54:19",
          id: "126bc970e91348feb48945b6d01dfe93"
        }
      ],
      id: 39,
      sop: "JS-9-1.444",
      sopDescription: "DM35QL-Y016电机综合测试[CM10820]",
      qc: 1,
      status: 1
    },
    {
      items: [
        {
          code: 141,
          description: "顺转一",
          sopId: 32,
          plcRusltAddr: "DB41.DBW94",
          sort: 1,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:15:20",
          id: "f88d8d9e38c742989c0c2aaaacd2560a"
        },
        {
          code: 142,
          description: "顺转二",
          sopId: 32,
          plcRusltAddr: "DB41.DBW96",
          sort: 2,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:17:26",
          id: "daf2dd2ddfb4461ab55942464fc034bf"
        },
        {
          code: 143,
          description: "顺转三",
          sopId: 32,
          plcRusltAddr: "DB41.DBW98",
          sort: 3,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:27:59",
          id: "848ca4586a7a4e9f855c2ec24cf4e715"
        },
        {
          code: 144,
          description: "逆转一",
          sopId: 32,
          plcRusltAddr: "DB41.DBW100",
          sort: 4,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:28:47",
          id: "f2d5e8635ad74353b2a7b28bce13d6de"
        },
        {
          code: 145,
          description: "逆转二",
          sopId: 32,
          plcRusltAddr: "DB41.DBW102",
          sort: 5,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:29:22",
          id: "fcb3ec0d8f214c5fb805d5d1e2f4b35b"
        },
        {
          code: 146,
          description: "逆转三",
          sopId: 32,
          plcRusltAddr: "DB41.DBW104",
          sort: 6,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:32:54",
          id: "89a152560bdb43d181a8367b7fa6ef6d"
        },
        {
          code: 147,
          description: "验证上行程",
          sopId: 32,
          plcRusltAddr: "DB41.DBW106",
          sort: 7,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:35:00",
          id: "125506a70dd44b4088933d35a4c73274"
        },
        {
          code: 148,
          description: "验证下行程",
          sopId: 32,
          plcRusltAddr: "DB41.DBW108",
          sort: 8,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:35:33",
          id: "32526aeb1bed4b149f600027bbaabfd5"
        },
        {
          code: 149,
          description: "后置工序",
          sopId: 32,
          plcRusltAddr: "DB41.DBW316",
          sort: 9,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:35:43",
          id: "23a23ccaa14f4d399d04a23f54930e3e"
        }
      ],
      id: 32,
      sop: "JS-9-1.484",
      sopDescription: "BM型电机综合测试1",
      qc: 1,
      status: 1
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
          code: 150,
          description: "验证下行程",
          sopId: 7,
          plcRusltAddr: "DB41.DBW108",
          sort: 7,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 15:48:07",
          id: "c8fadbc27ea64e298ff8c69c6d0ade13"
        },
        {
          code: 148,
          description: "后置工序",
          sopId: 7,
          plcRusltAddr: "DB41.DBW316",
          sort: 8,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-13 15:47:39",
          id: "5d9cc9aa537f47cabb7b1951a08f8eed"
        }
      ],
      id: 7,
      sop: "JS-9-1.52",
      sopDescription: "FTS系列综合测试",
      qc: 1,
      status: 1
    },
    {
      items: [
        {
          code: 141,
          description: "前置工序",
          sopId: 28,
          plcRusltAddr: "DB41.DBW314",
          sort: 1,
          createBy: "1001",
          createTime: "2020-01-02 15:40:38",
          id: "20c38061360947bdadcfab3b9985597c"
        },
        {
          code: 142,
          description: "顺转一",
          sopId: 28,
          plcRusltAddr: "DB41.DBW94",
          sort: 2,
          createBy: "1001",
          createTime: "2020-01-02 15:40:50",
          id: "aca0760ca6e1462788c310d5a5943e43"
        },
        {
          code: 143,
          description: "顺转二",
          sopId: 28,
          plcRusltAddr: "DB41.DBW96",
          sort: 3,
          createBy: "1001",
          createTime: "2020-01-02 15:41:32",
          id: "b5f09858a3724693a04405fd413f0925"
        },
        {
          code: 144,
          description: "顺转三",
          sopId: 28,
          plcRusltAddr: "DB41.DBW98",
          sort: 4,
          createBy: "1001",
          createTime: "2020-01-02 15:42:17",
          id: "8000c28e25d9446d83305604d2697a02"
        },
        {
          code: 145,
          description: "逆转一",
          sopId: 28,
          plcRusltAddr: "DB41.DBW100",
          sort: 5,
          createBy: "1001",
          createTime: "2020-01-02 15:45:24",
          id: "19673e9708fa41689d3417c54c09ebbe"
        },
        {
          code: 146,
          description: "逆转二",
          sopId: 28,
          plcRusltAddr: "DB41.DBW102",
          sort: 6,
          createBy: "1001",
          createTime: "2020-01-02 15:46:10",
          id: "54942978c0b749aea69fe27b5eeb6a9f"
        },
        {
          code: 147,
          description: "逆转三",
          sopId: 28,
          plcRusltAddr: "DB41.DBW104",
          sort: 7,
          createBy: "1001",
          createTime: "2020-01-02 15:46:53",
          id: "e152c6a287914b4e836b7ade3a300d8c"
        },
        {
          code: 148,
          description: "验证上行程",
          sopId: 28,
          plcRusltAddr: "DB41.DBW106",
          sort: 8,
          createBy: "1001",
          createTime: "2020-01-02 15:49:57",
          id: "b8b66f5085d049c1b98642e80bab6130"
        },
        {
          code: 149,
          description: "验证下行程",
          sopId: 28,
          plcRusltAddr: "DB41.DBW108",
          sort: 9,
          createBy: "1001",
          createTime: "2020-01-02 15:50:35",
          id: "a781a5ae534d4ba1b8c3b7af0aa710b2"
        }
      ],
      id: 28,
      sop: "JS-9-1.588",
      sopDescription: "BJ型电机综合测试",
      qc: 1,
      status: 1
    },
    {
      items: [
        {
          code: 141,
          description: "前置工序",
          sopId: 24,
          plcRusltAddr: "DB41.DBW314",
          sort: 1,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:09:48",
          id: "f610ab79cc8c46589b884ca3c9de3bb4"
        },
        {
          code: 149,
          description: "设置上行程",
          sopId: 24,
          plcRusltAddr: null,
          sort: 2,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:12:49",
          id: "27f3f8a1461f47ba9c4903ec8f233f56"
        },
        {
          code: 150,
          description: "设置下行程",
          sopId: 24,
          plcRusltAddr: "DB41.DBW94",
          sort: 3,
          createBy: "1001",
          createTime: "2019-12-31 18:16:02",
          id: "2808ac4449ef4f5190049b061737948c"
        },
        {
          code: 142,
          description: "顺转一",
          sopId: 24,
          plcRusltAddr: "DB41.DBW94",
          sort: 4,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:16:38",
          id: "7780255c70814a1ca2898eb752cb2346"
        },
        {
          code: 143,
          description: "顺转二",
          sopId: 24,
          plcRusltAddr: "DB41.DBW96",
          sort: 5,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:17:00",
          id: "31e7bec2f4b141d29f7c34041f5a7572"
        },
        {
          code: 144,
          description: "顺转三",
          sopId: 24,
          plcRusltAddr: "DB41.DBW98",
          sort: 6,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:17:51",
          id: "962b45d53edb4827a7522d0c94e34954"
        },
        {
          code: 145,
          description: "逆转一",
          sopId: 24,
          plcRusltAddr: "DB41.DBW100",
          sort: 7,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:24:51",
          id: "aec724bc3e0848daa664ad9982a9e7c7"
        },
        {
          code: 146,
          description: "逆转二",
          sopId: 24,
          plcRusltAddr: "DB41.DBW102",
          sort: 8,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:24:33",
          id: "f949db59a18d49e59a289858b9d3592a"
        },
        {
          code: 147,
          description: "逆转三",
          sopId: 24,
          plcRusltAddr: "DB41.DBW104",
          sort: 9,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:25:05",
          id: "46517217d59d4cc786a19ff79daa6810"
        },
        {
          code: 151,
          description: "抽查第三行程P1",
          sopId: 24,
          plcRusltAddr: "",
          sort: 10,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:49:07",
          id: "9e4c718b9e2b4823aa75e394377d5b24"
        },
        {
          code: 152,
          description: "抽查第三行程",
          sopId: 24,
          plcRusltAddr: null,
          sort: 11,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:12:49",
          id: "c72047185a554139a41b9a33e1d016cd"
        },
        {
          code: 153,
          description: "删行程",
          sopId: 24,
          plcRusltAddr: null,
          sort: 12,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:12:49",
          id: "d7a3026e85b24438873a3f6fb82b865b"
        },
        {
          code: 154,
          description: "后置工序",
          sopId: 24,
          plcRusltAddr: "DB41.DBW316",
          sort: 13,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:49:50",
          id: "2c14db59e9ef4a19b2cbd1ad22c1f226"
        }
      ],
      id: 24,
      sop: "JS-9-1.638",
      sopDescription: "R-Z电机综合测试[CM833]",
      qc: 1,
      status: 1
    },
    {
      items: [
        {
          code: 141,
          description: "前置工序",
          sopId: 16,
          plcRusltAddr: null,
          sort: 1,
          createBy: null,
          createTime: "2019-12-25 17:13:07",
          id: "eb130fcd815b463eb3a3ca57d53ec52f"
        },
        {
          code: 142,
          description: "顺转一",
          sopId: 16,
          plcRusltAddr: null,
          sort: 2,
          createBy: null,
          createTime: "2019-12-25 17:13:07",
          id: "16a6b13d04b341bebbd2ffbb11f039e7"
        },
        {
          code: 143,
          description: "顺转二",
          sopId: 16,
          plcRusltAddr: null,
          sort: 3,
          createBy: null,
          createTime: "2019-12-25 17:13:07",
          id: "c0253b77f41d4a239877b5bdb29a9e13"
        },
        {
          code: 144,
          description: "顺转三",
          sopId: 16,
          plcRusltAddr: null,
          sort: 4,
          createBy: null,
          createTime: "2019-12-25 17:13:07",
          id: "9ca9d22d03a14cf09c1afec22d5f4c88"
        },
        {
          code: 145,
          description: "逆转一",
          sopId: 16,
          plcRusltAddr: null,
          sort: 5,
          createBy: null,
          createTime: "2019-12-25 17:13:07",
          id: "d07be94623ef4f59a34b07f775fbba45"
        },
        {
          code: 146,
          description: "逆转二",
          sopId: 16,
          plcRusltAddr: null,
          sort: 6,
          createBy: null,
          createTime: "2019-12-25 17:13:07",
          id: "a2b1afe0d9714991a23446f9a78b13ce"
        },
        {
          code: 147,
          description: "逆转三",
          sopId: 16,
          plcRusltAddr: null,
          sort: 7,
          createBy: null,
          createTime: "2019-12-25 17:13:07",
          id: "159993b8c7614f3eaddd98eea5205324"
        },
        {
          code: 148,
          description: "后置工序",
          sopId: 16,
          plcRusltAddr: null,
          sort: 8,
          createBy: null,
          createTime: "2019-12-25 17:13:07",
          id: "808efbddf29a454593e98ae1b1a86a1e"
        }
      ],
      id: 16,
      sop: "JS-9-1.9",
      sopDescription: "S型-M型-Q型综合测试",
      qc: 1,
      status: 1
    },
    {
      items: [
        {
          code: 141,
          description: "前置工序",
          sopId: 49,
          plcRusltAddr: null,
          sort: 1,
          createBy: null,
          createTime: "2020-01-09 09:19:39",
          id: "9a1c1b8ded054734b682e280dc16bbfa"
        },
        {
          code: 142,
          description: "顺转一",
          sopId: 49,
          plcRusltAddr: "DB111",
          sort: 2,
          createBy: "dea72145-1ff2-42de-ae94-6d936a74ba5c",
          createTime: "2020-01-09 09:22:55",
          id: "f1a5cac88bf04a65bc492e9da9cf17ae"
        },
        {
          code: 143,
          description: "顺转二",
          sopId: 49,
          plcRusltAddr: null,
          sort: 3,
          createBy: null,
          createTime: "2020-01-09 09:19:39",
          id: "df7d3faa902442d3b7682f7bb080dc32"
        },
        {
          code: 144,
          description: "顺转三",
          sopId: 49,
          plcRusltAddr: null,
          sort: 4,
          createBy: null,
          createTime: "2020-01-09 09:19:39",
          id: "d54e9fca525a48759ff37e6f9d961c10"
        },
        {
          code: 145,
          description: "逆转一",
          sopId: 49,
          plcRusltAddr: null,
          sort: 5,
          createBy: null,
          createTime: "2020-01-09 09:19:39",
          id: "864484945a5d4cac86a6ea54a4b1bcac"
        },
        {
          code: 146,
          description: "逆转二",
          sopId: 49,
          plcRusltAddr: null,
          sort: 6,
          createBy: null,
          createTime: "2020-01-09 09:19:39",
          id: "a717d7da34e4410095ace5478c620a54"
        },
        {
          code: 147,
          description: "逆转三",
          sopId: 49,
          plcRusltAddr: null,
          sort: 7,
          createBy: null,
          createTime: "2020-01-09 09:19:39",
          id: "2f42356f21004f709a0a27a53a19549c"
        },
        {
          code: 148,
          description: "后置工序",
          sopId: 49,
          plcRusltAddr: null,
          sort: 8,
          createBy: null,
          createTime: "2020-01-09 09:19:39",
          id: "da27f33181f94aae921c53612b462cbf"
        }
      ],
      id: 49,
      sop: "test_",
      sopDescription: "test_12",
      qc: 1,
      status: 1
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
          plcRusltAddr: "",
          sort: 7,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-08 10:28:40",
          id: "7b5de8d23689484c9b9a97527d8879dc"
        }
      ],
      id: 2,
      sop: "JS-9-1.146",
      sopDescription: "S型-M型-Q型接地高压噪音",
      qc: 2,
      status: 1
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
      sop: "JS-9-1.224",
      sopDescription: "DV55B型高压接地噪音测试",
      qc: 2,
      status: 1
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
      sop: "JS-9-1.229",
      sopDescription: "DM35SL晾衣架新结构电机（230V）接地高压噪音测试",
      qc: 2,
      status: 1
    },
    {
      items: [
        {
          code: 241,
          description: "测霍尔",
          sopId: 27,
          plcRusltAddr: "DB42.DBW184",
          sort: 1,
          createBy: "1001",
          createTime: "2020-01-02 14:49:25",
          id: "d82ddacde8f642ebac30db3d3288f300"
        },
        {
          code: 242,
          description: "低压测试",
          sopId: 27,
          plcRusltAddr: "DB42.DBW94",
          sort: 2,
          createBy: "1001",
          createTime: "2020-01-02 14:49:36",
          id: "918a8d2fcf91443fb6a72469e97e17d0"
        },
        {
          code: 243,
          description: "顺转噪音",
          sopId: 27,
          plcRusltAddr: "DB42.DBW96",
          sort: 3,
          createBy: "1001",
          createTime: "2020-01-02 14:49:47",
          id: "62c086d83861456ba046357f134befba"
        },
        {
          code: 244,
          description: "逆转噪音",
          sopId: 27,
          plcRusltAddr: "DB42.DBW102",
          sort: 4,
          createBy: "1001",
          createTime: "2020-01-02 14:50:34",
          id: "e07fc5c627b645f5ba3a48671ee0a180"
        },
        {
          code: 245,
          description: "交耐测试",
          sopId: 27,
          plcRusltAddr: "DB42.DBW98",
          sort: 5,
          createBy: "1001",
          createTime: "2020-01-02 14:51:17",
          id: "95e50d48ccc545e4a5d2eae4bff2e2c0"
        }
      ],
      id: 27,
      sop: "JS-9-1.249",
      sopDescription: "BFBW型电机接地高压噪音测试",
      qc: 2,
      status: 1
    },
    {
      items: [
        {
          code: 241,
          description: "低压测试",
          sopId: 46,
          plcRusltAddr: "DB42.DBW94",
          sort: 1,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-07 09:19:07",
          id: "5cf9b092c63148278256bbeb2b5d6349"
        },
        {
          code: 242,
          description: "顺转噪音",
          sopId: 46,
          plcRusltAddr: "DB42.DBW96",
          sort: 2,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-07 09:19:25",
          id: "4b622672bb0c4dd59a80e1e62f1cf2b0"
        },
        {
          code: 243,
          description: "逆转噪音",
          sopId: 46,
          plcRusltAddr: "DB42.DBW102",
          sort: 3,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-07 09:20:26",
          id: "0950d5005b4943c883fb835c43e087ed"
        },
        {
          code: 244,
          description: "顺转空载分贝",
          sopId: 46,
          plcRusltAddr: "DB42.DBW104",
          sort: 4,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-07 09:21:03",
          id: "ff29cb6ac4e04853b2c84d370f7351d5"
        },
        {
          code: 245,
          description: "逆转空载分贝",
          sopId: 46,
          plcRusltAddr: "DB42.DBW106",
          sort: 5,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-07 09:22:14",
          id: "9b6f5b13f4bf496c9f3556d6bb440a5d"
        },
        {
          code: 246,
          description: "交耐测试",
          sopId: 46,
          plcRusltAddr: "DB42.DBW98",
          sort: 6,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-07 09:23:07",
          id: "50bf612881a94d34bc8b3c46366f255f"
        },
        {
          code: 247,
          description: "接地测试",
          sopId: 46,
          plcRusltAddr: "DB42.DBW100",
          sort: 7,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-07 09:23:37",
          id: "530a35dd038544038d417687ec256f56"
        }
      ],
      id: 46,
      sop: "JS-9-1.272",
      sopDescription: "B型电机接地高压噪音测试",
      qc: 2,
      status: 1
    },
    {
      items: [
        {
          code: 247,
          description: "测外接开关",
          sopId: 33,
          plcRusltAddr: "DB42.DBW178",
          sort: 1,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:40:12",
          id: "55b5976f05ce4419ab4f9adaa6982426"
        },
        {
          code: 241,
          description: "低压测试",
          sopId: 33,
          plcRusltAddr: "DB42.DBW94",
          sort: 2,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:40:24",
          id: "508bb74c3e944294b92cb2bd5d792bf5"
        },
        {
          code: 242,
          description: "顺转噪音",
          sopId: 33,
          plcRusltAddr: "DB42.DBW96",
          sort: 3,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:41:21",
          id: "cd9b3baaa291417d863c2566dfcb9c98"
        },
        {
          code: 243,
          description: "逆转噪音",
          sopId: 33,
          plcRusltAddr: "DB42.DBW102",
          sort: 4,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:42:10",
          id: "1601241802914804aef0ceb402f24564"
        },
        {
          code: 248,
          description: "遇阻测试",
          sopId: 33,
          plcRusltAddr: "DB42.DBW176",
          sort: 5,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:42:19",
          id: "eaae54486aea477b82af48bf8795e13c"
        },
        {
          code: 249,
          description: "交耐测试",
          sopId: 33,
          plcRusltAddr: "DB42.DBW98",
          sort: 6,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:42:41",
          id: "616df0285d4a419985d922b2c568f42d"
        },
        {
          code: 245,
          description: "接地测试",
          sopId: 33,
          plcRusltAddr: "DB42.DBW100",
          sort: 7,
          createBy: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
          createTime: "2020-01-03 10:42:57",
          id: "2f97db75d008450ebfb2ac02f0e7523e"
        }
      ],
      id: 33,
      sop: "JS-9-1.485",
      sopDescription: "BM型电机接地高压噪音测试",
      qc: 2,
      status: 1
    },
    {
      items: [
        {
          code: 241,
          description: "低压测试",
          sopId: 17,
          plcRusltAddr: null,
          sort: 1,
          createBy: null,
          createTime: "2019-12-25 17:14:04",
          id: "f88cac0013d84c1f97f7baa5958ec649"
        },
        {
          code: 242,
          description: "顺转噪音",
          sopId: 17,
          plcRusltAddr: null,
          sort: 2,
          createBy: null,
          createTime: "2019-12-25 17:14:04",
          id: "fe47e8da6bd7457695ad30714639cb6c"
        },
        {
          code: 243,
          description: "逆转噪音",
          sopId: 17,
          plcRusltAddr: null,
          sort: 3,
          createBy: null,
          createTime: "2019-12-25 17:14:04",
          id: "7def18245a48404c9bd7c99976361095"
        },
        {
          code: 244,
          description: "交耐测试",
          sopId: 17,
          plcRusltAddr: null,
          sort: 4,
          createBy: null,
          createTime: "2019-12-25 17:14:04",
          id: "095f6777f85d46deb2e4c25f492fde77"
        },
        {
          code: 245,
          description: "接地测试",
          sopId: 17,
          plcRusltAddr: null,
          sort: 5,
          createBy: null,
          createTime: "2019-12-25 17:14:04",
          id: "5362623125da4417bed76ab760890089"
        }
      ],
      id: 17,
      sop: "JS-9-1.53",
      sopDescription: "FTS系列接地噪音高压测试",
      qc: 2,
      status: 1
    },
    {
      items: [
        {
          code: 241,
          description: "前置工序",
          sopId: 29,
          plcRusltAddr: "DB42.DBW108",
          sort: 1,
          createBy: "1001",
          createTime: "2020-01-02 15:52:15",
          id: "bb3c79e2e2c64afea3ab4ceff83703da"
        },
        {
          code: 242,
          description: "低压测试",
          sopId: 29,
          plcRusltAddr: "DB42.DBW94",
          sort: 2,
          createBy: "1001",
          createTime: "2020-01-02 15:52:27",
          id: "9b4a99fe349342b5b3109e74735a6527"
        },
        {
          code: 243,
          description: "顺转噪音",
          sopId: 29,
          plcRusltAddr: "DB42.DBW96",
          sort: 3,
          createBy: "1001",
          createTime: "2020-01-02 15:52:39",
          id: "70ba81459899496e8e93c03c9d2f05fd"
        },
        {
          code: 244,
          description: "逆转噪音",
          sopId: 29,
          plcRusltAddr: "DB42.DBW102",
          sort: 4,
          createBy: "1001",
          createTime: "2020-01-02 15:53:31",
          id: "734b493034c5414f9b73991defed2eb5"
        },
        {
          code: 245,
          description: "交耐测试",
          sopId: 29,
          plcRusltAddr: "DB42.DBW98",
          sort: 5,
          createBy: "1001",
          createTime: "2020-01-02 15:54:29",
          id: "1074866d9dfa4f64ab9edb572a6519d7"
        },
        {
          code: 246,
          description: "接地测试",
          sopId: 29,
          plcRusltAddr: "DB42.DBW100",
          sort: 6,
          createBy: "1001",
          createTime: "2020-01-02 15:54:43",
          id: "650736ea99454d0093aabe43b6a89c24"
        }
      ],
      id: 29,
      sop: "JS-9-1.589",
      sopDescription: "BJ型电机接地高压噪音测试",
      qc: 2,
      status: 1
    },
    {
      items: [
        {
          code: 246,
          description: "前置工序",
          sopId: 23,
          plcRusltAddr: "DB42.DBW108",
          sort: 1,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:56:22",
          id: "fbbc8ae8b1d24777a6e5677828c7dae6"
        },
        {
          code: 241,
          description: "低压测试",
          sopId: 23,
          plcRusltAddr: "DB42.DBW94",
          sort: 2,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:56:35",
          id: "c649ca8b093b4c2fa1f4d41ae252070e"
        },
        {
          code: 242,
          description: "顺转噪音",
          sopId: 23,
          plcRusltAddr: "DB42.DBW96",
          sort: 3,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:56:48",
          id: "03b0ffe286374f66bbda9d54c0f0364f"
        },
        {
          code: 243,
          description: "逆转噪音",
          sopId: 23,
          plcRusltAddr: "DB42.DBW102",
          sort: 4,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:58:02",
          id: "83c90f7afb334281984a55a53d82b641"
        },
        {
          code: 247,
          description: "交耐测试",
          sopId: 23,
          plcRusltAddr: "DB42.DBW98",
          sort: 5,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:58:46",
          id: "28961fb84658410c9320be2a45d83102"
        },
        {
          code: 245,
          description: "接地测试",
          sopId: 23,
          plcRusltAddr: "DB42.DBW100",
          sort: 6,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:59:12",
          id: "ea71ca9214a748858359e7667752e1ba"
        },
        {
          code: 248,
          description: "后置工序",
          sopId: 23,
          plcRusltAddr: "DB42.DBW110",
          sort: 7,
          createBy: "c5c0ecdd-f969-4300-a187-f80a6251b773",
          createTime: "2019-12-31 14:59:52",
          id: "73b4f05cdfb14cff9212dedaa46c1309"
        }
      ],
      id: 23,
      sop: "JS-9-1.655",
      sopDescription: "DM35EQL-J016电机接地高压噪音测试[GM582]1",
      qc: 2,
      status: 1
    },
    {
      items: [
        {
          code: 241,
          description: "低压测试",
          sopId: 50,
          plcRusltAddr: null,
          sort: 1,
          createBy: null,
          createTime: "2020-01-09 09:20:48",
          id: "604b299b0c314855868aa2b89d54fafe"
        },
        {
          code: 242,
          description: "顺转噪音",
          sopId: 50,
          plcRusltAddr: "DB111",
          sort: 2,
          createBy: "dea72145-1ff2-42de-ae94-6d936a74ba5c",
          createTime: "2020-01-09 09:24:18",
          id: "1c82b2136d804f8895f48e0a7f8aab21"
        },
        {
          code: 243,
          description: "逆转噪音",
          sopId: 50,
          plcRusltAddr: null,
          sort: 3,
          createBy: null,
          createTime: "2020-01-09 09:20:48",
          id: "80fc212d89584ec6b689b9bcbff824e6"
        },
        {
          code: 244,
          description: "交耐测试",
          sopId: 50,
          plcRusltAddr: null,
          sort: 4,
          createBy: null,
          createTime: "2020-01-09 09:20:48",
          id: "0b0ab3c28ee44f9d8ac8c165a37b464f"
        },
        {
          code: 245,
          description: "接地测试",
          sopId: 50,
          plcRusltAddr: null,
          sort: 5,
          createBy: null,
          createTime: "2020-01-09 09:20:48",
          id: "2e70c1e0f9fb4a33bf2340b43ed3687f"
        }
      ],
      id: 50,
      sop: "test_13",
      sopDescription: "test_13",
      qc: 2,
      status: 1
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
