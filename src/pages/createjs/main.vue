<template>
  <div class="">
    <canvas id="canvasScene" :width="stageWidth" :height="stageHeight"></canvas>
    <button @click="play" class="btn">播放</button>
  </div>
</template>
<script>
import globalConfig from '@/assets/js/config'
import { getQueryString } from '@/assets/js/utils.js'
import { wxSetShare } from '@/assets/js/weixin/weixin'
import Json from './device.json'

export default {
  data() {
    return {
      stageWidth: 750,
      stageHeight: 400,
      loader: null
    }
  },
  methods: {
    play(){
      this.sprite.gotoAndPlay('run');
    },
    handleComplete(){
      const stage = new createjs.Stage("canvasScene")
      createjs.Touch.enable(stage)
      console.log(this.loader.getResult('device'))
      const frameRate = 24
      const spriteSheet = new createjs.SpriteSheet({
        framerate: frameRate,
        images: [this.loader.getResult('device')],
        frames: Json.frames,
        animations: {
          run: [0, 22, false]
        }
      });
      this.sprite = new createjs.Sprite(spriteSheet);
      stage.addChild(this.sprite)
      this.sprite.gotoAndPlay('run');
      this.sprite.addEventListener("click", ()=>{
        alert('被点击')
      });

      createjs.Ticker.timingMode = createjs.Ticker.RAF;
      createjs.Ticker.on("tick", tick);
      function tick(event){
        stage.update(event);
      };
    },
    loadRes(){
      const manifest = [
        {src: "/static/img/device.png", id: "device"}
      ];
      this.loader = new createjs.LoadQueue(false);
      this.loader.on("complete", this.handleComplete);
      this.loader.on('progress', function(e){
        const per = (e.progress*100 >>0) + '%';
        console.log('加载进度：' + per);
          
      });
      this.loader.loadManifest(manifest);
    }
  },
  mounted () {
    this.stageWidth = window.innerWidth
    this.stageHeight = 500
    this.loadRes()
  }
}
</script>
<style lang="scss">
  .btn{
    font-size: 48px;
    padding: 40px;
  }
  #canvasScene{
    background: red;
  }
</style>