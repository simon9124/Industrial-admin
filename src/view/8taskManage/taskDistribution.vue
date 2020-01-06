<template>
  <div class="dooya-container">
    <Card>
      <Row :gutter="20">
        <!-- 派发form -->
        <Col :xl="7"
             :sm="17"
             :xs="17">
        <Form ref="formData"
              :model="formData"
              :rules="formRule"
              :label-width="80">
          <FormItem label="工作时间"
                    prop="workTime">
            <TimePicker v-model="formData.workTimeStorage"
                        :disabled="distributed"
                        format="HH:mm"
                        type="timerange"
                        :steps="[1, 30]"
                        placement="bottom-end"
                        placeholder="请选择"
                        style="width:100%"
                        @on-change="timeOnChange"
                        @on-clear="timeClear"></TimePicker>
          </FormItem>
          <FormItem label="型号"
                    prop="productClass">
            <Input v-model.trim="formData.productClass"
                   :disabled="distributed"
                   placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="数量"
                    prop="taskCount">
            <Input v-model.trim="formData.taskCount"
                   :disabled="distributed"
                   placeholder="请输入"
                   type="number"
                   class="input-number"
                   @on-keypress="taskCountOnPress"
                   @on-keyup="taskCountOnUp"></Input>
          </FormItem>
          <FormItem label="综合检测"
                    prop="qc1SopId">
            <Cascader v-model="formData.qc1Select"
                      :data="qc1List"
                      :disabled="distributed"
                      trigger="hover"
                      style="width:100%"
                      placeholder="综合测试的SOP"
                      @on-change="selectOnChangeQC1">
            </Cascader>
          </FormItem>
          <FormItem label="静音检测"
                    prop="qc2SopId">
            <Cascader v-model="formData.qc2Select"
                      :data="qc2List"
                      :disabled="distributed"
                      trigger="hover"
                      style="width:100%"
                      placeholder="静音检测的SOP"
                      @on-change="selectOnChangeQC2">
            </Cascader>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    :disabled="distributed"
                    @click="sopSubmit"
                    style="margin-right:10px">派发</Button>
            <Button type="error"
                    :disabled="!distributed"
                    @click="sopRemove">删除</Button>
          </FormItem>
        </Form>
        </Col>

        <!-- 派发结果 -->
        <Col :xl="3"
             :sm="7"
             :xs="7">
        <div>
          <div class="result"
               v-if="distributed">
            <Tag color="success">派发成功</Tag>
          </div>
          <!-- <div class="result"
               v-if="distributed">
            日期：{{formCopy.createTime.slice(0,10)}}
          </div> -->
          <div class="result"
               v-if="distributed">
            sn码：{{formCopy.sn}}
          </div>
          <div class="result"
               v-if="distributed">
            型号：{{ formCopy.productClass }}
          </div>
          <div class="result"
               v-if="distributed">
            数量：{{ formCopy.taskCount }}件
          </div>
          <div class="result"
               v-else>
            <Tag color="error">未派发任务</Tag>
          </div>
        </div>
        </Col>

        <!-- 任务列表 -->
        <Col :xl="14"
             :sm="24"
             :xs="24">
        <Row v-if="formData.workTime.length!==0 && todayTask.length!==0"
             class="task"
             :gutter="20"
             style="padding:0 10px">
          <!-- blocks -->
          <Col :span="12"
               v-for="(task, i) in todayTask"
               :key="i">
          <div class="task-block">
            <!-- 工作时间 -->
            <Col :span="10">
            <div class="task-block-time">
              {{ task.startTime }}-{{ task.endTime }}
            </div>
            <div>
              <Checkbox v-model="task.work"
                        :disabled="distributed">工作</Checkbox>
            </div>
            </Col>

            <!-- 工作量 -->
            <Col :span="6">
            <div class="task-block-task-title">
              <span v-if="distributed">
                任务量
              </span>
            </div>
            <div class="task-block-task-number">
              <span v-if="distributed"> {{ task.workTask }}件 </span>
            </div>
            </Col>

            <!-- 工作性质 -->
            <Col :span="8">
            <Tag size="large"
                 style="margin-top:15px"
                 :color="task.work ? 'primary' : 'success'">{{ task.work ? '工作时间' : '休息时间' }}</Tag>
            </Col>
          </div>
          </Col>
        </Row>
        </Col>
      </Row>

      <Spin size="large"
            fix
            v-if="spinShow">
      </Spin>

    </Card>
  </div>
