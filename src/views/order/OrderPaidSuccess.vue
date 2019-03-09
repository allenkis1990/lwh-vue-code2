<template>
  <!--结算成功-->
  <div class="contain hb-box">
    <div>
      <div class="hb-box-bd">
        <div class="hb-msg bor-b20">
          <img class="icon-success" src="../../../design/images/icon-success.png"/>
          <div class="fs30 mt20">支付成功</div>
        </div>
        <div class="weui-panel hb-panel bor-b20">
          <div class="weui-panel__hd">订单信息</div>
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div><span class="tit">订单号</span>{{orderInfo.orderNo}}</div>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div><span class="tit">下单时间</span>{{orderInfo.createTime}}</div>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div><span class="tit">付款金额</span><span class="ml10 ci">¥{{priceChangetoDecimal2(orderInfo.totalAmount)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-top-tip" v-show="orderInfo.haveCompulsoryCourse">
          系统将为你进行必修课程选课，选课结果<a href="javascript:void(0);" @click="goToSelectCourseLog()">查看选课记录>>”</a>
          <img src="../../../design/images/tag-required.png" class="tag"/>
        </div>
        <div class="order-tip2"
             v-show="orderInfo.courseLevel != undefined && orderInfo.courseLevel != null && orderInfo.courseLevel.length > 0 && orderInfo.firstPurchase">
          <div class="pic"><img src="../../../design/images/icon-warning.png"/></div>
          <div class="text">平台赠送您会计{{orderInfo.courseLevel}}职称考试辅导课程，请进入小程序“我的-考前辅导课程”学习。</div>
        </div>
        <div class="weui-panel hb-panel">
          <div class="weui-panel__hd">学分内容</div>
          <div class="weui-panel__bd">
            <div class="hb-media-box" v-for="(item,index) in orderInfo.subOrderList">
              <div class="hb-media-box-hd">
                <img class="hb-media-box-thumb" src="../../../design/images/course-score.jpg"/>
                <!--<div class="label">{{getClassTypeInSkuList(item.skuPropertyNameList) === 0 ? '面授班' : '网络班'}}</div>-->
              </div>
              <div class="hb-media-box-bd">
                <!--<div class="hb-media-box-title">{{item.skuName}}</div>-->
                <div class="hb-media-box-desc">继续教育年度：{{item.yearName}}年</div>
                <div class="hb-media-box-desc">每学分：<span class="ci">¥ {{priceChangetoDecimal2(item.dealPrice)}}</span></div>
                <div class="hb-media-box-desc">学分：{{item.purchaseQuantity}}</div>
              </div>
              <!--<div class="order-info-box">-->
                <!--<div></div>-->
                <!--<div>实付<span class="ml10 ci">¥ {{item.totalAmount}}</span></div>-->
              <!--</div>-->
            </div>
          </div>
        </div>
      </div>

      <div class="hb-tabbar">
        <div class="hb-btn-w hb-btn-3" @click="goToOrderDetailAction">查看订单详情</div>
        <div class="hb-btn hb-btn-3" @click="goToSelectCourseAction">进入选课培训</div>
      </div>
    </div>
    <!--<go-study-dialog :show="showGoStudyDialog" @hide="closeStudyDialog"></go-study-dialog>-->
  </div>
</template>

<style lang="less">
</style>
<script>
//  import goStudyDialog from '@/components/goStudyDialog'

  export default {
    components: {
//      goStudyDialog: goStudyDialog
    },
    data () {
      return {
        orderInfo: {
          orderNo: '',
          createTime: '',
          totalAmount: '',
          subOrderList: []
        },
//        showGoStudyDialog: false
      }
    },
    computed: {},
    methods: {
//      getClassTypeInSkuList (skuList) {
//        // 返回0：面授班，1：网授班
//        for (let i = 0; i < skuList.length; i++) {
//          if (skuList[i].skuPropertyCode === 'trainingType') {
//            if (skuList[i].skuPropertyValueName === '面授班') {
//              return 0
//            } else {
//              return 1
//            }
//          }
//        }
//      },
//      creditPhoto (item) {
//        return require(item.photoPath)
//      },
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
      },
//      getSkuValueName: function (skuArr, skuName) {
//        if (!skuArr) {
//          return ''
//        }
//        var str = ''
//        skuArr.forEach(function (item) {
//          if (item.skuPropertyName === skuName) {
//            str = item.skuPropertyValueName
//          }
//        })
//        return str
//      },
      /**
       * 跳转至订单详情页面
       */
      goToOrderDetailAction () {
        this.push({
          path: '/orderDetail',
          query: {
            orderNo: this.orderInfo.orderNo
          }
        })
      },
      /**
       * 跳转至选课培训界面
       */
      goToSelectCourseAction () {
        this.push({
          path: '/demo/courseSelectionTrain'
        })
      },
      /**
       * 跳转至选课记录
       */
      goToSelectCourseLog () {
        this.push({
          path: 'compulsoryCourseList',
          query: {
            currentYear: this.orderInfo.subOrderList[0].yearName
          }
        })
      },
//      /**
//       * 跳转至我的学习页面
//       */
//      goToMyStudyListAction () {
//        this.showGoStudyDialog = true
//        console.log('打开小程序学习二维码')
//      },
//      closeStudyDialog () {
//        this.showGoStudyDialog = false
//        console.log('关闭')
//      }
    },
    mounted () {
      if (this.$store.state.orderModule.payOrderInfo) {
        this.orderInfo = this.$store.state.orderModule.payOrderInfo
        console.log(this.orderInfo, '传递过来的payOrderInfo')
      } else {
        this.toast('数据错误')
      }
    }
  }
</script>
