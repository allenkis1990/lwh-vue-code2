<template>
  <div class="contain hb-box">
    <div class="hb-box-bd">
      <div class="order-top-tip" v-show="$store.state.orderModule.compulsoryConfig.firstPurchase && ($store.state.orderModule.compulsoryConfig.publicCompulsoryCount>0 || $store.state.orderModule.compulsoryConfig.publicCompulsoryCount>0)">
        根据《会计专业技术人员继续教育实施办法》规定{{$store.state.orderModule.compulsoryConfig.year}}年度，需完成<em>{{$store.state.orderModule.compulsoryConfig.publicCompulsoryCount}}</em>门公需科目的<em>{{$store.state.orderModule.compulsoryConfig.purchaseCompulsoryPublicCredit}}</em>学分、<em>{{$store.state.orderModule.compulsoryConfig.professionalCompulsoryCount}}</em>
        门专业科目的<em>{{$store.state.orderModule.compulsoryConfig.purchaseCompulsoryProfessionalCredit}}</em>学分的必修课程，共<em>{{$store.state.orderModule.compulsoryConfig.purchaseCompulsoryPublicCredit+$store.state.orderModule.compulsoryConfig.purchaseCompulsoryProfessionalCredit}}</em>学分。<a href="javascript:void(0);" @click="goToSelectCourseLog()">查看必修课程</a>
        <img src="../../../../design/images/tag-required.png" class="tag" />
      </div>
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">购买学分</div>
        <div class="weui-panel__bd">
          <div class="hb-media-box">
            <div class="hb-media-box-hd">
              <img class="hb-media-box-thumb" src="../../../../design/images/course-score.jpg" />
            </div>
            <div class="hb-media-box-bd">
              <div class="hb-media-box-desc">继续教育年度：{{$store.state.orderModule.compulsoryConfig.year}}</div>
              <div class="hb-media-box-desc">学分单价：<span class="ci">￥{{$store.state.orderModule.compulsoryConfig.unitPrice}}</span></div>
              <div class="course-exchange">
                <div class="num">
                  <div class="icon" @click="opSelectCredit('jian')"><img src="../../../../design/images/icon-minus.png" /></div>
                  <input type="number"
                         style="width:100%;height:100%;border:none"
                         v-model="selectCredit"
                         class="text">
                  <div class="icon" @click="opSelectCredit('jia')"><img src="../../../../design/images/icon-plus-cur.png" /></div>
                </div>
                <div class="unit">学分</div>
              </div>
            </div>
          </div>
        </div>
        <div class="weui-cells">
          <div class="order-tip">
            <img src="../../../../design/images/icon-warning.png" />
            <div class="text">{{$store.state.orderModule.compulsoryConfig.year}}年度，已购买<em>{{$store.state.orderModule.compulsoryConfig.purchaseCredit}}</em>学分<span  v-show="$store.state.orderModule.compulsoryConfig.freezeCredit != undefined && $store.state.orderModule.compulsoryConfig.freezeCredit>0">（其中{{$store.state.orderModule.compulsoryConfig.freezeCredit}}学分处于退款中）</span>，还需购买<em>{{$store.state.orderModule.compulsoryConfig.purchaseCountCredit - $store.state.orderModule.compulsoryConfig.purchaseCredit}}</em>学分，才可完成该年度的继续教育学习！</div>
          </div>
        </div>
      </div>
      <div class="weui-panel hb-panel" v-if="isShowInvoiceInfo(totoalPrice,preConditionInfo.type)">
        <div class="weui-panel__hd">发票</div>
        <div class="weui-cells">
          <div class="weui-cell" @click="changeIsNeedInvoiceAction">
            <div class="weui-cell__bd">
              <div>索要发票</div>
            </div>
            <div class="weui-cell__ft hb-form-box">
              <div class="hb-form">
                <img class="img"
                     v-if="!isNeedInvoice"
                     src="../../../../design/images/radio.png" alt=" "/>
                <img class="img"
                     v-if="isNeedInvoice"
                     src="../../../../design/images/radio-checked.png" alt=" "/>
              </div>
            </div>
          </div>
          <div class="weui-cell weui-cell_access"
               v-if="isNeedInvoice"
               @click='chooseInvoiceTypeAction'>
            <div class="weui-cell__bd">
              <div class="to"><span class="tit">发票</span>{{$store.state.orderModule.showInvoiceTypeText}}</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="hb-tabbar">
      <div class="left-box">待付金额<span class="ci fs40 ml20">￥{{toDecimal2(totoalPrice)}}</span></div>
      <div :class="['hb-btn',getShowSubmitButtonClass(selectCredit,preConditionInfo.type,totoalPrice,isNeedInvoice,$store.state.orderModule.invoiceInfo,certificateSendInfo,isCreatingOrder)]" @click="creatOrderAction">提交订单</div>
    </div>
    <PopGuide ref="popGuideRef" @closeFunc="closeStudyDialog"></PopGuide>
  </div>