</template>

<script>
// mockData
import { qc1ListMock, qc2ListMock } from "./mockData";
// function
import { formatDate } from "@/libs/getDate"; // 格式化时间
import { params } from "@/libs/params"; // 获取localStorage里的数据
// api
import {
  getSopTagFilteByEquipment, // 获取可使用的SOP级联选择
  setProductLineSnBySop, // 任务派发
  getLineSn, // 获取任务信息
  removeTask // 删除任务
} from "@/api/process";

export default {
  data() {
    return {
      /* 页面全局 */
      qc1List: [], // 级联选择器：qc1、qc2
      qc2List: [], // 级联选择器：qc1、qc2
      snCodeList: [], // SOP组合list
      /* 今日任务 */
      formData: {
        workTime: [],
        workTimeStorage: [],
        productClass: "",
        taskCount: "",
        qc1Select: [],
        qc2Select: [],
        qc1SopId: "",
        qc1SopTagId: "",
        qc2SopId: "",
        qc2SopTagId: "",
        rest: []
      }, // 左侧 - 派发表单
      formCopy: {}, // 中部 - 派发成功显示的内容
      todayTask: [], // 右侧 - 分时列表
      formRule: {
        workTime: [
          { required: true, message: "请选择工作时间", trigger: "change" }
        ],
        productClass: [
          { required: true, message: "型号不能为空", trigger: "change" },
          { type: "string", max: 20, message: "型号过长", trigger: "change" }
        ],
        taskCount: [
          { required: true, message: "数量不能为空", trigger: "change" },
          { type: "string", max: 4, message: "数量过多", trigger: "change" }
        ],
        qc1SopId: [
          { required: true, message: "请选择SOP1", trigger: "change" }
        ],
        qc2SopId: [{ required: true, message: "请选择SOP2", trigger: "change" }]
      }, // 派发表单规则
      distributed: false, // 是否已派发任务
      processId: "", // 已派发任务的id
      /* loading */
      spinShow: false
    };
  },
  async created() {
    this.getData();
    // 分别获取qc1、qc2的级联选择
    this.qc1List = !this.isMock
      ? (await getSopTagFilteByEquipment("", "", "1")).data.data || []
      : qc1ListMock;
    this.qc2List = !this.isMock
      ? (await getSopTagFilteByEquipment("", "", "2")).data.data || []
      : qc2ListMock;
  },
  methods: {
    async getData() {
      this.spinShow = true;
      if (!this.isMock) {
        /* 接口数据：根据任务id，判断是否已派发任务 */
        const result = await getLineSn();
        this.distributed = result.data.data !== null;
        if (this.distributed) {
          // 如果派发过任务且派发成功 -> 接口里调数据
          this.processId = result.data.data.id;
          this.formCopy = result.data.data;
          this.formData = {
            workTimeStorage: [this.formCopy.startTime, this.formCopy.endTime],
            productClass: this.formCopy.productClass,
            taskCount: this.formCopy.taskCount.toString(),
            qc1Select: [
              this.formCopy.qc1SopId.toString(),
              this.formCopy.qc1SopTagId
            ],
            qc2Select: [
              this.formCopy.qc2SopId.toString(),
              this.formCopy.qc2SopTagId
            ]
          };
          // 自动显示任务列表
          this.timeOnChange(this.formData.workTimeStorage);
          this.todayTask.forEach((time, i) => {
            this.$set(time, "workTask", result.data.data.workingTimeTask[i]);
            this.$set(time, "work", result.data.data.workingTimeTask[i] !== 0);
          });
        } else {
          // 如果派发过任务却没有派发成功 -> 从缓存里找数据
          if (localStorage.getItem("taskDistribution") !== null) {
            this.formData = JSON.parse(params(this, "taskDistribution"));
          }
          if (localStorage.getItem("todayTask") !== null) {
            this.todayTask = JSON.parse(params(this, "todayTask"));
          }
          // 自动显示任务列表
          this.timeOnChange(this.formData.workTimeStorage);
        }
      } else {
        /* mock数据：根据缓存里的distributed，判断是否已派发任务 */
        // 如果派发过任务 -> 无论成功与否，都从缓存里找数据
        if (localStorage.getItem("taskDistribution") !== null) {
          this.formData = JSON.parse(params(this, "taskDistribution"));
        }
        if (localStorage.getItem("todayTask") !== null) {
          this.todayTask = JSON.parse(params(this, "todayTask"));
        }
        // 自动显示任务列表
        this.timeOnChange(this.formData.workTimeStorage);
        // 判断是否派发成功
        this.distributed = localStorage.getItem("distributed") === "true";
        // 模拟 creatTime 和 sn码
        this.formData.createTime = formatDate(new Date());
        this.formData.sn = 1001;
        this.formCopy = JSON.parse(JSON.stringify(this.formData));
      }
      this.spinShow = false;
    },
    // 级联选择器 - QC1选项发生变化
    async selectOnChangeQC1(value) {
      this.formData.qc1SopId = value[0] || "";
      this.formData.qc1SopTagId = value[1] || "";
      this.qc2List =
        (await getSopTagFilteByEquipment(this.formData.qc1SopTagId, "", "2"))
          .data.data || [];
    },
    // 级联选择器 - QC2选项发生变化
    async selectOnChangeQC2(value) {
      this.formData.qc2SopId = value[0] || "";
      this.formData.qc2SopTagId = value[1] || "";
      this.qc1List =
        (await getSopTagFilteByEquipment("", this.formData.qc2SopTagId, "1"))
          .data.data || [];
    },
    // 时间选择器 - 时间发生变化
    timeOnChange(time) {
      // console.log(time);

      /* 根据workTime，给表单传值 */
      this.formData.workTime = time[0] !== "" ? time.join(",") : "";

      /* 根据workTimeStorage，计算并回显当天的任务列表 */
      if (this.formData.workTimeStorage.length !== 0) {
        // 1.开始时间转成数字：30分记为0.5
        const start1 = parseInt(this.formData.workTimeStorage[0]);
        const start2 =
          this.formData.workTimeStorage[0].substring(3, 5) === "00" ? 0 : 0.5;
        const startTime = start1 + start2;
        // 2.结束时间转成数字：30分记为0.5
        const end1 = parseInt(this.formData.workTimeStorage[1]);
        const end2 =
          this.formData.workTimeStorage[1].substring(3, 5) === "00" ? 0 : 0.5;
        const endTime = end1 + end2;
        // 3.界面右侧回显当天任务列表
        this.todayTask = [];
        for (var i = startTime, j = 0; i < endTime; i += 0.5, j++) {
          this.todayTask.push({
            startTime:
              (startTime + j * 0.5) % 1 === 0
                ? parseInt(startTime + j * 0.5) + ":" + "00"
                : parseInt(startTime + j * 0.5) + ":" + "30",
            endTime:
              (startTime + j * 0.5 + 0.5) % 1 === 0
                ? parseInt(startTime + j * 0.5 + 0.5) + ":" + "00"
                : parseInt(startTime + j * 0.5 + 0.5) + ":" + "30",
            work: true
          });
        }
      }
    },
    // 时间选择器 - 时间被清空
    timeClear() {
      this.formData.workTimeStorage = [];
    },
    // 数量校验 - 禁止输入e和E和-和.
    taskCountOnPress(event) {
      if (
        event.key === "e" ||
        event.key === "E" ||
        event.key === "." ||
        event.key === "-"
      ) {
        event.preventDefault();
      }
    },
    // 数量校验 - 去掉0开头
    taskCountOnUp(event) {
      if (event.srcElement.value.slice(0, 1) === "0" && event.key === "0") {
        event.srcElement.value = parseInt(event.srcElement.value);
      }
    },
    // snCode选择发生变化
    snCodeOnChange(value) {
      // console.log(value);
      if (value !== undefined) {
        this.formData.qc1SopTagId = value.split(",")[0];
        this.formData.qc2SopTagId = value.split(",")[1];
      }
    },
    // 按钮 - 派发
    async sopSubmit() {
      // console.log(this.formData);
      this.$refs.formData.validate(async valid => {
        if (valid) {
          /* 1.整合submitForm表单 */
          const submitForm = JSON.parse(JSON.stringify(this.formData));
          submitForm.startTime =
            formatDate(new Date()) + " " + this.formData.workTime.split(",")[0];
          submitForm.endTime =
            formatDate(new Date()) + " " + this.formData.workTime.split(",")[1];
          const rest = [];
          this.todayTask.forEach((time, i) => {
            if (!time.work) {
              rest.push(i + 1);
            }
          });
          submitForm.rest = rest;

          /* 2.派发任务 */
          this.spinShow = true;
          // 放入缓存：已填写的表单
          localStorage.setItem(
            "taskDistribution",
            JSON.stringify(this.formData)
          );

          /* 3.判断回文 */
          if (!this.isMock) {
            /* 接口数据 */
            const result = await setProductLineSnBySop(submitForm);
            if (result.data.status === 200) {
              this.spinShow = true;
              this.$refs.formData.resetFields();
              this.$Message.success(`派发成功，SN码为${result.data.data.sn}`);

              // 派发任务id
              this.processId = result.data.data.id;

              // 放入缓存：工作量列表 & 是否已派发
              localStorage.setItem("todayTask", JSON.stringify(this.todayTask));

              this.getData();
            }
          } else {
            /* mock数据 */
            this.distributed = true;
            this.$refs.formData.resetFields();
            this.$Message.success("派发成功，SN码为1001");
            // 放入缓存：工作量列表 & 是否已派发
            localStorage.setItem("todayTask", JSON.stringify(this.todayTask));
            localStorage.setItem("distributed", this.distributed);
            this.getData();
          }

          this.spinShow = false;
        }
      });
    },
    // 按钮 - 删除
    async sopRemove() {
      this.$Modal.confirm({
        title: "确定删除该任务？",
        onOk: async () => {
          if (!this.isMock) {
            // 接口数据
            this.spinShow = true;
            const result = await removeTask(this.processId);
            if (result.data.status === 200) {
              this.$Message.success("删除成功");
              this.getData();
            } else {
              this.spinShow = false;
            }
          } else {
            // mock数据
            this.$Message.success("删除成功");
            this.distributed = false;
            localStorage.setItem("distributed", this.distributed);
            // this.getData();
          }
        },
        closable: true
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .ivu-card {
    .ivu-card-body {
      padding: 30px 10px 0 10px;
    }
    .ivu-form {
      margin-bottom: 30px;
      &-item:last-child {
        margin-bottom: 0;
      }
    }
    .result {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .task {
      box-sizing: border-box;
      &-block {
        min-height: 60px;
        border: 1px solid #e8eaec;
        padding: 0 10px;
        margin-bottom: 20px;
        &-time {
          font-size: 16px;
          font-weight: bold;
          height: 30px;
          line-height: 30px;
        }
        &-task {
          &-title {
            font-size: 14px;
            height: 30px;
            line-height: 32px;
          }
          &-number {
            font-size: 18px;
            height: 30px;
            line-height: 18px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
