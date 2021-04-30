<template>
  <div class="screen-con-r">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <template v-for="(tab, index) in tabList" >
        <el-tab-pane :label="tab.label" :name="tab.name" :key="index">
          <!-- <ListIndex :name="tab.component" /> -->
          11111111
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
/**
 * 画布-center
 */
@Component({name: 'tabAttr'})
export default class TabAttr extends Vue {
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

  // tab 切换事件
  private handleClick(tab: string, event: any) {
    console.log(tab);
  }
}
</script>

<style lang="scss" scoped>

</style>