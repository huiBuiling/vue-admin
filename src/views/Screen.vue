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
        <el-button draggable id="btn1">操作按钮1</el-button>
        <el-button draggable id="btn2">操作按钮2</el-button>
        <el-button draggable id="btn3">操作按钮3</el-button>
      </div>

      <!-- 画布 -->
      <!-- <ScreenCenter /> -->
      <div class="screen-con-c ads-con"  
        @drop="onDrop"
        @dragend="onDragend" 
        @dragover="onDragover"
      >
        <div v-for="item in screenComp" :key="item.name">
          <el-button v-if="item.name == 'btn'">操作按钮</el-button>
        </div>
      </div>

      <!-- <div class="screen-con-r">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <template v-for="(tab, index) in tabList" >
            <el-tab-pane :label="tab.label" :name="tab.name" :key="index">
              <ListIndex :name="tab.component" />
            </el-tab-pane>
          </template>
        </el-tabs>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ScreenCenter from '@/components/screen/Index.vue'
import { Button } from 'element-ui';
@Component({
  name: 'screen',
  components: {
    ScreenCenter
  }
})
export default class Screen extends Vue {
  private useComp: any[] = [
    {
      label: '按钮',
      component: 'btn'
    }
  ]
  private tabList: Array<{label: string, name: string, component: string }> = [
    {
      label: '属性',
      name: 'attri',
      component: 'default'
    },
    {
      label: '动画',
      name: 'anim',
      component: 'element'
    },
    {
      label: '事件',
      name: 'events',
      component: 'element'
    }
  ];
  // 右侧栏，选中tab
  private activeName: string = 'attri';

  private screenComp = [
    // {
    //   label: '按钮',
    //   name: 'btn',
    //   component: 'default'
    // }
  ]

  // tab 切换事件
  private handleClick(tab: string, event: any) {
    console.log(tab);
  }

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
    e.target.style.opacity = 0.5
    e.target.style.background = '#000'
    e.dataTransfer.setData('id', e.target.id);
  }

  /**
   * e.dataTransfer
   * 通过e.dataTransfer 获取存储的拖拽元素id, 并添加到画布中
   */
  private onDrop(e: any) {
    var id = e.dataTransfer.getData('id');
    e.target.appendChild(document.querySelector('#' + id));
  }

  /**
   * 拖曳结束操作
   */
  private onDragend(e: any) {
    e.target.style.opacity = 1
    e.target.style.background = '#fff'
    e.target.style.top = e.offsetY
    e.target.style.left = e.offsetX
  }

  /**
   * 浏览器默认不允许拖延元素，因此需要先阻止默认设置
   */
  private onDragover(e: any) {
    // console.log('onDragover', e)
    e.preventDefault()
    // e.dataTransfer.dropEffect = 'copy'
  }
}
</script>

<style lang="scss">
  
</style>>
