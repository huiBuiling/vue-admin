<template>
  <div class="ads-con">
    <!-- 网格线 -->
    <Grid />

    <!-- 组件显示 -->
    <div 
      class="ads-comp"
      v-for="(item, index) in screenComp" 
      :key="item.id + '-' + index"
      :style="{...item.style, left: left + 'px', top: top + 'px'}"
      @mousedown="onMouseDown" 
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
    >
      <el-button 
        v-if="item.label === 'btn'"
      >操作按钮{{item.text}}</el-button>
      <img 
        style="width:80px; height: 100px"
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2620306848,1106594030&fm=26&gp=0.jpg" 
        v-if="item.label === 'image'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Grid from './Grid.vue'
/**
 * 画布-center
 */
@Component({
  name: 'screenCon',
  components: {
    Grid
  }
})
export default class ScreenCon extends Vue {
  @Prop() private screenComp!: any[];
  // @Emit ('onDragover')
  // private onDragover(e: any) {
  //   console.log('e', e);
  // }
  private left = 20
  private top = 20
  private flags = false

  private created() {
    console.log('screenComp', this.screenComp)
  }

  /**
   * 鼠标按下
   */
  private onMouseDown(e: any) {
    this.flags = true
    const startx = e.x;
    const starty = e.y;
    this.left = startx - e.offsetX
    this.top = starty - e.offsetY
    console.log('onMouseDown', startx - e.offsetX, starty - e.offsetY)
  }

  /**
   * 鼠标松开
   */
  private onMouseUp(e: any) {
    console.log('onMouseUp', e)
    // this.left = 100
    // this.top = 100
    this.flags = false
    // 阻止页面的滑动默认事件
    document.addEventListener('mousemove', this.handler, {
        passive: false
    });
  }

  /**
   * 鼠标移动
   */
  private onMouseMove(e: any) {
    // this.screenComp = [{
    //   ...this.screenComp[0],
    //   style: {
    //     top: e.offsetY + 'px',
    //     left: e.offsetX + 'px'
    //   }
    // }]
    // this.left = e.offsetX - this.left
    // this.top = e.offsetY - this.top
    const endx = e.x - this.left;
    const endy = e.y - this.top;
    if (this.flags) {
      // e.target.style.left = endx + 'px';
      // e.target.style.top = endy + 'px';
      console.log('onMouseMove', endx, endy)
      this.left = endx
      this.top = endy
    }
  }

  // 上锁
  private handler(e: any) {
    if (this.flags) {
      e.preventDefault();
    } else {
      return true
    }
  }
}
</script>

<style lang="scss">
  .ads-con{
    position: relative;
    // width: 300px;
    // height: 300px;
  }
  .ads-comp{
    position: absolute;
  }
</style>
