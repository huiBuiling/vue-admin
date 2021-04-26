# 可视化(vue 拖曳)

## 属性
- draggable: 确认可以被拖拽的元素(即添加此属性，组件才可以拖曳)
```
- drag：拖动元素
  - @drag: 拖动中触发事件
  - @dragstart: 当用户单击元素，并开始拖动时触发事件
  - @dragend: 完成拖动后触发事件

- drop：释放元素
  - @ondrop ：拖动元素在目标区域中 释放鼠标时触发
  - @dragenter: 拖起来的元素进入到目标区域中时触发事件
  - @dragleave: 当拖动元素离开目标区域时触发事件
  - @dragover: 拖动元素在目标区域中移动时触发事件
```

- demo
```
<template>
  <div class="screen-con">
    <div class="screen-con-l" @dragstart="onDragstart" >
      <el-button draggable id="btn">操作按钮</el-button>
      <el-button draggable id="btn1">操作按钮1</el-button>
      <el-button draggable id="btn2">操作按钮2</el-button>
      <el-button draggable id="btn3">操作按钮3</el-button>
    </div>

      <!-- 画布 -->
      <div class="screen-con-c ads-con"  
        @drop="onDrop"
        @dragend="onDragend" 
        @dragover="onDragover"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  export default class Screen extends Vue {
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
    }

    /**
    * 浏览器默认不允许拖延元素，因此需要先阻止默认设置
    */
    private onDragover(e: any) {
      e.preventDefault()
    }
  }
</script>
```