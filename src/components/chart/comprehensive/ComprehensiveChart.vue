import SmallLineChart from "*.vue";
<template>
  <div class="ad-chart-complex">
    <div class="ad-chart-complex-i">
      <LineChart
          :chartData = "lineChartData"
      />
    </div>

    <div class="ad-chart-complex-i">
      <ColumnarChart
          :chartData = "columnChartData"
      />
    </div>

    <div class="ad-chart-complex-i">待定</div>
    <div class="ad-chart-complex-i">待定</div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LineChart from '@/components/chart/comprehensive/LineChart2.vue';
import ColumnarChart from '@/components/chart/comprehensive/BarChart2.vue';
@Component({
  name: 'comprehensiveChart',
  components: {
    LineChart,
    ColumnarChart,
  },
})
export default class ComprehensiveChart extends Vue {
  // LineChart
  private lineChartData: any = {
      id: 'lineA',
      chatColor: '137,75,222',
      style: {
        width: '100%',
        height: '70px',
      },
      xAxis: {show: false},
      yAxis: {show: false},
      grid: {
          top: '0',
          bottom: '2%',
          left: '0',
          right: '2%',
      },
      xAxisData: ['绩效奖金', '月入2万', '年终分红', '定期旅游', '周末双休',
        '零食丰富', '每周羽毛球', '周末双休', '零食丰富', '每周羽毛球'],
      seriesData: [0, 80, 40, 178, 40, 123, 170, 40, 123, 0],
      series: {
          showSymbol: false,
          areaStyle: {
              color: 'rgb(137,75,222)',  // 线条下面积颜色
          },
      },
  };

  // columnChart
  private columnChartData: any = {
      id: 'columnA',
      style: {
        width: '100%',
        height: '70px',
      },
      xAxis: {show:  false},
      yAxis: {show: false},
      grid: {
          top: '9',
          bottom: '2%',
          left: '0',
          right: '2%',
      },
      xAxisData: ['绩效奖金', '月入2万', '年终分红', '定期旅游', '周末双休', '零食丰富', '每周羽毛球', '周末双休', '零食丰富', '每周羽毛球'],
      seriesData: [0, 80, 40, 178, 40, 123, 170, 40, 123, 0],
      series: {
          showSymbol: false,
      },
  };
}
</script>
