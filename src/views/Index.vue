<template>
  <div class="ad-app">
    <!-- 侧边栏 -->
    <Slider
            :navWidth = "navWidth"
            :isCollapse="isCollapse"
    />

    <!-- 内容栏 -->
    <Content
            :navWidth = "navWidth"
            :isCollapse="isCollapse"
            @toggleMenu="toggleMenu"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Content from './Content.vue';
import Slider from './Slider.vue';
@Component({
   components: {
     Slider,
     Content,
   },
})
export default class extends Vue {
  private isCollapse: boolean = false;
  private navWidth: string = '200px';

  private toggleMenu(isCollapse: boolean) {
    this.isCollapse = isCollapse;
    this.navWidth = !isCollapse ? '200px' : '64px';
  }
}
</script>

<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
