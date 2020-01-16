<template>
    <!-- 侧边栏 -->
    <div class="ad-nav-menu">
        <div v-for="(itemM, indexM) in menuArr">
            <!--有子级菜单-->
            <!--:index="curPathFun(itemM.path)"-->
            <el-submenu
                    :index="itemM.path"
                    v-if="itemM.children"
            >
                <template slot="title">
                    <i class="el-icon-location" v-if="isParent"/>
                    <span slot="title">{{$t('route.' + itemM.name)}}</span>
                </template>

                <SliderItem
                        :menuArr="itemM.children"
                        :isParent="false"
                        :parentPath="itemM.path"
                />
            </el-submenu>

            <!--无级菜单-->
            <el-menu-item
                    :index="itemM.path"
                    v-if="itemM.children === undefined"
            >
                <i class="el-icon-menu" v-if="isParent"/>
                <span slot="title">{{$t('route.' + itemM.name)}}</span>
            </el-menu-item>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SliderItem extends Vue {
  @Prop() private menuArr!: any;
  @Prop({ default: true }) private isParent!: boolean | undefined;
  @Prop() private parentPath!: string;

  private curPathFun(path: any) {
    let curPath;
    if (!this.isParent && this.parentPath) {
      curPath = !this.isParent && this.parentPath && `${this.parentPath}${path}`;
    } else {
      curPath = path;
    }
    return curPath;
  }
}
</script>

<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .ad-link{
    width: 100%;
  }
</style>
