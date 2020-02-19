<template>
  <div class="ad-icons">
    <div class="ad-icons-div">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <template v-for="(tab, index) in tabList" >
        <el-tab-pane :label="tab.label" :name="tab.name" keys="index">
          <ListIndex :name="tab.component" />
        </el-tab-pane>
      </template>
    </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ListIndex from '@/components/icon/Index.vue';

@Component({
  name: 'icon',
  components: {
    ListIndex,
  },
})
export default class Icon extends Vue {
  private tabList: object = [
    {
      label: '自定义图标',
      name: 'default',
      component: 'default',
    }, {
      label: 'ElementUI图标',
      name: 'element-ui',
      component: 'element',
    },
  ];
  private activeName: string = 'default';
  private handleClick(tab: string, event: any) {
    console.log(tab);
  }
}
</script>
