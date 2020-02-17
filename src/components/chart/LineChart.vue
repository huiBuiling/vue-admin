<template>
  <div class="ad-chart-line">
    <div
      :id="id"
      :style="{height, width, maxWidth: '1024px'}"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import echarts from 'echarts';

@Component({
  name: 'lineChart',
})
export default class LineChart extends Vue {
  private chart: any = {};
  private width: string = '100%';
  private height: string = '400px';
  private id: string = 'line';
  private  lineChart: any = {
      title: {
          text: '未来一周气温变化',
          textStyle: {
              color: '#333',
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
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
                color: '#FC9DB2', // line tooltip color
                lineStyle: { // line color
                    color: '#FA5071',
                },
                smooth: true,
                data: [11, 11, 15, 13, 12, 13, 10],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'},
                    ],
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                    ],
                },
            },
            {
                name: '最低气温',
                type: 'line',
                color: '#9DC4FA', // 折线图颜色,搭配markArea为面积图
                lineStyle: { // 折线的颜色
                    color: '#3B9DFC',
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

  private mounted() {
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
