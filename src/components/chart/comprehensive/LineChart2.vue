<template>
  <div
    :id="chartData.id"
    :style="{
      maxWidth: '1024px',
      width: chartData.style.width,
      height: chartData.style.height
    }"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import echarts from 'echarts';
@Component({
  name: 'smallLineChart',
})
export default class SmallLineChart extends Vue {
  @Prop() private chartData: any;
  private chart: any = {};
  private chartOption: any = {};

  mounted() {
    const { isXAxis, xAxis, isYAxis, yAxis,
            chatColor, grid, tooltip, title,
            isSeries, seriesData, series, xAxisData } = this.chartData;
    this.chartOption = {
      // 背景
      // backgroundColor: '#FFF',
      // 显示位置
      grid: grid !== undefined ? grid :{
          top: '9%',
          bottom: '19%',
          left: '6%',
          right: '4%',
      },
      title: {
          text: title,
          textStyle: {
              color: '#fff',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: '16',
              borderWidth: '10',
          },
          left: '100',
        },
      // 提示
      tooltip: tooltip !== undefined ? tooltip : {
          trigger: 'axis',  // 触发类型
          label: {
              show: true,
          },
          axisPointer: {
              type: 'none',  // 指示器类型 line shadow
          },
          backgroundColor: 'rgba(255,255,255,.9)',  // 浮层背景色
          borderWidth: 1,
          // borderColor:chatColor !== undefined ? `rgb(${chatColor})` : 'rgb(245,250,254)',  // 浮层边框色
          borderColor: 'rgba(255,255,255,.9)',
          extraCssText: 'box-shadow: 0 0 10px rgb(174,174,174)',   // 浮层阴影色
          padding: [5],
          textStyle:{
              // 文字样式
              color:'rgba(87,87,87)',
              width: 200,
          },
          // formatter: '{b} : {c}',
          formatter: (data: any) => {
              let color = chatColor !== undefined ? `rgb(${chatColor})` : 'rgb(33,148,246)';
              let html = '';
              html += '<style>p{margin:0;}em{background: ' + color + '}';
              html += 'em{width: 10px;height: 10px;display: inline-block;vertical-align: -5px;margin-right: 8px;border-radius: 50%;}</style>';
              html += '<p><em>&nbsp;</em>' + data[0].name + ' : ' + data[0].data + '</p>';
              return html;
          },
      },
      xAxis: isXAxis ? xAxis : {
          boundaryGap: true, // 默认，坐标轴留白策略
          axisLine: {
              show: false,
          },
          splitLine: {
              show: false,
          },
          axisTick: {
              show: false,
              alignWithLabel: true,
          },
          data: xAxisData && xAxisData.length > 0 ? xAxisData : ['aa', 'bb', 'cc'],
          ...xAxis,
      },
      yAxis: isYAxis ? yAxis : {
          axisLine: {
              show: false,
          },
          splitLine: {
              show: true,
              lineStyle: {
                  // 有坐标轴
                  type: 'dashed',  // 背景线条类型
                  color: chatColor !== undefined ? `rgba(${chatColor},.2)` : 'rgba(33,148,246,.2)',   // 背景线条颜色
              }
          },
          axisTick: {
              show: false,
          },
          splitArea: {
              show: true,
              areaStyle: {
                  // 有坐标轴
                  color: chatColor !== undefined ? `rgb(${chatColor})` : 'rgb(245,250,254)', // 背景颜色
              },
          },
          ...yAxis,
      },
      // 数据
      series: isSeries ? series : [{
          type: 'line',
          symbol: 'circle',
          symbolSize: 4,
          smooth: true,  // 平滑处理
          areaStyle: {
              color: chatColor !== undefined ? `rgba(${chatColor},.4)` : 'rgba(33,148,246,.4)',  // 线条下面积颜色，不设置默认为线条颜色
          },
          lineStyle: {
              color: chatColor !== undefined ? `rgb(${chatColor})` : 'rgb(33,148,246)',   // 线条颜色
              shadowBlur: 12,
              shadowColor: chatColor !== undefined ? `rgba(${chatColor},.9)` : 'rgba(33,148,246,.9)', // 外层面积阴影背景色
              shadowOffsetX: 1,
              shadowOffsetY: 1
          },
          itemStyle: {
              color: chatColor !== undefined ? `rgb(${chatColor})` : 'rgb(33,148,246)',  // 圆点颜色
              borderWidth: 1,
              borderColor: '#FFF',
          },
          data: seriesData && seriesData.length > 0 ? seriesData :['300', '400', '500'],
          ...series,
      }],
  };
    this.initChart();
  }

  private initChart() {
    this.chart = echarts.init(document.getElementById(this.chartData.id) as HTMLDivElement);
    this.chart.setOption(this.chartOption);
  }
}
</script>
