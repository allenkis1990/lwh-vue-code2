<template>
  <div style="width:100%;height:100%;" :class="className"></div>
</template>
<style lang="less"></style>
<script>
  var echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/pie')
  export default {
    data: function () {
      return {}
    },
    props: {
      dataSource: {
        type: Array
      },
      labelText: {
        type: String
      },
      labelColor: {
        type: String
      },
      labelFontsize: {
        type: String
      },
      className: {
        type: String
      }
    },
    methods: {
      setLabelText (data) {
        data.forEach((item) => {
          item.name = this.labelText
        })
      },
      setEchartsOption (echartsData) {
        let _this = this
        var myChart = echarts.init(document.getElementsByClassName(this.className)[0])
        if (this.labelText) {
          this.setLabelText(echartsData)
        }
        var option = {
//        legend: {
//          orient: 'vertical',
//          x: 'left',
//          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
//        },
          series: [
            {
              name: '访问来源',
//            取消放大
              hoverAnimation: false,
              type: 'pie',
//            第一个为内半径，第二个为外半径
              radius: ['75%', '95%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  textStyle: {
                    fontSize: _this.labelFontsize,
                    color: _this.labelColor
                  }
                }
//              emphasis: {
//                show: true,
//                textStyle: {
//                  fontSize: '30',
//                  fontWeight: 'bold',
//                  color: 'red'
//                }
//              }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: echartsData
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
