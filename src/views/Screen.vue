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
      <div class="screen-con-l">
        <el-button @click="operaBtn('record')">操作按钮</el-button>
      </div>

      <!-- 画布 -->
      <ScreenCenter />

      <div class="screen-con-r">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <template v-for="(tab, index) in tabList" >
            <el-tab-pane :label="tab.label" :name="tab.name" :key="index">
              <ListIndex :name="tab.component" />
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
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
  // tab 切换事件
  private handleClick(tab: string, event: any) {
    console.log(tab);
  }

  /**
   * 顶部操作
   * record: 撤销
   *  reset: 重做
   * preview: 预览
   * save: 保存
   * clear: 清空画布
   */
  private operaBtn(type: string) {
    console.log('type', type)
  }
}
</script>

<style lang="scss">
  
</style>>
