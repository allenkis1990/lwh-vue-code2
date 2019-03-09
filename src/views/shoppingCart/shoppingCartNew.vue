<template>

  <div class="contain hb-box">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">选课清单({{shoppingChoseList.length}})</div>
      <div class="header-right3">
        <a href="javascript:void(0)" @click="goSelectCourseTrain()"><img src="../../../design/images/icon-write.png"/>选课培训</a>
      </div>
    </div>
    <div v-if="shoppingCartEnableList.length<=0&&shoppingCartDisableList.length<=0">
      <div class="no-data-box pt100">
        <img class="no-data-img" src="../../../design/images/no-data-img.png" alt=" "/>
        <div class="no-data-txt">选课清单空空如也<br/>赶紧去选课培训吧！</div>
      </div>
      <div class="btn-primary btn-m mt30" @click="goSelectCourseTrain">进入选课</div>
    </div>
    <scroller
      style="box-sizing: border-box;"
      v-if="shoppingCartEnableList.length>0||shoppingCartDisableList.length>0"
      :height="scrollerHeight"
      lock-x
      scrollbar-y
      use-pulldown
      @on-pulldown-loading="refreshData"
      v-model="scroller" ref="scroller">
      <div class="hb-box-bd" style="">
        <!--班级列表-->
        <div class="hb-wrap-box hb-wrap-box-5">
          <div class="hb-panel">
            <div class="hb-panel-bd bor-b20" v-for="(item,index) in shoppingCartEnableList">
              <div class="weui-panel hb-panel" @click="goSelfSelectCourse(item)">
                <div class="weui-cell weui-cell_access">
                  <div class="hb-form mr20" @click="selectParentItem(item,$event)">
                    <img v-if="!item.checked" class="img" src="../../../design/images/radio.png" alt=" "/>
                    <img v-if="item.checked" class="img" src="../../../design/images/radio-checked.png" alt=" "/>
                  </div>
                  <div class="weui-cell__bd">
                    <div class="order-date2">
                      <img src="../../../design/images/icon-date2.png"/>
                      <div class="year">{{getSkuValueName(item.skuPropertyNameGroup, 'trainingYear')}}年度</div>
                      <div class="type">{{getSkuValueName(item.skuPropertyNameGroup, 'trainingSubject')}}</div>
                    </div>
                  </div>
                  <div class="weui-cell__ft" @click="goSelfSelectCourse(item)"></div>
                </div>
              </div>
              <div class="hb-media-box"
                   @click="goClassDetail(subItem)"
                   v-for="(subItem,subIndex) in item.shoppingCartCommodityList">
                <div class="hb-form mr20" @click="selectItem(subItem,$event)">
                  <img class="img" v-if="!subItem.checked" src="../../../design/images/radio.png" alt=" "/>
                  <img class="img" v-if="subItem.checked" src="../../../design/images/radio-checked.png" alt=" "/>
                </div>
                <div class="hb-media-box-hd">
                  <img class="hb-media-box-thumb" :src="imageUrl(subItem)"/>
                </div>
                <div class="hb-media-box-bd">
                  <div class="hb-media-box-title">{{subItem.courseName}}
                  </div>
                  <div class="hb-media-box-desc">
                    科目：{{getSkuValueName(subItem.skuPropertyNameList, 'trainingSubject')}} <span
                    class="ml30">年度：{{getSkuValueName(subItem.skuPropertyNameList, 'trainingYear')}}</span></div>
                  <div class="hb-media-box-desc">
                    专业技术资格等级：{{getSkuValueName(subItem.skuPropertyNameList, 'professionalGrade')}}
                  </div>
                  <div class="hb-media-box-desc">学分：{{subItem.period}}</div>
                </div>
              </div>
            </div>

            <div class="hb-panel-bd pb30"
                 v-if="shoppingCartDisableList.length"
                 v-for="(item,index) in shoppingCartDisableList">
              <div class="weui-panel hb-panel">
                <div class="weui-cell weui-cell_access">
                  <div class="weui-cell__bd">
                    <div class="to c6 fs28">失效培训商品</div>
                  </div>
                </div>
              </div>
              <div class="hb-media-box failure-items" v-for="(subItem,subIndex) in item.shoppingCartCommodityList">
                <div class="failure-label">无效</div>
                <div class="hb-media-box-hd">
                  <img class="hb-media-box-thumb" :src="imageUrl(subItem)"/>
                </div>
                <div class="hb-media-box-bd">
                  <div class="hb-media-box-title">{{subItem.courseName}}</div>
                  <div class="hb-media-box-desc">
                    科目：{{getSkuValueName(subItem.skuPropertyNameList, 'trainingSubject')}} <span
                    class="ml30">年度：{{getSkuValueName(subItem.skuPropertyNameList, 'trainingYear')}}</span></div>
                  <div class="hb-media-box-desc">
                    专业技术资格等级：{{getSkuValueName(subItem.skuPropertyNameList, 'professionalGrade')}}
                  </div>
                  <div class="hb-media-box-desc">学分：{{subItem.period}}</div>
                </div>
              </div>
              <div class="btn-default btn-s mt30" @click="clearDisGoods">清空失效培训内容</div>
            </div>
            <div class="loading-tips"><span class="line"></span><span class="txt">已经到最底部啦</span><span
              class="line"></span>
            </div>
          </div>
        </div>
        <!--/班级列表-->
      </div>
      <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down"
           style="position: absolute; width: 100%; height: 40px; line-height: 40px; text-align: center;top:-40px;">
        <span v-show="scroller.pulldownStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="scroller.pulldownStatus === 'down' || scroller.pulldownStatus==='up'"
              :class="{'rotate': scroller.pulldownStatus === 'up'}"
              style="font-size: 16px;font-weight: bold;">↓</span>
        <div v-show="scroller.pulldownStatus === 'loading'">
          <p class="inloading">
            <inline-loading></inline-loading>
            <span class="il-text">
              刷新中...
              </span>
          </p>
        </div>
      </div>
    </scroller>
    <!--<div class="e-course-tip">
      <div class="pic"><img src="../../../design/images/icon-warning.png" /></div>
      <div class="text">完成本次选课还差Y学分，<a href="#">前往购买</a></div>
    </div>-->
    <div class="e-course-change-box" v-if="showSelectedDetail">
      <div class="item clear" v-for="(item,index) in selectedDetailArr">
        <div class="tit">{{item.year}}年度</div>
        <div class="con">
          <div class="subitem">公需科目：{{countTotal(item.publicList,'period')}}学分</div>
          <div class="subitem">专业科目：{{countTotal(item.majorList,'period')}}学分</div>
        </div>
      </div>
    </div>
    <div class="hb-tabbar" v-if="shoppingCartEnableList.length>0">
      <div class="left-box flex">
        <div class="hb-form mr20" @click="selectAll">
          <img class="img" v-if="!allChecked" src="../../../design/images/radio.png" alt=" "/>
          <img class="img" v-if="allChecked" src="../../../design/images/radio-checked.png" alt=" "/>
        </div>
        <span class="fs28" @click="selectAll">全选</span>
        <span class="fs28 ml30" @click="deleteShoppingItemsAction()">删除</span>
      </div>
      <div class="fs28 c6 mr20 hb-total">
        <div class="show-detail"
             @click="lookChoseDetail"
             v-if="shoppingChoseList.length">{{showSelectedDetail?'收起明细':'查看明细'}}
        </div>
        <div>合计：<span class="ci">{{totalCount}}门</span>,<span class="ci">{{totalPeriod}}学分</span></div>
      </div>
      <div class="hb-btn"
           @click="enableShoppingCart()"
           :class="{'btn-dis':!shoppingChoseList.length}">确认选课
      </div>
      <!--不可操作-->
      <!--<div class="hb-btn disabled">确认选课</div>-->
    </div>
    <study-qrcode ref="studyQrcode"></study-qrcode>
    <div class="weui-mask"
         @click="showSelectedDetail = false"
         v-show="showSelectedDetail"></div>
  </div>

