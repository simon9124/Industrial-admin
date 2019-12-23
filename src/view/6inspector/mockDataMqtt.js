/*
  mqtt原始格式
*/

// 车间驾驶舱
const controlShopData = {
  LineWorkingTimeWarning: [
    {
      IsWarning: true,
      LineNo: 22,
      AverageCount: 18,
      WarningCount: 162,
      WarningWeight: 3,
      WorkInfo: [
        {
          StartTime: "09:00:00",
          EndTime: "09:30:00",
          CompleteCount: 0
        },
        {
          StartTime: "09:30:00",
          EndTime: "10:00:00",
          CompleteCount: 0
        },
        {
          StartTime: "10:00:00",
          EndTime: "10:30:00",
          CompleteCount: 0
        },
        {
          StartTime: "10:30:00",
          EndTime: "11:00:00",
          CompleteCount: 0
        },
        {
          StartTime: "11:00:00",
          EndTime: "11:30:00",
          CompleteCount: 0
        },
        {
          StartTime: "13:00:00",
          EndTime: "13:30:00",
          CompleteCount: 0
        },
        {
          StartTime: "13:30:00",
          EndTime: "14:00:00",
          CompleteCount: 0
        },
        {
          StartTime: "14:00:00",
          EndTime: "14:30:00",
          CompleteCount: 0
        },
        {
          StartTime: "14:30:00",
          EndTime: "15:00:00",
          CompleteCount: 0
        }
      ]
    }
  ],
  ProductClassOverview: [
    {
      ProductClass: "DR型电机",
      TaskCount: 270,
      QualifiedCount: 0,
      CompletedRate: 0
    }
  ],
  ProductClassTask: [
    {
      TaskCount: 270,
      ProductClass: "DR型电机"
    }
  ],
  LineStatuOverview: {
    WaringCount: 1,
    NormalCount: 0,
    ShutCount: 59
  },
  LineOverviewReport: [
    {
      TaskCount: 270,
      QualifiedCount: 0,
      CompletedRate: 0,
      CheckCount: 0,
      QualifiedRate: 0,
      IsWarning: true,
      LineNo: 22,
      ProductClass: "DR型电机"
    }
  ]
};

// 产线驾驶舱
const controlLineData = {
  LineRateOverview: {
    Qc1CompleteRate: 0.93, // 达成率
    Qc2CompleteRate: 0.935,
    Qc3CompleteRate: 0,
    Qc1QualifiedRate: 1,
    Qc2QualifiedRate: 1,
    Qc3QualifiedRate: 0, // 良品率
    Qc1Qualified: 186, // 良品数
    Qc2Qualified: 187,
    Qc3Qualified: 0,
    Qc1Sum: 186, // 检测数
    Qc2Sum: 187,
    Qc3Sum: 0,
    QcSum: 200, // 总检测数
    QcQualified: 180, // 总良品数
    QcCompleteRate: 0.7, // 总达成率
    QcQualifiedRate: 1, // 总良品率
    Task: 0, // 总任务量
    LineNo: 22,
    ProductClass: null
  },
  LineRateDetail: [
    {
      Qc1CompleteRate: 1, // 达成率
      Qc2CompleteRate: 1,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 1, // 良品率
      Qc2QualifiedRate: 1,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0, // 任务达标率
      StartTime: "09:00:00",
      EndTime: "09:30:00"
    },
    {
      Qc1CompleteRate: 1,
      Qc2CompleteRate: 1,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 1,
      Qc2QualifiedRate: 1,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0,
      StartTime: "09:30:00",
      EndTime: "10:00:00"
    },
    {
      Qc1CompleteRate: 1,
      Qc2CompleteRate: 1,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 1,
      Qc2QualifiedRate: 1,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0,
      StartTime: "10:00:00",
      EndTime: "10:30:00"
    },
    {
      Qc1CompleteRate: 1,
      Qc2CompleteRate: 1,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 1,
      Qc2QualifiedRate: 1,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0,
      StartTime: "10:30:00",
      EndTime: "11:00:00"
    },
    {
      Qc1CompleteRate: 1,
      Qc2CompleteRate: 1,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 1,
      Qc2QualifiedRate: 1,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0,
      StartTime: "11:00:00",
      EndTime: "11:30:00"
    },
    {
      Qc1CompleteRate: 1,
      Qc2CompleteRate: 1,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 1,
      Qc2QualifiedRate: 1,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0,
      StartTime: "11:30:00",
      EndTime: "12:00:00"
    },
    {
      Qc1CompleteRate: 1,
      Qc2CompleteRate: 1,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 1,
      Qc2QualifiedRate: 1,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0,
      StartTime: "12:00:00",
      EndTime: "12:30:00"
    },
    {
      Qc1CompleteRate: 1,
      Qc2CompleteRate: 1,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 1,
      Qc2QualifiedRate: 1,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0,
      StartTime: "12:30:00",
      EndTime: "13:00:00"
    },
    {
      Qc1CompleteRate: 1,
      Qc2CompleteRate: 1,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 1,
      Qc2QualifiedRate: 1,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0,
      StartTime: "13:00:00",
      EndTime: "13:30:00"
    },
    {
      Qc1CompleteRate: 1,
      Qc2CompleteRate: 1,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 1,
      Qc2QualifiedRate: 1,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0,
      StartTime: "13:30:00",
      EndTime: "14:00:00"
    },
    {
      Qc1CompleteRate: 1,
      Qc2CompleteRate: 1,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 1,
      Qc2QualifiedRate: 1,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0,
      StartTime: "14:00:00",
      EndTime: "14:30:00"
    },
    {
      Qc1CompleteRate: 1,
      Qc2CompleteRate: 1,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 1,
      Qc2QualifiedRate: 1,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0,
      StartTime: "14:30:00",
      EndTime: "15:00:00"
    },
    {
      Qc1CompleteRate: 0.4,
      Qc2CompleteRate: 0.4667,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 1,
      Qc2QualifiedRate: 1,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0,
      StartTime: "15:00:00",
      EndTime: "15:30:00"
    },
    {
      Qc1CompleteRate: 0,
      Qc2CompleteRate: 0,
      Qc3CompleteRate: 0,
      Qc1QualifiedRate: 0,
      Qc2QualifiedRate: 0,
      Qc3QualifiedRate: 0,
      QualifiedRateTask: 0,
      CompleteRateTask: 0,
      StartTime: "15:30:00",
      EndTime: "16:00:00"
    }
  ],
  Qc1UnqualifiedReason: [
    {
      Key: "砝码拉不动",
      Value: 9
    },
    {
      Key: "刹车打滑",
      Value: 3
    },
    {
      Key: "行程不够",
      Value: 17
    },
    {
      Key: null,
      Value: 1
    }
  ],
  Qc2UnqualifiedReason: [
    {
      Key: "分贝过高",
      Value: 10
    },
    {
      Key: "热保护不到4分钟",
      Value: 13
    },
    {
      Key: "低电压不吸合",
      Value: 2
    },
    {
      Key: null,
      Value: 5
    }
  ],
  Qc3UnqualifiedReason: [
    {
      Key: "外观不良",
      Value: 10
    },
    {
      Key: "未检测",
      Value: 430
    },
    {
      Key: null,
      Value: 58
    }
  ]
};

export { controlShopData, controlLineData };
