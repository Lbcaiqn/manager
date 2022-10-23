<template>
  <div 
    id="echarts-box" 
    ref="echartsBox" 
    style="width: 300px; height: 300px; border:1px solid #fff;"
    >
  </div>
</template>

<script lang="ts">
import {defineComponent,ref,onMounted} from 'vue'
import * as echarts from 'echarts'
export default defineComponent({
  setup(){
    const echartsBox = ref<HTMLElement | null>(null)
    onMounted(() => {
      //拿到DOM元素，并以此DOM实例化echarts实例
      // const charts = echarts.init(document.querySelector('#echarts-box')) as HTMLElement;
       const charts = echarts.init(echartsBox.value as HTMLElement);
      
      //根据配置进行可视化，更多配置详见文档
      charts.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    });
    return {
      echartsBox
    }
  }
})
</script>

<style lang="less">
    
</style>