</template>

<style lang="less" scoped>
  .hb-tabbar .hb-btn.btn-dis {
    background: #999;
    cursor: pointer;
  }
</style>

<script>
  import CompleteOrderDialog from '../order/CompleteOrder/completeOrderDialog'
  import { Scroller, InlineLoading, PopupPicker } from 'vux'
  import * as storeTypes from '../../store/types'
  import utils from '@/common/util/Utils'
  import constant from '@/global/constants/AppConstant'
  import Global from '@/global/global'
  import studyQrcode from '@/components/StudyQrcodeComponent.vue'

  export default {
    components: {
      Scroller,
      InlineLoading,
      PopupPicker,
      CompleteOrderDialog,
      studyQrcode
    },
    data () {
      return {
        scrollerHeight: '',
        scroller: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
//      0加载 1下拉加载 2加载更多
        scorllerStatus: 0,
//        失效和非失效的全放在一起
        shoppingCartAllList: [],
//        购物车正常
        shoppingCartEnableList: [],
//        购物车失效
        shoppingCartDisableList: [],
//        购物车已选择的
        shoppingChoseList: [],
        totalPeriod: 0,
        totalCount: 0,
        allChecked: false,
        selectedDetailArr: [],
        showSelectedDetail: false
      }
    },
    computed: {},
    mounted () {
      this.$store.commit(storeTypes.SHOW_OR_HIDE_FOOTTER_NAV, true)
      this.getUserShoppingCartCommoditySkuGroupPage()
      this.setScrollerHeight()
    },
    methods: {
      goClassDetail (item) {
        let trainingItem = {
          skuId: item.commoditySkuId,
          schemeId: item.schemeId,
          courseId: item.courseId,
          coursePackageId: item.coursePoolId
        }
        this.$store.dispatch(storeTypes.CLASS_DETAIL_TRAINING_ITEM, trainingItem)
        this.$router.push({
          path: '/classDetail',
          query: {
            categoryType: 'COURSE_SUPERMARKET_GOODS',
            classType: 'COURSE_SUPERMARKET_GOODS'
          }
        })
      },
      goSelfSelectCourse (item) {
        let yearItem = utils.findItem(item.skuPropertyNameGroup, 'skuPropertyCode', 'trainingYear')
        let subjectItem = utils.findItem(item.skuPropertyNameGroup, 'skuPropertyCode', 'trainingSubject')
        let majorItem = utils.findItem(item.skuPropertyNameGroup, 'skuPropertyCode', 'professionalGrade')
        this.$router.push({
          path: '/selfSelectCourse',
          query: {
            year: yearItem.skuPropertyValueName,
            subjectName: subjectItem.skuPropertyValueName,
            subjectValue: subjectItem.skuPropertyValueId,
            majorName: majorItem.skuPropertyValueName,
            majorValue: majorItem.skuPropertyValueId
          }
        })
      },
      goSelectCourseTrain () {
        this.$router.push('/demo/courseSelectionTrain')
      },
//      判断选中的购物车商品是否可以加入购物车
      enableShoppingCart () {
//        如果明细的窗口开着要关掉
        this.showSelectedDetail = false
        var that = this
        if (this.shoppingChoseList.length) {
          var type = 'post'
          var url = constant.apiUrl.shoppingCartModule.enableShoppingCart
          var ajaxArr = []
          this.shoppingChoseList.forEach(function (each) {
            ajaxArr.push({
              courseId: each.courseId,
              coursePoolId: each.coursePoolId,
              commoditySkuId: each.commoditySkuId,
              schemeId: each.schemeId,
              unitId: each.unitId
            })
          })
          var params = {
            paymentChannelType: 'WECHAT_OFFICIAL_ACCOUNTS',
            courseCommodities: ajaxArr
          }
          this.$vux.loading.show({
            text: '加载中'
          })
          console.log(params, 'gwc')
          utils.getAjaxData(type, params, url).then(res => {
            this.$vux.loading.hide()
            if (res.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
              if (res.head.code === 600) {
                this.commonConfirm(that, res)
              } else {
                return this.toast(res.head.message)
              }
            } else {
              console.log('通过')
              that.$vux.confirm.show({
                title: '提示',
                content: '确认进行本次选课？',
                confirmText: '确认选课',
                cancelText: '取消',
                onCancel: function () {
                },
                onConfirm: function () {
                  that.confirmSelectCourseRequest()
                }
              })
            }
          }).catch(e => {
            this.$vux.loading.hide()
            console.log(e)
            return this.toast('请求失败')
          })
        }
      },
//      确认选课请求
      confirmSelectCourseRequest () {
        if (this.submitAble) {
          return false
        }
        var params = {
          paymentChannel: Global.isWeiXin() ? 'WECHAT_OFFICIAL_ACCOUNTS' : 'HTML5',
          courseOrderMode: 'NORMAL',
          orderSkuPlaceInfoList: []
        }
        this.shoppingChoseList.forEach((item) => {
          params.orderSkuPlaceInfoList.push({
            commoditySkuId: item.commoditySkuId,
            coursePoolId: item.coursePoolId,
            courseId: item.courseId
          })
        })
        this.submitAble = true
        let _this = this
        this.$vux.loading.show({
          text: '选课中！！！'
        })
        this.$store.dispatch(storeTypes.SELECT_COURSE, params).then((data) => {
          this.$vux.loading.hide()
          this.submitAble = false
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.$store.dispatch(storeTypes.GET_CREDIT_SITUATION, params).then((res) => {
              if (res.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
                setTimeout(() => {
                  //            初始化一些模型
                  this.initModeData()
//            重新获取购物车
                  this.getUserShoppingCartCommoditySkuGroupPage()
                }, 2000)
                if (res.data.type === 3) {
                  let content = '选课成功！' + '<br><br>' + '完成' + res.data.yearCode + '年度继续教育90学分要求，您还需要' + res.data.needPurchaseCredit + '学分！'
                  this.$vux.confirm.show({
                    title: '提示',
                    content: content,
                    confirmText: '前往购买学分',
                    cancelText: '暂不',
                    onCancel: function () {
                    },
                    onConfirm: function () {
                      let params = {}
                      _this.getStudentOrderTipInfo(params, () => {
                        _this.$router.push({
                          path: '/createOrder',
                          query: {
                            currentYear: res.data.yearCode
                          }
                        })
                      }, res.data.yearCode, true)
                    }
                  })
                } else if (res.data.type === 1 || res.data.type === 2) {
                  this.$vux.confirm.show({
                    title: '提示',
                    content: '选课成功！',
                    confirmText: '进入学习',
                    cancelText: '取消',
                    onCancel: function () {
                    },
                    onConfirm: function () {
                      _this.goStudy()
                    }
                  })
                } else {
                }
              } else {
                _this.toast('请求失败')
              }
            })
          } else {
            this.$store.commit('selectCourseCommonDo', {
              data: data.data.creditOperateResult,
              context: _this,
              code: data.head.code,
              message: data.head.message
            })
          }
        })
      },
      goStudy () {
        this.$refs.studyQrcode.show()
      },
      /**
       * 删除选中的商品
       */
      deleteShoppingItemsAction () {
        //        如果明细的窗口开着要关掉
        this.showSelectedDetail = false
        var that = this
        if (this.shoppingChoseList.length > 0) {
          this.$vux.confirm.show({
            title: '系统提示',
            content: '确认删除选中的课程吗？',
            onCancel: function () {
              console.log('取消删除')
            },
            onConfirm: function () {
              that.reallyDeleteShoppingItemsAction()
              console.log('确认删除')
            }
          })
        } else {
          return this.toast('请选择需删除的课程')
        }
      },
      /**
       * 确认删除 调用删除请求
       */
      reallyDeleteShoppingItemsAction () {
        let params = {
          classInfo: []
        }
        this.shoppingChoseList.forEach((item) => {
          params.classInfo.push({
            courseId: item.courseId,
            coursePoolId: item.coursePoolId,
            skuId: item.commoditySkuId,
            schemeId: item.schemeId
          })
        })
        this.$vux.loading.show({
          text: '删除中...'
        })
        this.$store.dispatch(storeTypes.DELETE_SHOPPINGCART_GOODS, params).then((data) => {
          this.$vux.loading.hide()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.toast('删除成功！')
            this.deleteShoppingCartDo()
          } else {
            this.toast('请求失败')
          }
        })
        console.log('delete')
      },
