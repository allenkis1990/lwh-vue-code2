<template>
  <div style="width:100%;height:100%;">
    <circle-statistics
      label-text="年度学分"
      label-color="blue"
      label-fontsize="14"
      :data-source="echarsData"></circle-statistics>
  </div>
</template>

<style lang="less">

</style>

<script>
  import circleStatistics from '@/components/circleStatistics'
  //  import * as storeTypes from '@/store/types'
  export default {
    data () {
      return {
        echarsData: []
      }
    },
    mounted () {
      setTimeout(() => {
        this.echarsData = [
          {
            value: 2, itemName: 'a', itemStyle: {
              color: 'red'
            }
          },
          {
            value: 2, itemName: 'b', itemStyle: {
              color: 'black'
            }
          },
          {
            value: 4, itemName: 'c', itemStyle: {
              color: 'blue'
            }
          },
          {
            value: 5, itemName: 'd', itemStyle: {
              color: 'green'
            }
          },
          {
            value: 7, itemName: 'e', itemStyle: {
              color: 'pink'
            }
          }
        ]
      }, 3000)
//      this.$store.dispatch(storeTypes.LOGIN_LOGIN).then(data => {
//        console.log(data,'aaaaaaaaaa');
//      }).catch(e => {
//        console.log(e,'bbbbbbbbb')
//      })
    },
    computed: {},
    components: {
      circleStatistics
    },
    methods: {}
  }
</script>

