<template>
  <div class="screen-con-c ads-con">
    <!-- 网格线 -->
    <Grid />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Grid from './Grid.vue'
/**
 * 画布-center
 */
@Component({
  name: 'screen',
  components: {
    Grid
  }
})
export default class Screen extends Vue {}
</script>

<style lang="scss">
  .ads-con{
    // width: 300px;
    // height: 300px;
  }
</style>>
