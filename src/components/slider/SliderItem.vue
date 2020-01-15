<template>
    <!-- 侧边栏 -->
    <div class="ad-nav-menu">
        <div v-for="(itemM, indexM) in menuArr">
            <!--有子级菜单-->
            <el-submenu
                    :index="itemM.path"
                    v-if="itemM.children"
            >
                <template slot="title">
                    <i class="el-icon-location" v-if="isParent"/>
                    <span slot="title">{{itemM.name}}</span>
                </template>

                <SliderItem
                        :menuArr="itemM.children"
                        :isParent="false"
                />
            </el-submenu>

            <!--无级菜单-->
            <el-menu-item
                    :index="itemM.path"
                    v-if="itemM.children === undefined"
            >
                <i class="el-icon-menu" v-if="isParent"/>
                <span slot="title">{{itemM.name}}</span>
            </el-menu-item>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  name: 'SliderItem',
})
export default class extends Vue {
  @Prop() private menuArr!: any;
  @Prop({ default: true }) private isParent!: boolean | undefined;
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
