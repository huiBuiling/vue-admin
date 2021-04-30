<template>
    <div :style="{
        left: start.x + 'px',
        top: start.y + 'px',
        width: width + 'px',
        height: height + 'px',
    }" class="area"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import Grid from './Grid.vue'
import Area from './Area.vue'
/**
 * 画布-center
 */
@Component({
  name: 'screenArea'
})
export default class ScreenArea extends Vue {
  @Prop({default: {x: 0, y: 0}}) private start!: {
    x: number,
    y: number
  };
  @Prop({default: 100}) private width!: number;
  @Prop({default: 100}) private height!: number;
}
</script>

<style lang="scss" scoped>
.area {
    border: 1px solid #70c0ff;
    position: absolute;
}
</style>