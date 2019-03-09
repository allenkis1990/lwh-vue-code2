<template>
  <div style="width:100%;height:100%;" :class="className"></div>
</template>
<style lang="less"></style>
<script>
  var echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/pie')
  //  require('echarts/lib/component/tooltip');
  export default {
    data: function () {
      return {}
    },
    props: {
      dataSource: {
        type: Array
      },
      className: {
        type: String
      }
    },
    methods: {
      setEchartsOption (echartsData) {
//        let _this = this;
        var myChart = echarts.init(document.getElementsByClassName(this.className)[0])
        var option = {
//          tooltip: {
//            trigger: 'item',
//            formatter: '{a} <br/>{b} : {c} ({d}%)'
//          },
//          legend: {
//            orient: 'vertical',
//            left: 'left',
//            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
//          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
//              饼图占容器的百分比
              radius: '67%',
              labelLine: {
                smooth: true,
                length: 0,
                length2: 20
              },
              center: ['50%', '50%'],
              data: echartsData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        myChart.setOption(option)
      }
    },
    mounted () {
    },
    watch: {
      dataSource: {
        handler (nv, ov) {
          console.log(nv, 'data')
          if (nv && nv.length) {
            this.setEchartsOption(nv)
          }
        },
        deep: true,
        immediate: true
      }
//      dataSource: function (nv) {
//        if (nv && nv.length) {
//          this.areaList = nv
//        }
//      }
    }
  }
</script>
