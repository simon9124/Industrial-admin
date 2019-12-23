<template>
  <div class="banner">
    <!-- 切换的图片部分 -->
    <div class="bannerImg">
      <transition-group tag="div">
        <span v-for="(v,i) in banners"
              :key="v.key"
              :style="{display:(i+1)===n?'block':'none'}"
              class="active">
          <!-- :style="{opacity:(i+1)===n?'1':'0'}" -->
          <img :src="v.src"
               alt="">
          <!-- ![]('./src/assets/banner'+v) -->
        </span>
      </transition-group>
    </div>

    <!-- 切换的小按钮部分 -->
    <!-- <ul class="bannerBtn clear-fix">
      <li v-for="num in 3">
        <a href="javascript:;"
           :style="{background:num==n?'#ff7800':''}"
           @click='change(num)'
           class='aBtn'></a>
      </li>
    </ul> -->

    <Button icon="md-arrow-back"
            @click="backRouter">返回驾驶舱</Button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      // banners: ['1.jpg', '2.jpg', '3.jpg'],
      banners: [
        {
          key: 0,
          src: require("../../assets/images/zhanhui/1.jpg")
        },
        {
          key: 1,
          src: require("../../assets/images/zhanhui/2.jpg")
        },
        {
          key: 2,
          src: require("../../assets/images/zhanhui/3.jpg")
        },
        {
          key: 3,
          src: require("../../assets/images/zhanhui/4.jpg")
        },
        {
          key: 4,
          src: require("../../assets/images/zhanhui/5.jpg")
        },
        {
          key: 5,
          src: require("../../assets/images/zhanhui/6.jpg")
        },
        {
          key: 6,
          src: require("../../assets/images/zhanhui/7.jpg")
        },
        {
          key: 7,
          src: require("../../assets/images/zhanhui/8.jpg")
        },
        {
          key: 8,
          src: require("../../assets/images/zhanhui/9.jpg")
        },
        {
          key: 9,
          src: require("../../assets/images/zhanhui/10.jpg")
        },
        {
          key: 10,
          src: require("../../assets/images/zhanhui/11.jpg")
        },
        {
          key: 11,
          src: require("../../assets/images/zhanhui/12.jpg")
        },
        {
          key: 12,
          src: require("../../assets/images/zhanhui/13.jpg")
        },
        {
          key: 13,
          src: require("../../assets/images/zhanhui/14.jpg")
        },
        {
          key: 14,
          src: require("../../assets/images/zhanhui/15.jpg")
        },
        {
          key: 15,
          src: require("../../assets/images/zhanhui/16.jpg")
        },
        {
          key: 16,
          src: require("../../assets/images/zhanhui/17.jpg")
        },
        {
          key: 17,
          src: require("../../assets/images/zhanhui/18.jpg")
        },
        {
          key: 18,
          src: require("../../assets/images/zhanhui/19.jpg")
        }
      ],
      n: 1, // 图片的index。
      bFlag: true, // 锁定
      timer1: "", // 这是bFlag定时器的数据
      timer2: "", // 这是自动播放（next（））定时器的数据
      timer3: "" // 这是打开浏览器时，初始运动定时器的数据
    };
  },
  mounted () {
    this.timer3 = setTimeout(this.next, 300);
  },
  methods: {
    backRouter () {
      // this.$router.go(-1);
      this.$router.push({
        path: "/control",
        name: "control"
      });
    },
    next () {
      // 下一张
      // 为了避免连续点击。让bFlag运动结束后再变为true。
      if (this.bFlag) {
        this.bFlag = false;
        this.clearT(); // 运动之前，清除所有定时器。
        // 下一张，如果是第4张，就返回第一张。
        this.n = this.n + 1 === this.banners.length + 1 ? 1 : this.n + 1;
        // 调用timeout函数，延迟进入下一次轮播，以便可以点击切换。
        this.timeout();
      }
    },
    clearT () {
      // 清除所有定时器
      clearTimeout(this.timer1);
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
    },
    timeout () {
      // 运动结束后设置bFlag为true，并且3秒后调用next，进行下一次运动。
      // 运动时间是1s。
      this.timer2 = setTimeout(() => {
        this.bFlag = true;
      }, 300);
      this.timer1 = setTimeout(() => {
        this.next();
      }, 900);
    },
    change (num) {
      // 点击按钮，切换到对应图片，需要获取index。
      if (this.bFlag) {
        this.bFlag = false;
        this.clearT();
        this.n = num; // 将显示图片变为选中的那一张。
        this.timeout();
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.banner {
  position: relative;
  width: 100%;
  height: 100%;
}
.bannerImg {
  position: relative;
  // height: 360px;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.bannerImg span {
  position: absolute;
  top: 0;
  left: 0;
}
.bannerImg span.active {
  transition: all 1s;
  display: block;
  width: 100%;
  height: 100%;
}
.bannerImg span.active img {
  width: 100%;
  height: 100%;
}

.bannerBtn {
  width: 200px;
  position: absolute;
  left: 50%;
  margin-left: -100px;
  bottom: 22px;
  text-align: center;
}
.bannerBtn li {
  margin: 0 13px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  float: left;
  background: rgba(255, 255, 255, 0.4);
}
.bannerBtn li a {
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin: 3px;
}
.bannerBtn li a.aBtn {
  transition: all 0.6s ease;
}
.banner /deep/ {
  .ivu-btn {
    position: absolute;
    z-index: 100;
    // left: 120px;
    left: 20px;
    top: 5px;
    background-color: #747b8b;
    color: #ffffff;
    border-color: #e3e5e8;
    &:hover {
      background-color: #747b8b;
      color: #ffffff;
      border-color: #e3e5e8;
    }
  }
}
</style>
