<template>
  <div class="ad-chart-column">
    <div
      :id="chartData.id"
      :style="{
        maxWidth: '1024px',
        width: chartData.style.width,
        height: chartData.style.height
      }"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import echarts from 'echarts';
@Component({
  name: 'columnarChart'
})
export default class ColumnarChart extends Vue {
  private chart: any = {};
  private chartOption: any = {};
  private chartData: any = {
    id: 'columnA',
    style: {
      width: '100%',
      height: '100%'
    }
  };
  private xAxisData: any = [];
  private data1: any = [];
  private data2: any = [];
  private data3: any = [];
  private data4: any = [];
  private emphasisStyle: object = {
      itemStyle: {
          barBorderWidth: 1,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(0,0,0,0.5)'
      }
  };

  private mounted() {
    for (let i = 0; i < 10; i++) {
      this.xAxisData.push('Class' + i);
      this.data1.push((Math.random() * 2).toFixed(2));
      this.data2.push(-Math.random().toFixed(2));
      this.data3.push((Math.random() * 5).toFixed(2));
      this.data4.push((Math.random() + 0.3).toFixed(2));
  }

    this.chartOption = {
        // backgroundColor: '#fff',
        legend: {
            data: ['bar', 'bar2', 'bar3', 'bar4'],
            left: 10
        },
        brush: {
            toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
            xAxisIndex: 0
        },
        toolbox: {
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                dataView: {}
            }
        },
        tooltip: {},
        xAxis: {
            data: this.xAxisData,
            name: 'X Axis',
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false}
        },
        yAxis: {
            inverse: true,
            splitArea: {show: false}
        },
        grid: {
            left: 100
        },
        visualMap: {
            type: 'continuous',
            dimension: 1,
            text: ['High', 'Low'],
            inverse: true,
            itemHeight: 200,
            calculable: true,
            min: -2,
            max: 6,
            top: 60,
            left: 10,
            inRange: {
                colorLightness: [0.4, 0.8]
            },
            outOfRange: {
                color: '#bbb'
            },
            controller: {
                inRange: {
                    color: '#2f4554'
                }
            }
        },
        series: [
            {
                name: 'bar',
                type: 'bar',
                stack: 'one',
                emphasis: this.emphasisStyle,
                data: this.data1
            },
            {
                name: 'bar2',
                type: 'bar',
                stack: 'one',
                emphasis: this.emphasisStyle,
                data: this.data2
            },
            {
                name: 'bar3',
                type: 'bar',
                stack: 'two',
                emphasis: this.emphasisStyle,
                data: this.data3
            },
            {
                name: 'bar4',
                type: 'bar',
                stack: 'two',
                emphasis: this.emphasisStyle,
                data: this.data4
            }
        ]
    };
    this.initChart();
  }

  private initChart() {
    this.chart = echarts.init(document.getElementById(this.chartData.id) as HTMLDivElement);
    this.chart.setOption(this.chartOption);
  }
}
</script>
