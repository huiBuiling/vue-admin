<template>
  <div class="ad-chart">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'chart'
})
export default class ChartView extends Vue {}
</script>
