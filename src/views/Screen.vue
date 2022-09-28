<template>
  <div class="ad-screen">
    <div class="screen-top">
      <el-row>
        <el-button @click="operaBtn('revoke')">撤销</el-button>
        <el-button @click="operaBtn('forward')">前进</el-button>
        <el-button @click="operaBtn('preview')">预览</el-button>
        <el-button @click="operaBtn('save')">保存</el-button>
        <el-button @click="operaBtn('clear')">清空画布</el-button>
        <el-button @click="operaBtn('screenshot')">截图</el-button>
      </el-row>
    </div>
    <div class="screen-con">
      <div class="screen-con-l comp" @dragstart="onDragstart">
        <el-button class="btn" draggable :data-type="'btn'">操作按钮</el-button>
        <img draggable :data-type="'image'" class="img" style="width:170px;" src="../assets/screen2.jpeg" />
        <el-input draggable :data-type="'textarea'" type="textarea" v-model="textarea" class="textarea" />
        <el-input draggable :data-type="'input'" v-model="input" class="input" />
        <div draggable :data-type="'rect'" class="rect">矩形</div>
      </div>

      <!-- 此方法均是处理给左侧组件拖曳到右侧内容块中 -->
      <!-- @drop="onDrop" @dragend="onDragend" @dragover="onDragover" -->
      <div class="screen-con-c" ref="screenRef" @drop="onDrop" @dragover="onDragover">
        <!-- 画布 -->
        <ScreenCenter :screenComp="screenComp" @changeComp="changeComp" />
      </div>

      <!-- 属性，动画，事件 -->
      <!-- <TabAttr /> -->
      <div class="shot" v-if="dataURL">
        <div class="shot_con">
          <img class="shot_con_close" src="../assets/close.png" alt="" @click="dataURL = ''" />
          <img :src="dataURL" alt="" />
          <el-button @click="dowloadImage">下载</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import html2canvas from 'html2canvas';
import ScreenCenter from '@/components/screen/Index.vue';
import TabAttr from '@/components/screen/TabAttr.vue';
import { Button } from 'element-ui';
@Component({
  name: 'screen',
  components: {
    ScreenCenter,
    TabAttr,
  },
})
export default class Screen extends Vue {
  input: string = '输入框';
  textarea: string = '文本框';
  dataURL: string = '';

  // 画布组件数据
  public screenComp: any[] = [
    {
      id: 1,
      label: 'btn',
      component: 'btn',
      text: 'btn',
      style: {
        top: '0',
        left: '0',
      },
    },
    {
      id: 2,
      label: 'rect',
      component: 'rect',
      text: 'rect',
      style: {
        top: '200px',
        left: '0',
      },
    },
    // {
    //   id: 2,
    //   label: 'image',
    //   component: 'image',
    //   text: 'image',
    //   style: {
    //     top: '100px',
    //     left: '100px',
    //   },
    // },
    {
      id: 3,
      label: 'textarea',
      component: 'textarea',
      text: 'textarea',
      style: {
        top: '45px',
        left: '0',
      },
    },
    {
      id: 4,
      label: 'input',
      component: 'input',
      text: 'input',
      style: {
        top: '120px',
        left: '0',
      },
    },
  ];

  /**
   * 顶部操作
   * record: 撤销
   * reset: 重做
   * preview: 预览
   * save: 保存
   * clear: 清空画布
   */
  operaBtn(type: string) {
    console.log('type', type);
    switch (type) {
      // 撤销
      case 'revoke':
        break;
      // 前进
      case 'forward':
        break;
      case 'preview':
        break;
      case 'save':
        break;
      // 清空
      case 'clear':
        this.screenComp = [];
        break;
      case 'screenshot':
        this.handleDownload();
        break;
      default:
        break;
    }
  }

  // 下载图片
  private async handleDownload() {
    try {
      const screenCon = this.$refs.screenRef;
      if (screenCon) {
        const canvas: any = await html2canvas(this.$refs.screenRef, {
          backgroundColor: null,
          width: 700,
          height: 500,
        });
        this.dataURL = canvas.toDataURL('image/png');
      }
    } finally {
      // setTimeout(() => {
      //   downloading.value = false
      // }, 800)
    }
  }

  // 下载图片
  private dowloadImage() {
    const trigger = document.createElement('a');
    trigger.href = this.dataURL;
    trigger.download = 'screen.png';
    trigger.click();
  }

  /**
   * e.target: 被选中的拖拽元素
   * 通过e.dataTransfer方法存储被拖拽元素的id
   * 在ondrop时就可以获取当前id，并选中元素添加拖拽元素
   * e.dataTransfer
   */
  private onDragstart(e: any) {
    const curId = this.screenComp.length + 1;
    e.dataTransfer.setData('id', curId);
    // 当次拖曳组件类型
    e.dataTransfer.setData('dataType', e.target.attributes['data-type'].value);
  }

  /**
   * e.dataTransfer
   * 通过e.dataTransfer 获取存储的拖拽元素id, 并添加到画布中
   */
  private onDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.screenComp = [...this.screenComp, this.addComp(e)];
  }

  // 不同类型组件设置
  private addComp(e: any) {
    const id: string = e.dataTransfer.getData('id');
    const type: string = e.dataTransfer.getData('dataType');
    return {
      id: +id,
      label: type,
      component: type,
      text: type,
      style: {
        top: e.offsetY + 'px',
        left: e.offsetX + 'px',
      },
    };
  }

  /**
   * 拖曳结束操作
   */
  // private onDragend(e: any) {}

  /**
   * 浏览器默认不允许拖延元素，因此需要先阻止默认设置
   */
  private onDragover(e: any) {
    // console.log('onDragover', e)
    e.preventDefault();
    // 设置行为为复制，保留原始组件
    e.dataTransfer.dropEffect = 'copy';
  }

  private changeComp(id: string, data: any) {
    const curIndex = this.screenComp.findIndex((item) => item.id === +id);
    if (curIndex >= 0) {
      let curComp: any = this.screenComp![curIndex];
      curComp = {
        ...curComp,
        style: { ...curComp.style, ...data },
      };
      this.$set(this.screenComp, curIndex, curComp);
    }
  }
}
</script>

<style lang="scss">
.shot {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 11;
  .shot_con {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 700;
    height: 500px;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  img {
    margin-bottom: 15px;
  }
  .shot_con_close {
    width: 30px;
    height: 30px;
    position: absolute;
    right: -50px;
    top: -20px;
    cursor: pointer;
  }
}
</style>