//      删除选课清单成功后做得一系列操作
      deleteShoppingCartDo () {
        this.shoppingCartEnableList = this.shoppingCartEnableList.filter((item) => {
          return item.checked === false
        })
        this.shoppingCartEnableList.forEach((item) => {
          item.shoppingCartCommodityList = item.shoppingCartCommodityList.filter((sbItem) => {
            return sbItem.checked === false
          })
        })
        this.shoppingChoseList = []
        this.totalPeriod = 0
        this.totalCount = 0
        this.allChecked = false
        this.$refs.scroller.reset({ top: 0 })
      },
      refreshData () {
        console.log(this.scroller)
        console.log('下拉刷新！！！')
        this.scorllerStatus = 1
        this.getUserShoppingCartCommoditySkuGroupPage()
      },
      loadingUIState () {
        if (this.scorllerStatus === 1) {
          if (this.$refs.scroller !== undefined) {
            this.$refs.scroller.donePulldown()
            this.scroller.pulldownStatus = 'default'
            this.scorllerStatus = 0
          }
        }
        this.$vux.loading.hide()
      },
      //      设置scroller高度
      setScrollerHeight () {
        let h1 = Number.parseInt(utils.selectClass('.hb-header-box').height)
        this.scrollerHeight = (window.outerHeight - (h1) || window.innerHeight - (h1)) + 'px'
        console.log(this.scrollerHeight, '高度')
      },
