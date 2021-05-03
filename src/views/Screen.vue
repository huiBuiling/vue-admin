<template>
  <div class="ad-screen">
    <div class="screen-top">
      <el-row>
        <el-button @click="operaBtn('record')">撤销</el-button>
        <el-button @click="operaBtn('reset')">重做</el-button>
        <el-button @click="operaBtn('preview')">预览</el-button>
        <el-button @click="operaBtn('save')">保存</el-button>
        <el-button @click="operaBtn('clear')">清空画布</el-button>
      </el-row>
    </div>
    <div class="screen-con">
      <div class="screen-con-l" @dragstart="onDragstart" >
        <el-button draggable id="btn">操作按钮</el-button>
        <img
          class=""
          style="width:170px; height: 200px"
          id="image"
          src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2620306848,1106594030&fm=26&gp=0.jpg" 
        />
      </div>

      
      <div class="screen-con-c"  
        @drop="onDrop"
        @dragend="onDragend" 
        @dragover="onDragover"
      >
        <!-- 画布 -->
        <ScreenCenter 
          :screenComp="screenComp" 
          @changeComp="changeComp"
        />
      </div>

      <TabAttr />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ScreenCenter from '@/components/screen/Index.vue'
import TabAttr from '@/components/screen/TabAttr.vue'
import { Button } from 'element-ui';
@Component({
  name: 'screen',
  components: {
    ScreenCenter,
    TabAttr
  }
})
export default class Screen extends Vue {
  // 画布组件
  private screenComp: any[] = [
    {
      id: 1,
      label: 'btn',
      component: 'btn',
      text: 'btn',
      style: {
        top: '0',
        left: '0'
      }
    },
    // {
    //   id: 2,
    //   label: 'image',
    //   component: 'image',
    //   text: 'image',
    //   style: {
    //     top: '100px',
    //     left: '100px'
    //   }
    // },
    {
      id: 3,
      label: 'textarea',
      component: 'textarea',
      text: 'textarea',
      style: {
        top: '0',
        left: '120px'
      }
    },
    {
      id: 4,
      label: 'input',
      component: 'input',
      text: 'input',
      style: {
        top: '100px',
        left: '0'
      }
    },
    {
      id: 5,
      label: 'rect',
      component: 'rect',
      text: 'rect',
      style: {
        top: '200px',
        left: '0',
        width: '200px',
        height: '100px'
      }
    }
  ]

  /**
   * 顶部操作
   * record: 撤销
   * reset: 重做
   * preview: 预览
   * save: 保存
   * clear: 清空画布
   */
  private operaBtn(type: string) {
    console.log('type', type)
  }

  /**
   * e.target: 被选中的拖拽元素
   * 通过e.dataTransfer方法存储被拖拽元素的id
   * 在ondrop时就可以获取当前id，并选中元素添加拖拽元素
   * e.dataTransfer
   */
  private onDragstart(e: any) {
    // e.target.style.opacity = 0.5
    // e.target.style.background = '#000'
    e.dataTransfer.setData('id', e.target.id);
  }

  /**
   * e.dataTransfer
   * 通过e.dataTransfer 获取存储的拖拽元素id, 并添加到画布中
   */
  private onDrop(e: any) {
    e.preventDefault()
    e.stopPropagation()
    const id = e.dataTransfer.getData('id');
    console.log('id', id)
    this.screenComp = [...this.screenComp, {
      id,
      label: id,
      component: id,
      text: id,
      style: {
        top: e.offsetY + 'px',
        left: e.offsetX + 'px'
      }
    }]
  }

  /**
   * 拖曳结束操作
   */
  private onDragend(e: any) {
    // e.target.style.opacity = 1
    // e.target.style.background = '#fff'
    // e.target.style.top = e.offsetY
    // e.target.style.left = e.offsetX
  }

  /**
   * 浏览器默认不允许拖延元素，因此需要先阻止默认设置
   */
  
  private onDragover(e: any) {
    // console.log('onDragover', e)
    e.preventDefault()
    // 设置行为为复制，保留原始组件
    e.dataTransfer.dropEffect = 'copy'
  }

  private changeComp(id: string, data: any) {
    const curIndex = this.screenComp.findIndex((item) => item.id === +id)
    if (curIndex >= 0) {
      let curComp: any = this.screenComp![curIndex]
      curComp = {
        ...curComp,
        style: {...curComp.style, ...data}
      }
      this.$set(this.screenComp, curIndex, curComp)
    }
    
  }
}
</script>

<style lang="scss">
  
</style>>
