<template>
  <!-- 内容栏 -->
  <div class="ad-con" :style="{marginLeft: navWidth}">
    <div class="ad-con-logo">
      <div class="ad-con-fold" @click="toggleSlider">
        <i :class="iconClass" />
      </div>
    </div>
    <div class="ad-con-all">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Model } from 'vue-property-decorator';
@Component
export default class Content extends Vue {
  @Prop({default: '200px'}) private navWidth: string | undefined;
  @Prop({default: false}) private isCollapse: boolean | undefined;

  private iconClass: string = 'el-icon-s-fold';

  @Emit ('toggleMenu')
  private toggleMenu(isCollapse: boolean) {
    console.log(isCollapse);
  }

  // @Model('toggleSlider', { type: Boolean }) readonly isCollapse!: boolean;
  private toggleSlider() {
    this.iconClass = !this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold';
    this.toggleMenu(!this.isCollapse);
  }
}
</script>

<!--<style lang="scss" scoped></style>-->
