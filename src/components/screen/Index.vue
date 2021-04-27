<template>
  <div class="ads-con">
    <!-- 网格线 -->
    <Grid />

    <!-- 组件显示 -->
    <div 
      class="ads-comp"
      v-for="(item, index) in screenComp" 
      :key="item.id + '-' + index"
      :style="item.style"
    >
      <el-button v-if="item.label === 'btn'">操作按钮{{item.text}}</el-button>
      <img 
        style="width:80px; height: 100px"
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2620306848,1106594030&fm=26&gp=0.jpg" 
        v-if="item.label === 'image'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Grid from './Grid.vue'
/**
 * 画布-center
 */
@Component({
  name: 'screenCon',
  components: {
    Grid
  }
})
export default class ScreenCon extends Vue {
  @Prop() private screenComp!: any[];
  // @Emit ('onDragover')
  // private onDragover(e: any) {
  //   console.log('e', e);
  // }

  private created() {
    console.log('screenComp', this.screenComp)
  }



}
</script>

<style lang="scss">
  .ads-con{
    position: relative;
    // width: 300px;
    // height: 300px;
  }
  .ads-comp{
    position: absolute;
  }
</style>
