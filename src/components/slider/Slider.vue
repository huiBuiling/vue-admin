<template>
  <!-- 侧边栏 -->
  <div class="ad-nav" :style="{width: navWidth}">
    <div class="ad-nav-logo">
      Admin
    </div>
    <div class="ad-nav-con">
      <!--              :default-active="$route.path"-->
      <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              unique
              collapse-transition
              router
              @open="handleOpen"
              @close="handleClose"
              :collapse="isCollapse"
      >
        <SliderItem
                :menuArr="menuArr"
                :isParent="true"
        />
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { routes} from '@/router';
import SliderItem from '@/components/slider/SliderItem.vue';
@Component({
  // name: 'Slider',
  components: {
    SliderItem
  }
})
export default class Slider extends Vue {
  @Prop({ default: '200px' }) private navWidth!: string;
  @Prop({default: false}) private isCollapse!: boolean | undefined;

  private menuActive: string = '1';

  private handleOpen(key: string, keyPath: any) {
    console.log(key, keyPath);
  }

  private handleClose(key: string, keyPath: any) {
    console.log(key, keyPath);
  }

  get menuArr() {
    const menuList: any = routes;
    return menuList;
  }
}
</script>

<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