//      清除失效商品
      clearDisGoods () {
        let _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '确认清空失效的培训内容吗？',
          confirmText: '确认',
          cancelText: '取消',
          onCancel: function () {
          },
          onConfirm: function () {
            _this.clearDisGoodsRequest()
          }
        })
      },
//      清除失效商品请求
      clearDisGoodsRequest () {
        this.$vux.loading.show({
          text: '清除失效培训内容中'
        })
        var params = {}
        this.$store.dispatch(storeTypes.CLEAR_SHOPPINGCART_DISABLED, params).then((data) => {
          this.$vux.loading.hide()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.shoppingCartDisableList = []
            this.toast('清除失效商品成功！')
            this.$refs.scroller.reset({ top: 0 })
          } else {
            this.toast('请求失败')
          }
        })
      },
//      查看明细
      lookChoseDetail () {
        this.showSelectedDetail = !this.showSelectedDetail
        if (this.showSelectedDetail) {
          this.selectedDetailArr = []
          this.shoppingChoseList.forEach((item) => {
            let yearSkuName = utils.getSkuValueName(item.skuPropertyNameList, 'trainingYear')
            let subjectSkuName = utils.getSkuValueName(item.skuPropertyNameList, 'trainingSubject')
            let index = utils.findIndex(this.selectedDetailArr, 'year', yearSkuName)
            if (index === null) {
              let currentYearGoods = {
                year: yearSkuName,
//              公需课类别的课程
                publicList: [],
//              专业课类别的课程
                majorList: []
              }
              if (subjectSkuName === '公需科目') {
                currentYearGoods.publicList = [item]
              }
              if (subjectSkuName === '专业科目') {
                currentYearGoods.majorList = [item]
              }
              this.selectedDetailArr.push(currentYearGoods)
            } else {
              if (subjectSkuName === '公需科目') {
                this.selectedDetailArr[index].publicList.push(item)
              }
              if (subjectSkuName === '专业科目') {
                this.selectedDetailArr[index].majorList.push(item)
              }
            }
          })
          console.log(this.selectedDetailArr)
        }
      },
