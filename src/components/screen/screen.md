# 可视化(vue 拖曳)

## 属性
  - draggable: 确认可以被拖拽的元素(即添加此属性，组件才可以拖曳)
  - drag：拖动元素
    - @drag: 拖动中触发事件
    - @dragstart: 当用户单击元素，并开始拖动时触发事件
    - @dragend: 完成拖动后触发事件
  - drop：释放元素
    - @ondrop ：拖动元素在目标区域中 释放鼠标时触发
    - @dragenter: 拖起来的元素进入到目标区域中时触发事件
    - @dragleave: 当拖动元素离开目标区域时触发事件
    - @dragover: 拖动元素在目标区域中移动时触发事件

## demo

- template

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
```

- script

```
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

## DataTransfer对象总结

- https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer
- 拖拽数据传递对象，一般使用方式event.dataTransfer

### 属性

- .dropEffect=value: 拖拽效果,获取被拖动的元素能够执行哪种行为

```
value可选值：
  none：不能把拖动的元素放在这里。这是除了文本框之外所有元素默认的值。
  move：应该把拖动的元素移动到放置目标。
  copy：应该把拖动的元素复制到放置目标。
  link：放置目标会打开拖动的元素(但拖动的元素必须是个链接，有URL地址)。
```

- effectAllowed：表示允许拖动元素的哪种行为(dropEffect)
  - dropEffect和effectAllowed属性结合一起使用才能发挥功效
  - 要设置effectAllowed属性必须在ondragstart事件处理程序中设置
```
value可选值：
  uninitialized：没有给被拖动元素设置任何放置行为。
  none：被拖动的元素不能有任何行为。
  copy：只允许值为”copy”的dropEffect。
  link：只允许值为”link”的dropEffect。
  move：只允许值为”move”的dropEffect。
  copyLink：允许值为”copy”和”link”的dropEffect。
  copyMove：允许值为”copy”和”move”的dropEffect。
  linkMove：允许值为”link”和”move”的dropEffect。
  all：允许任意dropEffect。
```

- items: 拖拽的数据集合，是一个数组
- files: 包含数据传输中可用的所有本地文件的列表。如果拖动操作不涉及拖动文件，则此属性为空列表
- types: 保存DataTransfer对象中设置的所有数据类型
- setDragImage(element, x, y): 设置自定义的拖动图像
- addElement(element)
- getData(format)
  - 获取自定义的数据格式，如ev.dataTransfer.getData("text");
- setData (format, data)
  - 添加自定义数据格式，如ev.dataTransfer.setData("text", ev.target.innerHTML);
- .clearData([ format ])
  - 清除自定义的数据格式及其数据。
