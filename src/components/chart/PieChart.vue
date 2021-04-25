<template>
  <div class="ad-chart-pie">
<!--    <h3>{{ msg }}</h3>-->
    <div
      :id="id"
      :style="{height, width}"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import echarts from 'echarts';

@Component({
  name: 'pieChart'
})
export default class PieChart extends Vue {
  private msg: string = '饼状图';
  private chart: any = {};
  private width: string = '100%';
  private height: string = '400px';
  private id: string = 'pie';
  private mounted() {
    this.initChart();
  }

  private initChart() {
    this.chart = echarts.init(document.getElementById(this.id) as HTMLDivElement);
    this.chart.setOption({
        title : {
            text: '南丁格尔玫瑰图',
            x: 'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5',
              'rose6', 'rose7', 'rose8']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name: '半径模式',
                type: 'pie',
                radius : [20, 110],
                center : ['25%', '50%'],
                roseType: 'radius',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [
                    {value: 10, name: 'rose1'},
                    {value: 5, name: 'rose2'},
                    {value: 15, name: 'rose3'},
                    {value: 25, name: 'rose4'},
                    {value: 20, name: 'rose5'},
                    {value: 35, name: 'rose6'},
                    {value: 30, name: 'rose7'},
                    {value: 40, name: 'rose8'}
                ]
            },
            {
                name: '面积模式',
                type: 'pie',
                radius: [30, 110],
                center: ['75%', '50%'],
                roseType: 'area',
                data: [
                    {value: 10, name: 'rose1'},
                    {value: 5, name: 'rose2'},
                    {value: 15, name: 'rose3'},
                    {value: 25, name: 'rose4'},
                    {value: 20, name: 'rose5'},
                    {value: 35, name: 'rose6'},
                    {value: 30, name: 'rose7'},
                    {value: 40, name: 'rose8'}
                ]
            }
        ]
    });
  }

}
</script>

<style scoped lang="scss">
h3 {
  margin: 20px 0;
}
</style>
