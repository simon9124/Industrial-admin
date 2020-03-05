<template>
  <div>
    <!-- 循环tabs -->
    <template v-for="(tag,index) in dynamicTags">
      <el-tag :key="tag.index"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
        <span ref="tagName"
              @click="tag.edit=true;tagEdit(index)">
          {{tag.tagName}}
        </span>
        <el-input v-show="tag.edit"
                  v-model="tagInput"
                  ref="tagInput"
                  @keyup.enter.native="tag.edit=false;tagEditSave(index)"
                  @blur="tag.edit=false;tagEditSave(index)"
                  class="el-tag-edit">
        </el-input>
      </el-tag>
    </template>

    <!-- 新增tab -->
    <div class="el-tag-add">
      <el-input class="input-new-tag"
                v-if="tagAddEdit"
                v-model="tagAddInput"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm">
      </el-input>
      <el-button v-else
                 type="success"
                 icon="el-icon-plus"
                 class="button-new-tag"
                 size="small"
                 @click="showInput">添加一列
      </el-button>
    </div>

    <!-- 提交 -->
    <el-button class="button-new-tag"
               type="warning"
               icon="el-icon-document"
               size="small"
               @click="handleHeaders()">提交表头
    </el-button>
  </div>

</template>

<script>
import Bus from "@/libs/bus.js";

export default {
  name: "tabs",
  data() {
    return {
      // 动态tabs
      dynamicTags: [
        { tagName: "操作类型", edit: false },
        { tagName: "业务名称", edit: false }
      ],
      // 原标签内容
      tagInput: "",
      // 新增标签编辑状态
      tagAddEdit: false,
      // 新增标签内容
      tagAddInput: ""
    };
  },
  created() {},
  methods: {
    handleClose(tag) {
      // 删除1个标签
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    tagEdit(index) {
      // 编辑标签时：①获取标签内容并绑定到input，②自动获取input焦点
      this.$nextTick(_ => {
        // console.log(this.$refs.tagName[index].innerText)
        const tagInput = this.$refs.tagName[index].innerText;
        this.tagInput = tagInput.replace(/\s*/g, "");
        this.$refs.tagInput[index].$refs.input.focus();
      });
    },
    tagEditSave(index) {
      // 保存编辑后的标签
      if (this.tagInput !== "") {
        this.dynamicTags[index].tagName = this.tagInput;
      } else {
        this.$message({
          message: "表头内容不能为空",
          type: "warning",
          duration: 5 * 1000
        });
      }
    },
    showInput() {
      // 激活新增标签的input
      this.tagAddEdit = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      // 保存新增的1个标签
      if (this.tagAddInput !== "") {
        this.dynamicTags.push({ tagName: this.tagAddInput, edit: false });
      }
      // 重置新增设定
      this.tagAddEdit = false;
      this.tagAddInput = "";
    },
    handleHeaders() {
      // 提交表头（数组格式）
      const headers = [];
      for (var tag of this.dynamicTags) {
        headers.push(tag.tagName);
      }
      // console.log(headers)
      Bus.$emit("handleHeaders", headers);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// @import "~@/styles/smart-ui/smart-ui.scss";

.el-tag {
  position: relative;
  height: 32px;
  line-height: 30px;
  &:not(:first-child) {
    margin-left: 10px;
  }
  &-edit {
    position: absolute;
    left: -1px;
    bottom: -1px;
    width: 105%;
    input {
      height: 34px;
      line-height: 33px;
    }
  }
  &-add {
    display: inline-block;
    margin-left: 10px;
    .button-new-tag {
      height: 32px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
    }
  }
}
</style>
