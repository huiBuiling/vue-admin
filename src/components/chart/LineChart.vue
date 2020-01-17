<template>
  <div class="ad-chart-line">
<!--    <h3>{{ msg }}</h3>-->
    <div
      :id="id"
      :style="{height, width, maxWidth: '1024px'}"
    />

    <div style="margin-top: 50px">
      <SmallLineChart
              :chartData = "lineChartData"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import echarts from 'echarts';
import SmallLineChart from '@/components/chart/SmallLineChart.vue';

@Component({
  name: 'lineChart',
  components: {
    SmallLineChart,
  },
})
export default class LineChart extends Vue {
  private msg: string = '线性图';
  private chart: any = {};
  private width: string = '100%';
  private height: string = '400px';
  private id: string = 'line';
  private  lineChart: any = {
      title: {
          text: '未来一周气温变化',
          textStyle:{
              color: '#fff',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: '16',
              borderWidth: '10',
          },
         left: '100',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            right: '10%',
            data: [
                {
                    name: '最高气温',
                    icon: 'circle',
                },
                {
                    name: '最低气温',
                    icon: 'circle',
                },
            ],
        },
        toolbox: {
            show: true,
            feature: {
                magicType: {type: ['line', 'bar']},
            },
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C',
            },
        },
        series: [
            {
                name: '最高气温',
                type: 'line',
                color: "#FC9DB2", // line tooltip color
                lineStyle: { // line color
                    color: "#FA5071"
                },
                smooth: true,
                data: [11, 11, 15, 13, 12, 13, 10],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ],
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ],
                },
            },
            {
                name: '最低气温',
                type: 'line',
                color: "#9DC4FA", // 折线图颜色,搭配markArea为面积图
                lineStyle: { // 折线的颜色
                    color: "#3B9DFC"
                },
                smooth: true, // 平滑处理
                data: [1, -2, 2, 5, 3, 2, 0],
                markPoint: {
                    data: [
                        {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5},
                    ],
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [
                            {
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max',
                            },
                            {
                                symbol: 'circle',
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '最大值',
                                    },
                                },
                                type: 'max',
                                name: '最高点',
                            },
                        ],
                    ],
                },
            },
        ],
    };

  // smallLineChart
  private lineChartData: any = {
      title: '公司福利',
      id: 'lineA',
      chatColor: '137,75,222',
      style: {
        height: '70px',
        width: '100%',
      },
      xAxis: {show: false},
      yAxis: {show: false},
      grid: {
          top: '0',
          bottom: '2%',
          left: '0',
          right: '2%',
      },
      xAxisData: ['绩效奖金','月入2万', '年终分红', '定期旅游', '周末双休',
        '零食丰富','每周羽毛球','周末双休','零食丰富','每周羽毛球'],
      seriesData: [0,80, 40, 178, 40,123,170, 40,123,0],
      series: {
          showSymbol: false,
          areaStyle: {
              color: 'rgb(137,75,222)',  // 线条下面积颜色
          },
      },
  };

  mounted() {
    this.initChart();
  }

  private initChart() {
    this.chart = echarts.init(document.getElementById(this.id) as HTMLDivElement);
    this.chart.setOption(this.lineChart);
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 20px 0;
}
</style>
