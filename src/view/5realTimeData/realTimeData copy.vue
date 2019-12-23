<template>
  <div class="dooya-container">
    <Card>
      <Row :gutter="16">

        <!-- 走马灯1 -->
        <Col span="12">
        <img :src="carouselPic0"
             class="carousel-img">
        <!-- <el-carousel :interval="3000"
                     :initial-index="0"
                     :height="imgHeight"
                     indicator-position="none"
                     loop
                     arrow="never">
          <el-carousel-item ref="elCarouselItem"
                            v-for="item in carouselPics"
                            :key="item.key">
            <img :src="item.src"
                 class="carousel-img">
          </el-carousel-item>
        </el-carousel> -->
        </Col>

        <!-- 走马灯2 -->
        <Col span="12">
        <img :src="carouselPic1"
             class="carousel-img">
        <!-- <el-carousel :interval="3000"
                     :initial-index="1"
                     :height="imgHeight"
                     indicator-position="none"
                     loop
                     arrow="never">
          <el-carousel-item v-for="item in carouselPics"
                            :key="item.key">
            <img :src="item.src"
                 class="carousel-img">
          </el-carousel-item>
        </el-carousel> -->
        </Col>

        <Col span="12">

        </Col>

      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      carouselPics: [
        {
          key: 0,
          src: require("../../assets/images/1.jpg")
        },
        {
          key: 1,
          src: require("../../assets/images/2.jpg")
        },
        {
          key: 2,
          src: require("../../assets/images/3.jpg")
        },
        {
          key: 3,
          src: require("../../assets/images/4.jpg")
        }
      ],
      // 走马灯图片高度 - 动态
      imgHeight: "",
      carouselPic0: "",
      carouselPic1: ""
    };
  },
  mounted () {
    // 屏幕缩放时，走马灯动态高度
    // window.onresize = () => {
    //   this.imgHeight =
    //     document
    //       .getElementsByClassName('carousel-img')[0]
    //       .getBoundingClientRect().height + 'px';
    // };
  },
  created () {
    // 设置初始化跑马灯高度
    // this.$nextTick(() => {
    //   const imgWidth = document
    //     .getElementsByClassName('el-carousel')[0]
    //     .getBoundingClientRect().width;
    //   this.imgHeight = (imgWidth * 740) / 540 + 'px';
    // });

    // 图片直接切换
    this.togglePics(0);
    setInterval(() => {
      var i = 0;
      i++;
      this.togglePics(i);
    }, 3000);
  },
  methods: {
    togglePics (i) {
      this.carouselPic0 = this.carouselPics[i].src;
      this.carouselPic1 = this.carouselPics[i + 1].src;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  img {
    width: 100%;
  }
  .el-carousel {
    img {
      width: 100%;
    }
  }
}
</style>