//      选中单个
      selectItem (item,e) {
        e.stopPropagation()
        let shoppingItem = item
        shoppingItem.checked = !shoppingItem.checked
        if (shoppingItem.checked) {
          this.shoppingChoseList.push(item)
        } else {
          var index = this.findIndex(this.shoppingChoseList, item)
          this.shoppingChoseList.splice(index, 1)
        }

        this.calculateTotalPeriod()
        this.checkIsSelectedParent()
      },
//      选中所属父亲
      selectParentItem (item,e) {
        e.stopPropagation()
        item.checked = !item.checked
        if (item.checked) {
          item.shoppingCartCommodityList.forEach((each) => {
            let index = this.findIndex(this.shoppingChoseList, each)
            if (index === null) {
              this.shoppingChoseList.push(each)
            }
            each.checked = true
          })
        } else {
          item.shoppingCartCommodityList.forEach((each) => {
            let index = this.findIndex(this.shoppingChoseList, each)
            if (index !== null) {
              this.shoppingChoseList.splice(index, 1)
            }
            each.checked = false
          })
        }
        console.log(this.shoppingChoseList, '选中')
        this.calculateTotalPeriod()
        this.checkIsSelectedAll()
      },
//      选中全部
      selectAll () {
        this.allChecked = !this.allChecked
        if (this.allChecked) {
          this.shoppingChoseList = []
          this.shoppingCartEnableList.forEach((item) => {
            item.checked = true
            item.shoppingCartCommodityList.forEach((subItem) => {
              subItem.checked = true
              this.shoppingChoseList.push(subItem)
            })
          })
        } else {
          this.showSelectedDetail = false
          this.shoppingChoseList = []
          this.shoppingCartEnableList.forEach((item) => {
            item.checked = false
            item.shoppingCartCommodityList.forEach((subItem) => {
              subItem.checked = false
            })
          })
        }
        this.calculateTotalPeriod()
      },
      /**
       * 判断当前所属父亲是否全选 并且判断是否全部全选
       */
      checkIsSelectedParent () {
        let checkedAllCount = 0
        let allLen = this.shoppingCartEnableList.length
        this.shoppingCartEnableList.forEach((item) => {
          let checkedCount = 0
          item.shoppingCartCommodityList.forEach((subItem) => {
            if (subItem.checked) {
              checkedCount++
            }
          })
          let len = item.shoppingCartCommodityList.length
          if (len && len === checkedCount) {
            item.checked = true
            checkedAllCount++
          } else {
            item.checked = false
          }
        })
        if (allLen && checkedAllCount === allLen) {
          this.allChecked = true
        } else {
          this.allChecked = false
        }
      },
