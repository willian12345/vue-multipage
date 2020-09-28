<template>
  <div class="video-cnt">
    <div id="id_test_video" style="width:100%; height:auto;"></div>
    <div class="video-btn" v-if="!isPlay" @click="playHandle"></div>
  </div>
</template>
<script>
  import { onBridgeReady } from '@assets/js/weixin/weixin'
  export default {
    name: 'player',
    data () {
      return {
        player: null,
        isPlay: false
      }
    },
    methods: {
      playHandle(){
        this.player.play()
      }
    },
    mounted () {
      const w = window.screen.width
      const h = w * 0.6666
      this.player = new TcPlayer('id_test_video', {
        "m3u8": "//player.alicdn.com/video/aliyunmedia.mp4",
        "autoplay" : false, 
        "poster" : "https://h5.omwchat.com/img/index.35adda51.jpg",
        "width" :  w, 
        "height" : h,
        listener: msg => {
          if(msg.type === 'playing'){
            this.isPlay = true
          }else if(msg.type === 'pause'){
            this.isPlay = false
          }
        }
      })
      console.log(this.player)
    }
  }
</script>
<style lang="scss">
  .video-cnt{
    position: relative;
    .video-btn{
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -30px;
      margin-top: -30px;
      width: 60px;
      height: 60px;
      border: 2px solid white;
      border-radius: 100%;
      background: rgba(white, .4);
    }
  }
</style>
