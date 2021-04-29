<template>
  <div class="ads-con" id="editor">
    <!-- 网格线 -->
    <Grid />

    <!-- 组件显示 -->
    <!-- :style="{...item.style, left: left + 'px', top: top + 'px'}" -->
    <div 
      class="ads-comp"
      v-for="(item, index) in screenComp" 
      :key="item.id + '-' + index"
      :style="{...item.style, left: left + 'px', top: top + 'px'}"
      @mousedown="onMouseDown"
      id="btn"
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
  // public editor:any = document.getElementById('editor') as HTMLElement;
  private moveBtn: any
  private flags: boolean = false
  private left: number = 0
  private top: number = 0

  private created() {
    console.log('screenComp', this.screenComp)
  }

  /**
   * 鼠标按下
   */
  private onMouseDown(e: any) {
    this.flags = true
    const editorDom = document.getElementById('editor') as HTMLElement;
    const btnDom = document.getElementById('btn') as HTMLElement;
    const editors = editorDom.getBoundingClientRect() as DOMRect

    // 鼠标按下 获取鼠标距离页面左侧距离
    const x = e.clientX;
    // 获取鼠标距离页面上侧距离
    const y = e.clientY;
    // 元素距离页面左侧距离
    const elex = btnDom.offsetLeft;
    // 元素距离页面上侧距离
    const eley = btnDom.offsetTop;
    // 相减得到鼠标距离元素的距离
    const X = x - elex
    const Y = y - eley
    // const X = 0
    // const Y = 0
    console.log(X, Y);

    /**
     * 鼠标移动
     */
    const move = (moveEvent: any) => {
      // 鼠标移动过程中 获取鼠标距离页面距离
      const movex = moveEvent.clientX;
      const movey = moveEvent.clientY;
      // 元素移动过程中距离页面左侧距离
      let leftx = movex - X;
      let lefty = movey - Y;
      // 1.左侧边界值
      leftx = leftx <= 0 ? 0 : leftx
      // 2.上侧边界值
      lefty = lefty <= 0 ? 0 : lefty
      // 3.右侧边界值: editor宽 - 元素宽
      // const rightx = editors.width - btnDom.offsetWidth
      // const rightx = editorDom.clientWidth - btnDom.offsetWidth
      console.log('editors', editors.width, btnDom.offsetWidth, leftx)
      // if (leftx >= editorDom.clientWidth) {
      //   leftx = rightx
      // }

      // 4.下侧边界值: editor高 - 元素高
      // const righty = editors.y - btnDom.offsetHeight;
      // if (lefty >= righty) {
      //   lefty = righty;
      // }

      // 鼠标移动过程中 获取鼠标距离页面距离 - 鼠标距离元素的距离 =元素的left top值
      // btnDom.style.left = leftx + 'px';
      // btnDom.style.top = lefty + 'px';
      this.left = leftx
      this.top = lefty
      // console.log('btndom', leftx, lefty, movex, movey)
    }

    /**
     * 鼠标移动
     */
    const up = (ev: any) => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      return false
    }
    
    // 阻止页面的滑动默认事件
    document.addEventListener('mousemove', move, {
        passive: false
    });
    document.addEventListener('mouseup', up)
  }

  /**
   * 鼠标按下
   */
  /* private onMouseDown2(e: any) {
    this.flags = true
    const editorDom = document.getElementById('editor') as HTMLElement;
    const editors = editorDom.getBoundingClientRect() as DOMRect

    // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
    getBoundingClientRect()
    console.log('editors', editors)
    this.editorX = editors.x 
    this.editorY = editors.y
    const startX = e.clientX
    const startY = e.clientY
    this.start.x = startX - this.editorX
    this.start.y = startY - this.editorY
    this.left = startX - this.editorX
    this.top = startY - this.editorY

    const move = (moveEvent: any) => {
      if (moveEvent.clientX < startX) {
          this.start.x = moveEvent.clientX - this.editorX
      }

      if (moveEvent.clientY < startY) {
          this.start.y = moveEvent.clientY - this.editorY
      }
    }

    const up = (ev: any) => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      if (ev.clientX === startX && e.clientY === startY) {
        return
      }
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  } */
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
