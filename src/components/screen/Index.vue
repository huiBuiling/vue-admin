<template>
  <div class="ads-con" id="editor">
    <!-- 网格线 -->
    <Grid />

    <!-- 组件显示 -->
    <!-- :style="{...item.style, left: left + 'px', top: top + 'px'}" -->
    <div
      class="ads-comp"
      v-for="item in screenComp"
      :key="item.id"
      :style="item.style"
      @mousedown="onMouseDown"
      :id="item.id"
    >
      <!-- 按钮 -->
      <el-button class="btn" v-if="item.label === 'btn'">操作按钮{{ item.text }}</el-button>

      <!-- 图片 -->
      <img class="img" style="width:170px" src="../../assets/screen2.jpeg" v-if="item.label === 'image'" />

      <!-- 区域框 -->
      <el-input class="textarea" v-if="item.label === 'textarea'" type="textarea" v-model="item.text" />

      <!-- 输入框, 啊哈哈编辑消失，是因为显示依赖 就是绑定值-->
      <el-input class="input" v-if="item.label === 'input'" v-model="item.text" />

      <!-- 矩形 -->
      <div v-if="item.label === 'rect'" class="rect">{{ item.label }}</div>
    </div>

    <!-- 组件框 -->
    <!-- <Shape
      :defaultStyle="item.style"
      :style="getShapeStyle(item.style)"
      :class="{ lock: item.isLock }"
    /> -->

    <!-- 选中区域 -->
    <!-- <Area :start="start" :width="width" :height="height" v-show="isShowArea" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import Grid from './Grid.vue';
import Shape from './Area.vue';
import Area from './Area.vue';
/**
 * 画布-center
 */
@Component({
  name: 'screenCon',
  components: {
    Grid,
    Shape,
    Area,
  },
})
export default class ScreenCon extends Vue {
  @Prop() public screenComp!: any[];

  // 是否开启操作
  private flags: boolean = false;
  // private left: number = 0
  // private top: number = 0
  private isShowArea = true;

  private width: number = 100;
  private height: number = 100;
  private start: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0,
  };

  @Emit('changeComp')
  private changeComp(id: string, data: any) {
    console.log('changeComp', id, data);
  }

  private mounted() {
    console.log('mounted_screenComp', this.screenComp);
  }

  private updated() {
    console.log('updated_screenComp2', this.screenComp);
  }

  private getShapeStyle(style: any) {
    const result: any = {};
    ['width', 'height', 'top', 'left', 'rotate'].forEach((attr: any) => {
      if (attr !== 'rotate') {
        result[attr] = style[attr] + 'px';
      } else {
        result.transform = 'rotate(' + style[attr] + 'deg)';
      }
    });

    return result;
  }

  /**
   * 鼠标按下, 此时距离
   * a -> 获取鼠标距离页面：上和左的距离
   * b -> 获取当前组件距离页面：上和左的距离
   * c -> 鼠标距离元素的距离 = 鼠标a - 元素b
   *
   * 鼠标移动
   * 鼠标距离页面距离 - 起始时，鼠标距离元素 = 元素起始位置
   */
  private onMouseDown(e: any) {
    // 未选中任何元素
    if (!e.currentTarget.id) return;
    console.log(`output->e.currentTarget.id`, e.currentTarget.id);

    this.flags = true;
    const curid = e.currentTarget.id;
    const btnDom = document.getElementById(curid) as HTMLElement;
    const editorDom = document.getElementById('editor') as HTMLElement;
    // const editors = editorDom.getBoundingClientRect() as DOMRect;
    // 获取鼠标距离页面左侧距离
    const startPoint = {
      mousex: e.clientX, // 鼠标距离页面上侧距离
      mousey: e.clientY, // 鼠标距离页面上侧距离
      btnx: btnDom.offsetLeft, // 元素距离页面左侧距离
      btny: btnDom.offsetTop, // 元素距离页面上侧距离
      btnw: btnDom.offsetWidth, // 元素距离页面左侧距离
      btnh: btnDom.offsetHeight, // 元素距离页面上侧距离
    };
    // 相减得到鼠标距离元素的距离
    const X = startPoint.mousex - startPoint.btnx;
    const Y = startPoint.mousey - startPoint.btny;
    console.log(X, Y);

    /**
     * 鼠标移动
     */
    const move = (moveEvent: any) => {
      // 鼠标移动过程中 获取鼠标距离页面距离
      const movex = moveEvent.clientX;
      const movey = moveEvent.clientY;

      // 元素移动过程中距离页面左/上侧距离
      let leftx = movex - X;
      let lefty = movey - Y;

      // 1.左侧边界值
      leftx = leftx <= 0 ? 0 : leftx;
      // 2.上侧边界值
      lefty = lefty <= 0 ? 0 : lefty;

      // 3. 右侧边界值 -> 减去元素宽度
      if (leftx + startPoint.btnw > editorDom.clientWidth) {
        leftx = editorDom.clientWidth - startPoint.btnw;
      }
      // 4. 下侧边界值 -> 减去元素高度
      if (lefty + startPoint.btnh > editorDom.clientHeight) {
        lefty = editorDom.clientHeight - startPoint.btnh;
      }

      console.log(`output->move————`, leftx, lefty);
      this.changeComp(curid, {
        left: leftx + 'px',
        top: lefty + 'px',
      });
    };

    /**
     * 鼠标弹起
     */
    const up = (ev: any) => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      // return false
    };

    // // 阻止页面的滑动默认事件
    document.addEventListener('mousemove', move, {
      passive: false,
    });
    document.addEventListener('mouseup', up);
  }
}
</script>

<style lang="scss" scoped>
.ads-con {
  position: relative;
  // width: 300px;
  // height: 300px;
}
.ads-comp {
  position: absolute;
}
.rect {
  width: 200px;
  height: 100px;
  border: 1px solid #fff;
  border-radius: 2px;
  padding: 5px 10px;
}
.btn,
.img,
.input,
.textarea {
  width: 200px;
}
</style>
