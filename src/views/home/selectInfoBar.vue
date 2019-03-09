<template>
  <div class="exchange-pool b0"
       :class="{'disabled':countObj.courseCount<=0}"
       style="z-index: 1002;position:fixed"
       @click="goShoppingCart()">
    <div class="pic"><img :src="shopCarSrc()"/></div>
    <div class="text">
      {{$parent.yearCode}}年度，已选{{countObj.courseCount}}门，其中公需科目{{countObj.hasAddPublicCredit}}学分，专业科目{{countObj.hasAddProfessionalCredit}}学分
    </div>
    <div class="pic2" style="background:none"><img src="../../../design/images/icon-go-bgw.png"/></div>
  </div>
</template>
<style lang="less"></style>
<script>
  import * as storeTypes from '@/store/types'

  export default {
    data: function () {
      return {
        hasLoadSkuSearchList: false,
        countObj: {}
      }
    },
    props: {
      yearSkuArr: {
        type: Array
      },
//      auto为true的时候bar只要在yearSkuArr监听到有值就刷新，
//      不传auto的时候bar需要手动调用countShoppingCartCredit更新
      auto: {
        type: String
      }
    },
    methods: {
      shopCarSrc(){
       if(this.countObj.courseCount && this.countObj.courseCount>0){
         return require("../../../design/images/icon-pool.png")
       } else {
         return require("../../../design/images/icon-pool-dis.png")
       }
      },
      goShoppingCart () {
        this.$router.push('/demo/shoppingCart')
      },
      //      获取购物车中某个年度选课数据汇总
      countShoppingCartCredit (arr) {
        let params = {
          skuPropertyKeyValueList: arr
        }
        this.$store.dispatch(storeTypes.COUNT_SHOPPINGCART_CREDIT, params).then((data) => {
          this.$vux.loading.hide()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.hasLoadSkuSearchList = true
            this.countObj = data.data.statisticInfo
          } else {
            this.toast('请求失败')
          }
        })
      }
    },
    mounted () {
    },
    watch: {
      yearSkuArr: {
        handler (nv, ov) {
          if (nv && nv.length && this.auto) {
            if (!this.hasLoadSkuSearchList) {
              this.countShoppingCartCredit(nv)
            }
          }
        },
        deep: true
      }
    }
  }
</script>