//      选择父亲全选满后是否全选
      checkIsSelectedAll () {
        let count = 0
        let allLen = this.shoppingCartEnableList.length
        this.shoppingCartEnableList.forEach((item) => {
          if (item.checked) {
            count++
          }
        })
        if (allLen && count === allLen) {
          this.allChecked = true
        } else {
          this.allChecked = false
        }
      },
      /**
       * 计算总学分和总门数
       */
      calculateTotalPeriod() {
        let totalPeriod = 0
        let totalCount = 0
        for (let index = 0; index < this.shoppingChoseList.length; index++) {
          let itemObject = this.shoppingChoseList[index]
          totalPeriod += itemObject.period
          totalCount++
        }
        this.totalPeriod = utils.clearZero(toDecimal2(totalPeriod))
        this.totalCount = totalCount
      },
      countTotal (arr, property) {
        let total = 0
        arr.forEach((item) => {
          total += item[property]
        })
        return toDecimal2(total)
      },
      findIndex: function (arr, item) {
        var index = null
        arr.forEach(function (dataItem, dataIndex) {
          if (dataItem.commoditySkuId === item.commoditySkuId && dataItem.courseId === item.courseId) {
            index = dataIndex
          }
        })
        return index
      },
      imageUrl (item) {
        if (item.image === undefined) {
          return require('../../../design/images/course-img.jpg')
        }
        return item.image
      },
//      初始化一些模型
      initModeData () {
        this.shoppingChoseList = []
        this.totalPeriod = 0
        this.totalCount = 0
        this.allChecked = false
        this.selectedDetailArr = []
        this.showSelectedDetail = false
      },
//      获取选课清单列表
      getUserShoppingCartCommoditySkuGroupPage () {
        var context = this
        this.$vux.loading.show({
          text: '加载中'
        })
        var params = {}
        this.$store.dispatch(storeTypes.GET_SHOPPINGCART_LIST, params).then((data) => {
          this.loadingUIState()
          this.initModeData()
//          this.$vux.loading.hide()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.shoppingCartAllList = data.data.list
            if (this.shoppingCartAllList.length) {
              this.setParentChecked()
              this.shoppingCartEnableList = this.getEnableList(this.shoppingCartAllList)
              this.shoppingCartDisableList = this.getDisableList(this.shoppingCartAllList)
            } else {
              this.shoppingCartEnableList = []
              this.shoppingCartDisableList = []
            }
            console.log(data.data.list, 'json!!')
            console.log(this.shoppingCartEnableList, 'json!!111')
            console.log(this.shoppingCartDisableList, 'json!!222')
          } else {
            context.toast('请求失败')
          }
        })
      },
//      筛选出正常的商品
      getEnableList (allList) {
        this.setInitChecked(allList)
        let enableList = []
        enableList = allList.filter((item) => {
          return item.disabled === false
        })
        return enableList
      },
//      筛选出失效的商品
      getDisableList (allList) {
        let disableList = []
        disableList = allList.filter((item) => {
          return item.disabled === true
        })
        return disableList
      },
//      初始化checked都为false 否则ui无法识别
      setParentChecked () {
        this.shoppingCartAllList.forEach((item) => {
          this.$set(item, 'checked', false)
        })
      },
//      初始化数组各级的checked为false
      setInitChecked (arr) {
        arr.forEach((item) => {
          item.checked = false
          item.shoppingCartCommodityList.forEach((subItem) => {
            subItem.checked = false
          })
        })
      },
      getSkuValueName (arr, code) {
        return utils.getSkuValueName(arr, code)
      }
    },
    destroyed () {
      this.$store.commit(storeTypes.SHOW_OR_HIDE_FOOTTER_NAV, false)
    }
  }

  function toDecimal2 (x) {
    if (x === undefined) {
      return '0'
    }
    var f
//    f = parseFloat(x)
//    if (isNaN(f)) {
//      return false
//    }
    f = Math.round(x * 100) / 100
//    var s = f.toString()
//    var rs = s.indexOf('.')
//    if (rs < 0) {
//      rs = s.length
//      s += '.'
//    }
//    while (s.length <= rs + 2) {
//      s += '0'
//    }
    return f
  }

</script>
