- 潮汕旅游
  10.1 出发去潮州
  10.2 潮州玩一天
  牌坊街,广济桥,开元寺，主要是吃

  10.3 早起上南澳岛 -> 青澳湾
  南澳岛逛青澳湾，金银岛，总兵府。吃海鲜，够鲜。
  晚上住可以选择青澳湾的聆涛小栈，或者选择后宅县城的哒浪哒浪客栈。

  10.5 回广州
  长隆 1 日游

- 北海旅游
  10.1：到达北海：（住北海）
  侨港海滩、冠头岭国家森林公园、金海湾红树林、海底世界楼主根据个人喜欢选择景点游览，下午北海银滩看日落；买好去涠洲岛的船票，晚上北部湾广场，老街转转

  10.2：早上早班船去涠洲岛，，住涠洲岛
  游涠洲岛火山地质公园、滴水丹屏看日落，晚上南湾大排档吃海鲜

  10.3：早上出发，住涠洲岛
  五彩滩看日出，五彩公路、天主教堂，圣母堂、贝壳沙滩 ，石螺口沙滩看日落，

  10.4：回北海，游玩或者返程

  10.5 回广州
  长隆 1 日游

# h5 拖曳

## 左侧拖曳到右侧流程

- 允许拖曳
  `draggable：<el-button draggable id="btn">操作按钮</el-button>`
- 拖曳过程：即从左侧边栏拖曳到右侧 canvas 上

  - onDragstart(开始)
  - onDrop(释放元素)，onDragend(结束)，onDragover(移动)

  - 设置行为为复制，保留原始组件(避免拖曳后左侧组件不存在)
    `e.dataTransfer.dropEffect = 'copy';`

- 拖曳结果：

## 块内随意拖曳

- onMouseDown 操作

  - 设置元素位置
  - 注意：上下左右边界值

- 监听 mousemove
  `document.addEventListener('mousemove', move, { passive: false, });`

- 鼠标弹起，取消选中移动

```
  document.addEventListener('mouseup', up);
  const up = (ev: any) => {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
    // return false
  };
```

## 属性

- draggable: 确认可以被拖拽的元素(即添加此属性，组件才可以拖曳)
- drag: 拖动元素
  - drag: 拖动中触发事件
  - dragstart: 当用户单击元素，并开始拖动时触发事件
  - dragend: 完成拖动后触发事件
- drop: 释放元素
  - drop: 拖动元素在目标区域中 释放鼠标时触发
  - dragenter: 拖起来的元素进入到目标区域中时触发事件
  - dragleave: 当拖动元素离开目标区域时触发事件
  - dragover: 拖动元素在目标区域中移动时触发事件

## vue 拖曳 demo

- template

```
<template>
  <div class="screen-con">
    <div class="screen-con-l"  @dragstart="onDragstart" >
      <el-button draggable id="btn">操作按钮</el-button>
      <el-button draggable id="btn1">操作按钮1</el-button>
      <el-button draggable id="btn2">操作按钮2</el-button>
      <el-button draggable id="btn3">操作按钮3</el-button>
    </div>

    <div class="screen-con-c ads-con"
      @drop="onDrop"
      @dragend="onDragend"
      @dragover="onDragover"
    >...</div>
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
      // 设置行为为复制，保留原始组件
      // e.dataTransfer.dropEffect = 'copy'
    }
  }
</script>
```

## DataTransfer 对象

- https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer
- 拖拽数据传递对象，一般使用方式 event.dataTransfer

### 属性

- .dropEffect=value: 拖拽效果,获取被拖动的元素能够执行哪种行为

  - value 可选值：
    - none：不能把拖动的元素放在这里。这是除了文本框之外所有元素默认的值。
    - move：应该把拖动的元素移动到放置目标。
    - copy：应该把拖动的元素复制到放置目标。
    - link：放置目标会打开拖动的元素(但拖动的元素必须是个链接，有 URL 地址)

- effectAllowed: 表示允许拖动元素的哪种行为(dropEffect)

  - dropEffect 和 effectAllowed 属性结合一起使用才能发挥功效
  - 要设置 effectAllowed 属性必须在 ondragstart 事件处理程序中设置
  - value 可选值：
    - uninitialized：没有给被拖动元素设置任何放置行为。
    - none：被拖动的元素不能有任何行为。
    - copy：只允许值为 copy 的 dropEffect
    - link：只允许值为 link 的 dropEffect
    - move：只允许值为 move 的 dropEffect
    - copyLink：允许值为 copy 和 link 的 dropEffect
    - copyMove：允许值为 copy 和 move 的 dropEffect
    - linkMove：允许值为 link”和 move 的 dropEffect
    - all：允许任意 dropEffect

- items: 拖拽的数据集合，是一个数组
- files: 包含数据传输中可用的所有本地文件的列表。如果拖动操作不涉及拖动文件，则此属性为空列表
- types: 保存 DataTransfer 对象中设置的所有数据类型
- setDragImage(element, x, y): 设置自定义的拖动图像
- addElement(element)
- getData(format)
  - 获取自定义的数据格式，如 ev.dataTransfer.getData("text");
- setData (format, data)
  - 添加自定义数据格式，如 ev.dataTransfer.setData("text", ev.target.innerHTML);
- .clearData([ format ])
  - 清除自定义的数据格式及其数据。

# err

- TS1109: Expression expected
