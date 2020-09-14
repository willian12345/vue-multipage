<template>
  <div class="wrap">
    <swiper 
      ref="mySwiper" 
      :options="swiperOptions" >
      <swiper-slide class="slide-cnt">
        <h1 
          class="ani" 
          swiper-animate-effect="fadeInUp" 
          swiper-animate-duration="0.4s" 
          swiper-animate-delay="0.3s">行车模式</h1>
        <h2 
          class="ani" 
          swiper-animate-effect="zoomIn" 
          swiper-animate-duration="0.4s" 
          swiper-animate-delay="0.4s">
          智能语音 一触即发
        </h2>
      </swiper-slide>
      <swiper-slide class="slide-cnt">
        <h1
          class="ani" 
          swiper-animate-effect="fadeInUp" 
          swiper-animate-duration="0.4s" 
          swiper-animate-delay="0.1s">附近热聊</h1>
        <h2
          class="ani" 
          swiper-animate-effect="fadeInUp" 
          swiper-animate-duration="0.4s" 
          swiper-animate-delay="0.2s">全城车友 一聊就有</h2>
      </swiper-slide>
      <swiper-slide class="slide-cnt">
        <h1
          class="ani" 
          swiper-animate-effect="fadeInUp" 
          swiper-animate-duration="0.3s" 
          swiper-animate-delay="0.1s">互动直播</h1>
        <h2
          class="ani" 
          swiper-animate-effect="fadeInUp" 
          swiper-animate-duration="0.4s" 
          swiper-animate-delay="0.2s">主播互动 一键抽奖</h2>
      </swiper-slide>
      <swiper-slide class="slide-cnt">
        <h1
          class="ani" 
          swiper-animate-effect="fadeInUp" 
          swiper-animate-duration="0.3s" 
          swiper-animate-delay="0.1s">虚拟陪伴</h1>
        <h2
          class="ani" 
          swiper-animate-effect="fadeInUp" 
          swiper-animate-duration="0.4s" 
          swiper-animate-delay="0.2s">美好声音 一路陪伴</h2>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        init: false,
        on: {
          init: () => {
            swiperAnimateCache(this.swiper); //隐藏动画元素 
            swiperAnimate(this.swiper); //初始化完成开始动画
          },
          slideChangeTransitionEnd: () => { 
            swiperAnimate(this.swiper); //每个slide切换结束时也运行当前slide动画
          } 
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.swiper.init()
    })
  },
};

</script>

<style lang="scss">
  body,html{
    background: white;
  }
  .wrap{
    margin: 0 auto;
    max-width: 750px;
    width: 100vw;
    height: 100vh;
  }
  .slide-cnt{
    position: relative;
    text-align: center;
    padding-top: 114px;
    box-sizing: border-box;
  }
  h1{
    padding-bottom: 14px;
    font-size: 64px;
    font-weight: 600;
    color:#333;
    line-height: 90px;
  }
  h2{
    padding-bottom: 102px;
    font-size: 44px;
    font-weight: 500;
    line-height: 60px;
    color: #ACACAC;
  }

</style>