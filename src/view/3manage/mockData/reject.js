// 异常原因列表
const rejectList = [
  {
    unqualified_item: [
      {
        unqualified_name: "刹车打滑",
        id: 1,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "砝码拉不动",
        id: 2,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "单转",
        id: 3,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "短路",
        id: 4,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "反转",
        id: 5,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "不转",
        id: 6,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "减速不良",
        id: 7,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "对码不良",
        id: 8,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "转速不良",
        id: 9,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "点动",
        id: 10,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "蜗杆紧/松",
        id: 11,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "蜗杆减不死",
        id: 12,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "通电自转",
        id: 13,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "蜗杆加不活",
        id: 14,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      },
      {
        unqualified_name: "芯片测试不良",
        id: 15,
        test_item_group_name: "综合检测",
        test_item_group_index: 1
      }
    ],
    test_item_group_name: "综合检测"
  },
  {
    unqualified_item: [
      {
        unqualified_name: "低电压不吸合",
        id: 16,
        test_item_group_name: "静音检测",
        test_item_group_index: 2
      },
      {
        unqualified_name: "热保护不到4分钟",
        id: 17,
        test_item_group_name: "静音检测",
        test_item_group_index: 2
      },
      {
        unqualified_name: "超分贝",
        id: 18,
        test_item_group_name: "静音检测",
        test_item_group_index: 2
      },
      {
        unqualified_name: "轴承响",
        id: 19,
        test_item_group_name: "静音检测",
        test_item_group_index: 2
      },
      {
        unqualified_name: "电机扫堂",
        id: 20,
        test_item_group_name: "静音检测",
        test_item_group_index: 2
      },
      {
        unqualified_name: "电机响",
        id: 21,
        test_item_group_name: "静音检测",
        test_item_group_index: 2
      },
      {
        unqualified_name: "杂音(减速异响）",
        id: 22,
        test_item_group_name: "静音检测",
        test_item_group_index: 2
      },
      {
        unqualified_name: "接地不过",
        id: 23,
        test_item_group_name: "静音检测",
        test_item_group_index: 2
      },
      {
        unqualified_name: "高压不过",
        id: 24,
        test_item_group_name: "静音检测",
        test_item_group_index: 2
      }
    ],
    test_item_group_name: "静音检测"
  },
  {
    unqualified_item: [
      {
        unqualified_name: "外管不良",
        id: 25,
        test_item_group_name: "外观检测",
        test_item_group_index: 3
      },
      {
        unqualified_name: "螺丝、销子不良",
        id: 26,
        test_item_group_name: "外观检测",
        test_item_group_index: 3
      },
      {
        unqualified_name: "排线不良",
        id: 27,
        test_item_group_name: "外观检测",
        test_item_group_index: 3
      },
      {
        unqualified_name: "电源线不良",
        id: 28,
        test_item_group_name: "外观检测",
        test_item_group_index: 3
      },
      {
        unqualified_name: "电子行程头不良",
        id: 29,
        test_item_group_name: "外观检测",
        test_item_group_index: 3
      },
      {
        unqualified_name: "内外端盖不良",
        id: 30,
        test_item_group_name: "外观检测",
        test_item_group_index: 3
      },
      {
        unqualified_name: "行程内齿套不良",
        id: 31,
        test_item_group_name: "外观检测",
        test_item_group_index: 3
      },
      {
        unqualified_name: "行程网印不良",
        id: 32,
        test_item_group_name: "外观检测",
        test_item_group_index: 3
      },
      {
        unqualified_name: "零件漏装、多装、错装",
        id: 33,
        test_item_group_name: "外观检测",
        test_item_group_index: 3
      },
      {
        unqualified_name: "前盖板方轴不良",
        id: 34,
        test_item_group_name: "外观检测",
        test_item_group_index: 3
      },
      {
        unqualified_name: "电源线、铜皮脱落、接地端子不良",
        id: 35,
        test_item_group_name: "外观检测",
        test_item_group_index: 3
      }
    ],
    test_item_group_name: "外观检测"
  }
];

export { rejectList };