</template>

<style lang="less">

  .lwh-popup-picker .hb-panel .weui-cell {
    padding: 0
  }
  .payAccountTit{position:absolute;left:2.2rem;top:0.08rem;display:inline-block;width:4rem;overflow:hidden;text-overflow: ellipsis;white-space: nowrap}
</style>

<script>
  import * as storeTypes from '@/store/types'
  import utils from '@/common/util/Utils'
  import constant from '@/global/constants/AppConstant'
  import PopGuide from '@/components/StudyQrcodeComponent'
  import Global from '@/global/global'
  export default {
    components: {
      PopGuide: PopGuide
    },
    beforeRouteLeave (to, from, next) {
      console.log(to,'去')
      console.log(from,'来')
      if (to.path !== '/configInvoiceInfo' && to.path !== '/configInvoiceDeliver') {
        this.$store.dispatch(storeTypes.ORDER_SET_CREATE_TEMP_INVOICE_INFO, {})
        this.$store.dispatch(storeTypes.ORDER_INVOICE_TEXT, '请选择发票类型')
        this.$store.dispatch(storeTypes.ORDER_INVOICE_DER_TEXT, '请选择配送方式')
      }
      next()
    },
    data () {
      return {
        traningShoopingItems: [],
        firstTrainingItem: {},
        totoalPrice: 0,
        showString: '',
        isShowMoreTrainingContent: false,
        preConditionInfo: {type: 4},
        isNeedInvoice: false,
        showInvoiceSendText: '请选择配送方式',
        showInvoiceTypeText: '请选择发票类型',
        invoiceInfo: {},
        certificateSendInfo: {},
        isCreatingOrder: false,
        payAccountList: [],
        payAccountId: null,
        maxSelectCredit: '',
        minSelectCredit: '',
        currentYearName: 2018,
        paymentChannel : '',
        orderNo: '',
        tempValue: 0
      }
    },
    computed: {
      selectCredit: {
        get() {
          var value = this.tempValue;
          if (value <= this.minSelectCredit) {
            return this.minSelectCredit
          } else if (value >= this.maxSelectCredit) {
            return this.maxSelectCredit
          } else {
            return parseInt(value)
          }
        },
        set(val) {
          this.tempValue = val;
        }
      }
    },
    mounted () {
//      var that = this
      // 获取将要购买的商品列表
//      var skuList = []
//      try {
//        var value = this.$store.state.orderModule.selectedShoopingItemsArray
//        if (value.length) {
//          this.traningShoopingItems = value
//          this.firstTrainingItem = value[0]
//          console.log(this.firstTrainingItem)
//          for (let index = 0; index < value.length; index++) {
//            let item = value[index]
//            this.totoalPrice += (item.originalPrice || item.dealPrice)
//          }
//          console.log(value)
//          console.log(value.length, '99')
//          如果从配置发票页面返回发票信息填写了那么需要发票打勾
          if ((this.$store.state.orderModule.showInvoiceTypeText && this.$store.state.orderModule.showInvoiceTypeText !== '请选择发票类型') || this.$store.state.orderModule.isNeedInvoice) {
            this.isNeedInvoice = true
          }
//          如果从配置发票配送页面返回配送信息填写了那么需要发票打勾
          if ((this.$store.state.orderModule.showInvoiceSendText && this.$store.state.orderModule.showInvoiceSendText !== '请选择配送方式') || this.$store.state.orderModule.isNeedInvoice) {
            this.isNeedInvoice = true
          }
//          if (value.length >= 2) {
//            var showString = '共' + value.length + '个培训内容，点击查看更多'
//            this.showString = showString
//            this.isShowMoreTrainingContent = true
//          }
//          console.log(skuList)
//          value.forEach(function (item) {
//            skuList.push(item.skuId)
//          })
//          console.log(skuList)
//        }
//      } catch (e) {
//      }
//      if (skuList.length) {
//        this.loadPayAccountIds(skuList).then(function (data) {
//          that.$vux.loading.hide()
//          if (data.code === 200) {
//            console.log(data.data, '99')
//            if (data.data.length > 0) {
//              console.log(data.data, '99')
//              that.payAccountList = data.data
//              that.payAccountId = data.data[0].rootId ? data.data[0].rootId : data.data[0].id
//              that.payAccountId = data.data[0].id
//              that.loadPreconditionData(that.payAccountId)
//            } else {
//              that.$vux.alert.show({
//                title: '提示',
//                content: '当前报名的培训内容，无收款账号，请联系平台客服反馈此情况'
//              })
//            }
//          } else {
//            that.$vux.alert.show({
//              title: '提示',
//              content: data.message
//            })
//            that.toast(data.message)
//          }
//        }, function (data) {
//          that.$vux.loading.hide()
//          that.toast(data.message)
//        })
//      }
//      this.loadPreconditionData()
      this.currentYearName = this.$route.query.currentYear;
//      this.selectCredit = that.$route.query.currentCredit;

      this.selectPaymentChannel(); // 设置支付渠道
      this.loadPreconditionData();
      this.requestCompulsoryCourseConfig();
    },
    methods: {
      /**
       * 设置支付渠道
       */
      selectPaymentChannel() {
        if (Global.isWeiXin()){
          this.paymentChannel = 'WECHAT_OFFICIAL_ACCOUNTS';
        }else {
          this.paymentChannel = 'HTML5';
        }
      },
      /**
       * 跳转至选课记录
       */
      goToSelectCourseLog(){
       this.push({
         path: 'compulsoryCourseList',
         query: {
           currentYear:this.currentYearName
         }
       })
      },
      /**
       * 网络请求---获取必修课配置信息
       */
      requestCompulsoryCourseConfig(){
        var _this = this;
//        _this.showLoading('加载中.....')
        _this.$store.dispatch(storeTypes.ORDER_GET_COMPULSORY_COURSE_CONFIG, {
          yearName: _this.currentYearName}).then(data => {
//          _this.hideLoading();
          if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            _this.toast(data.head.message)
          }else {
            _this.calculationCreditMethod();
          }
        }).catch(e => {
//          _this.hideLoading();
          console.log('error>>>>>>>' + e)
        })
      },
      // 根据《会计专业技术人员继续教育实施办法》
      calculationCreditMethod(){
        if (this.$store.state.orderModule.saveSelectCredit!=undefined){
          this.selectCredit = this.$store.state.orderModule.saveSelectCredit;
        }else {
          this.selectCredit = this.$store.state.orderModule.compulsoryConfig.recommendedPurchaseCredit;
        }
        if(this.$store.state.orderModule.compulsoryConfig.firstPurchase){ // 第一次购买
          this.maxSelectCredit = this.$store.state.orderModule.compulsoryConfig.recommendedPurchaseCredit;
          this.minSelectCredit = 0;
        }else {
          this.maxSelectCredit = this.$store.state.orderModule.compulsoryConfig.recommendedPurchaseCredit;
          this.minSelectCredit = 0;
        }
      },
      // 加或者减学分
      opSelectCredit (type) {
        if (type === 'jia') {
          if (this.selectCredit === this.maxSelectCredit) {
            return false
          }
          this.selectCredit ++
        } else {
          if (this.selectCredit === this.minSelectCredit) {
            return false
          }
          this.selectCredit --
        }
      },
      getClassTypeInSkuList (skuList) {
        // 返回0：面授班，1：网授班
        for (let i = 0; i < skuList.length; i++) {
          if (skuList[i].skuPropertyCode === 'trainingType') {
            if (skuList[i].skuPropertyValueName === '面授班') {
              return 0
            } else {
              return 1
            }
          }
        }
      },
//      chosePayAccount: function (item) {
//        if (item.id === this.payAccountId) {
//          return false
//        }
//        this.payAccountId = item.rootId ? item.rootId : item.id
//        this.payAccountId = item.id
//        this.loadPreconditionData(this.payAccountId)
//      },
      modalConfirmAction () {
//        wx.redirectTo({
//          url: '/pages/order/orderDetail/orderDetail?orderNo=' + this.data.orderNo,
//        })
        this.push({
          path: '/orderDetail',
          query: {
            orderNo: this.orderNo
          }
        });
        console.log('去订单详情')
      },
      goToMyStudyListAction() {
//        this.$refs.popGuideRef.show();
//        console.log('打开小程序学习二维码')
        this.push({
          path: '/demo/courseSelectionTrain'
        })
      },
      closeStudyDialog() {
        this.loadOrderInfoAndGoPaySuccess()
        console.log('关闭')
      },
      loadOrderInfoAndGoPaySuccess () {
        var that = this
        let params = {
          orderNo: that.orderNo,
          paymentChannel: 'WECHAT_OFFICIAL_ACCOUNTS'
        }
        this.$vux.loading.show({
          text: '加载中'
        })
        var type = 'get'
        var url = constant.apiUrl.createOrderModule.orderPayOrderInfo
        utils.getAjaxData(type, params, url).then(res => {
          this.$vux.loading.hide()
          if (res.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            return this.toast(res.head.message)
          } else {
            this.payOrderInfo = res.data
            try {
              this.$store.state.orderModule.payOrderInfo = this.payOrderInfo
            } catch (e) {}
            this.push({path: '/orderPaidSuccess'})
          }
        }).catch(e => {
          console.log(e)
          this.$vux.loading.hide()
          return this.toast('请求失败')
        })
      },
      submitOrder: function (params) {
        let context = this
        if (this.isCreatingOrder) {
          return
        }
        this.isCreatingOrder = true
        console.log('可以提交订单了',params)
        this.$vux.loading.show({
          text: '订单创建中...'
        })
        var type = 'post'
        var url = constant.apiUrl.createOrderModule.orderCreat
        utils.getAjaxData(type, params, url).then(res => {
          setTimeout(function () {
            context.isCreatingOrder = false
          }, 500)
          this.$vux.loading.hide()
          if (res.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            if (res.head.code === 600) {
              context.commonConfirm(context, res)
            } else {
              return context.$vux.alert.show({
                title: '提示',
                content: res.head.message
              })
//              return this.toast(res.head.message)
            }
          } else {
            if (context.totoalPrice === 0) {
              context.orderNo = res.data.data.orderNo
//              context.customModal.show()
              this.$vux.confirm.show({
                title: '系统提示',
                content: '该订单为0元订单，无需支付!',
                confirmText: '进入选课培训',
                cancelText: '查看订单详情',
                onCancel: function () {
                  context.modalConfirmAction()
                },
                onConfirm: function () {
                  context.goToMyStudyListAction()
                }
              })
            } else {
//              context.$store.state.fromWhere = 'create'
              context.push({
                path: '/orderPay',
                query: {
                  orderNo: res.data.data.orderNo,
//                  fromWhere: 'create'
                }
              })
              console.log('去支付')
            }
          }
        }).catch(e => {
          console.log(e)
          this.isCreatingOrder = false
          this.$vux.loading.hide()
          return this.toast('请求失败')
        })
//        let context = this
//        this.setData({
//          isCreatingOrder: true
//        })
//        wx.showLoading({
//          title: '订单创建中...',
//        })
//        app.requestData(app.config.orderCreat, params, 'POST').then(function (response) {
//          wx.hideLoading()
//          setTimeout(function () {
//            if (context) {
//              context.setData({
//                isCreatingOrder: false
//              })
//            }
//          }, 500)
//          if (response.head.code == app.constant.network_result_success) {
//            if (context.data.totoalPrice == 0) {
//              context.setData({
//                orderNo: response.data.orderNo
//              })
//              context.customModal.show()
//            } else {
//              wx.redirectTo({
//                url: '/pages/order/orderPay/orderPay?orderNo=' + response.data.orderNo,
//              })
//            }
//          } else {
//
//            wx.showToast({
//              title: response.head.message,
//              icon: 'none'
//            })
//          }
//        }).catch(function (error) {
//          wx.hideLoading()
//          context.setData({
//            isCreatingOrder: false
//          })
//          wx.showToast({
//            title: '数据请求失败!',
//            icon: 'none'
//          })
//        })
      },
      // 校验订单为电子发票并金额数大于1000  纸制发票大于10000 的情况
      checkOrderSuitableAndInvoiceType: function () {
        if (this.isNeedInvoice && this.$store.state.orderModule.invoiceInfo.invoiceType === 2 && this.totoalPrice > 1000) {
          this.toast('由于本单位电子发票的面额最大为1000元，因此无法整笔购买，请拆分下单购买！')
          return false
        }
        if (this.isNeedInvoice && this.$store.state.orderModule.invoiceInfo.invoiceType !== 2 && this.totoalPrice > 10000) {
          this.toast('由于本单位纸制发票的面额最大为10000元，因此无法整笔购买，请拆分下单购买！')
          return false
        }
        return true
      },
//       检测信息是否已经填写
      checkInfoCorrent: function () {
        if (this.selectCredit < 1) {
          this.toast('请输入购买学分！')
          return false
        }
        if(this.$store.state.orderModule.compulsoryConfig.firstPurchase){ // 第一次购买
          var tempCompulsoryCredit = this.$store.state.orderModule.compulsoryConfig.purchaseCompulsoryProfessionalCredit + this.$store.state.orderModule.compulsoryConfig.purchaseCompulsoryPublicCredit;
          if (this.selectCredit < tempCompulsoryCredit) {
            this.toast('请至少购买' + tempCompulsoryCredit + '学分，用于必修课程选课！')
            return false
          }
        }
//         0元订单的情况
        if (this.totoalPrice === 0) {
          if (this.preConditionInfo.type === 2 || this.preConditionInfo.type === 3 || this.preConditionInfo.type === 4) {
            if (this.certificateSendInfo.deliverType === undefined) {
              this.toast('请完善证明配送信息！')
              return false
            }
          } else {
            return true
          }
        }
        if (this.totoalPrice !== 0) {
          switch (this.preConditionInfo.type) {
            case 1: {
              if (this.isNeedInvoice) {
                if (this.$store.state.orderModule.invoiceInfo.invoiceType === undefined) {
                  this.toast('请填写发票信息！')
                  return false
                }
                if (this.$store.state.orderModule.invoiceInfo.invoiceType === 2) {
                  return true
                } else {
                  if (this.$store.state.orderModule.invoiceInfo.deliverType === undefined) {
                    this.toast('请完善发票配送信息！')
                    return false
                  }
                }
              } else {
                return true
              }
              break
            }
            case 2: {
              if (this.certificateSendInfo.deliverType === undefined) {
                this.toast('请完善证明配送信息！')
                return false
              }
              break
            }
            case 3: {
              if (this.isNeedInvoice) {
                if (this.$store.state.orderModule.invoiceInfo.invoiceType === undefined) {
                  this.toast('请填写发票信息！')
                  return false
                }
                if (this.$store.state.orderModule.invoiceInfo.invoiceType === 2) {
                  if (this.certificateSendInfo.deliverType === undefined) {
                    this.toast('请完善证明配送信息！')
                    return false
                  }
                } else {
                  if (this.certificateSendInfo.deliverType === undefined) {
                    this.toast('请完善配送信息！')
                    return false
                  }
                }
              }
              break
            }
            case 4: {
              if (this.isNeedInvoice) {
                if (this.$store.state.orderModule.invoiceInfo.invoiceType === undefined) {
                  this.toast('请填写发票信息！')
                  return false
                }
                if (this.$store.state.orderModule.invoiceInfo.invoiceType === 2) {
                  if (this.certificateSendInfo.deliverType === undefined) {
                    this.toast('请完善证明配送信息！')
                    return false
                  }
                } else {
                  if (this.$store.state.orderModule.invoiceInfo.deliverType === undefined) {
                    this.toast('请完善发票配送信息！')
                    return false
                  }
                  if (this.certificateSendInfo.deliverType === undefined) {
                    this.toast('请完善证明配送信息！')
                    return false
                  }
                }
              }
              break
            }
          }
        }
        return true
      },
      creatOrderAction: function () {
        var that = this
        // 提交订单数据
        if (this.checkInfoCorrent()) {
          if (this.checkOrderSuitableAndInvoiceType()) {
            // TODO 存入商品id列表
            let params = {
              paymentChannel: that.paymentChannel,
              creditYearName: that.$store.state.orderModule.compulsoryConfig.year
            }
            params.deliverInfo = {}
            let orderSkuPlaceInfoList = []
            let skuObject = {
              commoditySkuId: '',
              purchaseQuantity: ''
            }
            if (that.$store.state.orderModule.compulsoryConfig.skuId !== undefined && that.$store.state.orderModule.compulsoryConfig.skuId.length) {
              skuObject.commoditySkuId = that.$store.state.orderModule.compulsoryConfig.skuId
            }
            if (that.selectCredit !== undefined) {
              skuObject.purchaseQuantity = that.selectCredit
            }
            orderSkuPlaceInfoList.push(skuObject)
            params.orderSkuPlaceInfoList = orderSkuPlaceInfoList
            if (parseFloat(this.totoalPrice) === 0) {
              this.$store.state.orderModule.invoiceInfo.needInvoice = false
              params.deliverInfo.invoiceInfo = this.$store.state.orderModule.invoiceInfo
              if (this.certificateSendInfo.deliverType !== undefined) {
                params.deliverInfo.cerInfo = this.certificateSendInfo
              }
              this.submitOrder(params)
            } else {
              this.$store.state.orderModule.invoiceInfo.needInvoice = this.isNeedInvoice
              params.deliverInfo.invoiceInfo = this.$store.state.orderModule.invoiceInfo
              params.deliverInfo.cerInfo = this.certificateSendInfo
              this.submitOrder(params)
            }
          }
        }
      },
      /**
       * 选择发票类型
       */
      chooseInvoiceTypeAction: function () {
        console.log(1)
        var that = this
        this.$router.push({
          path: '/configInvoiceInfo',
          query: {
            invoiceInfo: JSON.stringify(that.$store.state.orderModule.invoiceInfo),
//            invoiceInfo: JSON.stringify({}),
            supportInvoiceType: JSON.stringify(that.preConditionInfo.supportInvoiceType),
            supportTitleType: JSON.stringify(that.preConditionInfo.supportTitleType),
            selectCredit: that.selectCredit
          }
        })
//        configInvoiceInfo
//        wx.navigateTo({
//          url: '/pages/order/orderInvoice/orderInvoice?invoiceInfo=' + JSON.stringify(this.data.invoiceInfo) + '&supportInvoiceType=' + JSON.stringify(this.data.preConditionInfo.supportInvoiceType) + '&supportTitleType=' + JSON.stringify(this.data.preConditionInfo.supportTitleType)
//        })
      },
      /**
       * 选择发票配送方式
       */
      chooseInvoiceSendModeAction: function () {
        console.log(2)
        if (!this.payAccountId) {
          return this.toast('请选择收款账号')
        }
        var that = this
        this.$router.push({
          path: '/configInvoiceDeliver',
          query: {
            invoiceInfo: JSON.stringify(that.$store.state.orderModule.invoiceInfo),
//            invoiceInfo: JSON.stringify({}),
            supportDeliveryType: JSON.stringify(that.preConditionInfo.supportInvoiceDeliveryType),
            accountId: that.payAccountId
          }
        })
//        wx.navigateTo({
//          url: '/pages/order/orderInvoiceSend/orderInvoiceSend?invoiceInfo=' + JSON.stringify(this.data.invoiceInfo) + '&supportDeliveryType=' + JSON.stringify(this.data.preConditionInfo.supportInvoiceDeliveryType),
//        })
      },
      isShowInvoiceInfo: function (totolPrice, canSendType) {
        if (totolPrice !== undefined && totolPrice !== 0 && canSendType !== undefined && (canSendType === 1 || canSendType === 4)) {
          return true
        }
        return false
      },
      isShowInvoiceSendCell: function (invoiceType) {
        if (invoiceType !== undefined && invoiceType === 2) {
          return false
        }
        return true
      },
      getShowSubmitButtonClass: function (selectCredit,supprotDistributionType, totalPrice, needInvoice, invoiceInfo, cerSendInfo, isCreatingOrder) {
        if (selectCredit === undefined || selectCredit <= 0) {
          return 'disabled'
        }
        // supprotDistributionType 1.只支持发票 2.只支持证书 3.只支持发票和证书配送 4.支持发票和证书配送|
        if (totalPrice === undefined || supprotDistributionType === undefined || needInvoice === undefined || invoiceInfo === undefined || cerSendInfo === undefined) {
          return 'disabled'
        }
        if (isCreatingOrder) {
          return 'disabled'
        }
        // 0元订单
        if (parseFloat(totalPrice) === 0) {
//          1.只支持发票
          if (supprotDistributionType === 1) {
            return ''
          } else if (supprotDistributionType === 2 || supprotDistributionType === 3 || supprotDistributionType === 4) {
            if (cerSendInfo.deliverType === undefined) {
              return 'disabled'
            } else {
              return ''
            }
          }
        } else { // 非0元订单
//          1.只支持发票
          if (supprotDistributionType === 1) {
            if (needInvoice) {
              if (invoiceInfo.invoiceType === undefined) {
                return 'disabled'
              } else {
                if (invoiceInfo.invoiceType === 2) {
                  return ''
                } else {
                  if (invoiceInfo.deliverType === undefined) {
                    return 'disabled'
                  } else {
                    return ''
                  }
                }
              }
            } else {
              return ''
            }
          } else if (supprotDistributionType === 2) {
            if (cerSendInfo.deliverType === undefined) {
              return 'disabled'
            } else {
              return ''
            }
          } else if (supprotDistributionType === 3 || supprotDistributionType === 4) {
            if (needInvoice) {
              if (invoiceInfo.invoiceType === undefined || cerSendInfo.deliverType === undefined) {
                return 'disabled'
              } else {
                if (invoiceInfo.invoiceType === 2) {
                  return ''
                } else {
                  if (invoiceInfo.deliverType === undefined) {
                    return 'disabled'
                  } else {
                    return ''
                  }
                }
              }
            } else {
              return ''
            }
          }
        }
        return 'disabled'
      },
      toDecimal2: function (x) {
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
      /**
       * 修改用户是否索要发票
       */
      changeIsNeedInvoiceAction () {
        if (this.preConditionInfo.provideType === 2) {
          return
        }
        this.isNeedInvoice = !this.isNeedInvoice
        this.$store.state.orderModule.isNeedInvoice = !this.$store.state.orderModule.isNeedInvoice
      },
      goToTrainingContentListAction: function (list) {
        this.push({
          name: 'moreSubOrderList',
          params: {
            subOrderList: list
          }
        })
      },
      loadPayAccountIds: function (skuList) {
        let params = {
          commoditySkuIdList: skuList,
          paymentChannelType: 'WECHAT_OFFICIAL_ACCOUNTS'
        }
        this.$vux.loading.show({
          text: '加载中'
        })
        var type = 'get'
        var url = constant.apiUrl.createOrderModule.findPaymentAccountByCommoditySku
        return new Promise(function (resolve,reject) {
          utils.getAjaxData(type, params, url).then(res => {
//            this.$vux.loading.hide()
            if (res.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
              reject({
                code: 500,
                message: res.head.message
              })
//              return this.toast(res.head.message)
            } else {
              resolve({
                code: 200,
                data: res.data
              })
            }
          }).catch(e => {
            console.log(e)
//            this.$vux.loading.hide()
//            return this.toast('请求失败')
            reject({
              code: 500,
              message: '请求失败'
            })
          })
        })
      },
      // 加载前置条件
      loadPreconditionData: function () {
        let params = {
          paymentChannel: this.paymentChannel
        }
        this.$vux.loading.show({
          text: '加载中'
        })
        var type = 'get'
        var url = constant.apiUrl.createOrderModule.orderCreatPreCondition
        utils.getAjaxData(type, params, url).then(res => {
          this.$vux.loading.hide()
          if (res.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            return this.toast(res.head.message)
          } else {
            this.preConditionInfo = res.data
            console.log(this.preConditionInfo, 'preConditionInfo')
            if (res.data.provideType === 2) {
              this.isNeedInvoice = true
            }
          }
        }).catch(e => {
          console.log(e)
          this.$vux.loading.hide()
          return this.toast('请求失败')
        })
      },
      getSkuValueName: function (skuArr, skuName) {
        if (!skuArr) {
          return ''
        }
        var str = ''
        skuArr.forEach(function (item) {
          if (item.skuPropertyName === skuName) {
            str = item.skuPropertyValueName
          }
        })
        return str
      }
    },
    watch: {
      selectCredit: {
        handler: function (nv, ov) {
          /**
           * 价格计算
           */
          var tempCredit =  parseInt(this.selectCredit);
          if (this.$store.state.orderModule.compulsoryConfig.unitPrice>0 && tempCredit>=0){
            this.totoalPrice = this.$store.state.orderModule.compulsoryConfig.unitPrice * tempCredit;
          }else {
            this.totoalPrice = 0
          }
          console.log(nv,'数值变化');
        }
      }
    },
    destroyed: function () {
      this.$store.commit(storeTypes.ORDER_SAVE_SELECT_CREDIT, undefined)
//      console.log('销毁cookie')
//      cookie.remove('SELECTED_SHOPPING_ITEMS')
    }
  }
</script>
