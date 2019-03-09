<template>
  <div class="hb-media-box hb-media-box-1" style="flex-wrap: wrap">
    <div class="hb-media-box-hd">
      <img class="hb-media-box-thumb" src="../../../design/images/course-score.jpg"/>
    </div>
    <div class="hb-media-box-bd">
      <div class="hb-media-box-desc">继续教育年度：{{subItem.yearName}}年</div>
      <div class="hb-media-box-desc">每学分：<span class="ci">￥{{priceChangetoDecimal2(subItem.dealPrice)}}</span></div>
      <div class="hb-media-box-desc">学分：{{subItem.purchaseQuantity}}<div class="ci fr">退款金额：￥{{subItem.totalAmount}}</div></div>
    </div>
  </div>
</template>
<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

  .weui-panel__op_sub {
    text-align: right;
    padding: 0px 15px;
    background-color: white;
  }

  .hb-btn-s-sub-cell {
    width: 75px;
    height: 30px;
    line-height: 2.5;
    text-align: center;
    border: 1px solid #ddd;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
    display: inline-block;
    color: #666;
    font-size: 13px;
    margin-top: 7px;
    margin-bottom: 7px;
  }
</style>
<script>
  export default {
    components: {},
    props: {
      channel: String,
      overThree: Boolean,
      subOrderLen: Number,
      subItem: {
        type: Object,
        require: false,
        default: function () {
          return {
            subOrderNo: '',
            subOrderStatus: 1,
            skuId: '',
            skuIdName: '',
            photoPath: '',
            trainingPeriod: 0,
            totalAmount: 0,
            swapOut: false,
            skuPropertyNameList: [
              {
                skuPropertyId: '',
                skuPropertyName: '科目',
                skuPropertyValueId: '',
                skuPropertyValueName: ''
              },
              {
                skuPropertyId: '',
                skuPropertyName: '专业',
                skuPropertyValueId: '',
                skuPropertyValueName: ''
              },
              {
                skuPropertyId: '',
                skuPropertyName: '继续教育年度',
                skuPropertyValueId: '',
                skuPropertyValueName: '2017'
              }
            ]
          }
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      priceChangetoDecimal2: function (x) {
        if (x === undefined) {
          return '0.00'
        }
        var f
        f = parseFloat(x)
        if (isNaN(f)) {
          return false
        }
        f = Math.round(x * 100) / 100
        var s = f.toString()
        var rs = s.indexOf('.')
        if (rs < 0) {
          rs = s.length
          s += '.'
        }
        while (s.length <= rs + 2) {
          s += '0'
        }
        return s
      }
    }
  }
</script>
