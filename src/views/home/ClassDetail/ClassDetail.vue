<template>
  <div class="contain hb-box"  style="overflow: hidden">
    <div class="hb-box-bd">
      <div class="view-pos">
        <div class="course-detail-hd">
          <div class="course-detail-btn"
               @click="auditionCourse()"
               v-if="classDetailInfo.supportListen">
            <img class="img" src="../../../../design/images/video-audition.png" alt=" "/>
          </div>
          <div class="course-detail-img">
            <img class="img"
                 style="width:100%"
                 :src="imageUrl(classDetailInfo.photoPath)"/>
          </div>
          <div class="year-label-box">
            <img class="img"
                 src="../../../../design/images/year-label.png" alt=" "/>
            <span class="year-label" v-if="classDetailInfo.skuPropertyNameList">{{yearCode}}</span>
          </div>
          <div class="course-info">
            <img class="mask"
                 style="width:100%"
                 src="../../../../design/images/course-img-mask.png" alt=" "/>
            <div class="course-name">{{classDetailInfo.skuName || classDetailInfo.saleTitle}}</div>
          </div>
        </div>
        <div class="hb-tab-tit">
          <div class="tab-tit-items" :class="{'current': tabIndex == 0}" @click="toggleTab(0)">
            <span class="items-name">培训信息</span>
            <img class="current-img" src="../../../../design/images/tab-current-bg.jpg"/>
          </div>
          <div class="tab-tit-items" :class="{'current': tabIndex == 1}" @click="toggleTab(1)">
            <span class="items-name">课程目录</span>
            <img class="current-img" src="../../../../design/images/tab-current-bg.jpg"/>
          </div>
        </div>
      </div>
      <!-- 课程超市班级培训信息 -->
      <CourseTrainInfo v-if="tabIndex == 0 && classType === 'COURSE_SUPERMARKET_GOODS'"
                       :from-help-me-select-course="fromHelpMeSelectCourse"
                       :trainInfo="classDetailInfo">
      </CourseTrainInfo>
      <!-- 课程超市班级课程目录 -->
      <CourseDirectory v-if="tabIndex == 1 && classType === 'COURSE_SUPERMARKET_GOODS'"
                       :from-help-me-select-course="fromHelpMeSelectCourse"
                       :chapterList="courseList"
                       @onToggleExpand="toggleExpand">
      </CourseDirectory>
    </div>
    <div class="hb-tabbar"
         v-if="!fromHelpMeSelectCourse"
         style="bottom: 0.9rem;z-index:998">
      <div class="left-box">
        <span class="ci fs40">{{classDetailInfo.dealPrice}}学分</span>
      </div>
      <div class="hb-btn hb-btn-2" @click="addShopping()">加入选课清单</div>
      <div class="hb-btn"
           :class="{'dis':submitAble}"
           @click="confirmSelectCourse()">确认选课
      </div>
    </div>
    <div class="hb-tabbar"
         ref="selectInfoBar"
         style="bottom: 0.9rem;z-index:998"
         v-if="classDetailInfo.hasBuy&&!fromHelpMeSelectCourse">
      <div class="hb-btn hb-btn-3" @click="goStudy()">前往学习</div>
    </div>


    <study-qrcode ref="studyQrcode"
                  @closeFunc="closeQrcode()"></study-qrcode>
    <div class="js_dialog"
         v-if="addShoppingCartSuccess"
         style="opacity: 1;">
      <div class="weui-mask" style="z-index:6000"></div>
      <div class="weui-dialog weui-dialog-2" style="z-index:6000">
        <div class="weui-dialog__bd">
          <img class="d-icon-success" src="../../../../design/images/icon-success.png" />
          <p class="mt20">加入选课清单成功！</p>
        </div>
      </div>
    </div>
    <select-info-bar
      style="z-index:999"
      v-show="!fromHelpMeSelectCourse"
      ref="selectInfoBar"
      auto="true"
      :year-sku-arr="skuPropertyKeyValueList"></select-info-bar>
    <!--<popup-picker :show="showYearPicker" @on-hide="hideYearPicker" confirm-text="确定" :data="transformYearList(classDetailInfo.optionYearList)" :columns="1" v-model="years" show-name></popup-picker>-->
  </div>
</template>

<style lang="less" scoped>
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";


  .vux-popup-header-right {
    color: @theme-color;
  }

  .hb-tabbar .hb-btn.dis {
    background: #888
  }

  .contain::-webkit-scrollbar {
    display: none;
  }

  .hb-box-bd::-webkit-scrollbar {
    display: none;
  }
</style>
<script>
  import { Tab, TabItem, Confirm, PopupPicker } from 'vux'
  import * as storeTypes from '../../../store/types'
  import CourseTrainInfo from './CourseTrainInfo'
  import CourseDirectory from './CourseDirectory'
  import selectInfoBar from '@/views/home/selectInfoBar'
  import Global from '@/global/global'
  import utils from '@/common/util/Utils'
  import studyQrcode from '@/components/StudyQrcodeComponent.vue'
  import AppConstant from '@/global/constants/AppConstant'

  export default {
    components: {
      TabItem,
      Tab,
      Confirm,
      CourseTrainInfo,
      CourseDirectory,
      PopupPicker,
      selectInfoBar,
      studyQrcode
    },
    data () {
      return {
        yearCode: '',
        trainingItem: this.$store.state.classModule.classDetailTrainItem,
        categoryType: this.$route.query.categoryType,
        classType: this.$route.query.classType,
        courseList: null,
        classDetailInfo: {},
        tabIndex: 0,
        showYearPicker: false,
        years: [],
        pager: {
          pageNo: 1,
          pageSize: 10
        },
        totalSize: 0,
        currentSize: 0,
        submitAble: false,
        skuPropertyKeyValueList: [],
        fromHelpMeSelectCourse: false,
        addShoppingCartSuccess: false
      }
    },
    created () {
      if (AppConstant.sysContext.fromHelpMeSelectCourse) {
        this.fromHelpMeSelectCourse = true
      } else {
        this.fromHelpMeSelectCourse = false
      }
//      this.trainingItem = utils.getSessionStorage(storeTypes.CLASS_DETAIL_TRAINING_ITEM)
      this.initData()
      console.log(this.$route.query)
    },
    methods: {
      closeQrcode () {
        this.classDetailInfo.hasBuy = true
      },
//      刷新底部购物车bar
      refreshShoppingCartBar() {
        if (this.skuPropertyKeyValueList.length) {
          setTimeout(() => {
            this.$refs.selectInfoBar.countShoppingCartCredit(this.skuPropertyKeyValueList)
          }, 1000)
        }
      },
      auditionCourse (coursewareId) {
        let routerQuery = {
          courseId: this.classDetailInfo.courseId,
          packageId: this.classDetailInfo.coursePackageId,
          schemeId: this.classDetailInfo.schemeId,
          skuId: this.classDetailInfo.skuId
        }
        if (coursewareId) {
          routerQuery.coursewareId = coursewareId
        }
        this.$router.push({
          path: '/coursePlay',
          query: routerQuery
        })
      },
      enablePurchase (callback, type) {
        if (this.submitAble) {
          return false
        }
        let skuValueObj = {
          schemeId: this.classDetailInfo.schemeId,
          commoditySkuId: this.classDetailInfo.skuId,
          requestType: type
        }
        if (
          this.classDetailInfo.courseId !== undefined &&
          this.classDetailInfo.courseId.length
        ) {
          skuValueObj.courseId = this.classDetailInfo.courseId
        }
        if (
          this.classDetailInfo.coursePackageId !== undefined &&
          this.classDetailInfo.coursePackageId.length
        ) {
          skuValueObj.coursePoolId = this.classDetailInfo.coursePackageId
        }
        let params = {
          skuId: this.classDetailInfo.skuId
        }
        params.orderSkuPlaceInfo = skuValueObj
        if (
          this.classDetailInfo.courseId !== undefined &&
          this.classDetailInfo.courseId.length
        ) {
          params.courseId = this.classDetailInfo.courseId
        }
        if (
          this.classDetailInfo.coursePackageId !== undefined &&
          this.classDetailInfo.coursePackageId.length
        ) {
          params.coursePoolId = this.classDetailInfo.coursePackageId
        }
        this.submitAble = true
        this.$store
          .dispatch(storeTypes.CLASS_BUY_JUDGE, params)
          .then(data => {
            this.submitAble = false
            if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
              this.toast(data.head.message)
              return
            }
            let code = parseInt(data.data.code)
            if (code === storeTypes.NETWORK_RESULT_SUCCESS) {
              if (callback) {
                callback()
              }
            } else if (code === 30821) {
              this.toast('该课程已报名，无需重复报名！')
              // 30824：已在未支付订单中
            } else if (code === 30824) {
              this.toast('该课程已存在选课清单')
            } else if (code === 505) {
              this.toast(data.data.message)
            } else {
              this.$store.commit('selectCourseCommonDo', {
                data: data.data.creditOperateResult,
                context: this,
                code: data.data.code,
                message: data.data.message,
                year: this.yearCode
              })
//            this.toast(data.data.msg);
            }
          })
          .catch(e => {
            this.submitAble = false
            console.log('<<<<<' + e)
          })
      },
      goStudy () {
        this.$refs.studyQrcode.show()
      },
      getSkuValueByCode (skuList, code) {
        let result
        skuList.forEach((data) => {
          if (data.skuPropertyCode === code) {
            result = data.skuPropertyValueName
          }
        })
        return result
      },
      imageUrl () {
        if (!this.classDetailInfo.photoPath) {
          return require('../../../../design/images/course-img.jpg')
        }
        return this.classDetailInfo.photoPath
      },
      toggleTab (index) {
        this.tabIndex = index
      },
      toggleExpand (index, type) {
        let item = this.courseList[index]
        item.expand = !item.expand
        if (type === 1 && !item.dirty) {
          this.getCourseList(index)
        }
      },
      initData () {
        this.getClassDetail()
        this.getCourseDirectory()
      },
      getClassDetail () {
        this.showLoading('加载中')
        let type
        let params = {
          skuId: this.trainingItem.skuId
        }
        type = storeTypes.COURSE_INFO_REQUEST
        params.courseId = this.trainingItem.courseId
        params.coursePoolId = this.trainingItem.coursePackageId
        this.$store
          .dispatch(type, params)
          .then(data => {
            this.hideLoading()
            if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
              this.classDetailInfo = data.data
              this.yearCode = this.getSkuValueByCode(this.classDetailInfo.skuPropertyNameList, 'trainingYear')
              let yearItem = utils.findItem(this.classDetailInfo.skuPropertyNameList, 'skuPropertyCode', 'trainingYear')
              if (yearItem) {
                this.skuPropertyKeyValueList = [{
                  propertyId: yearItem.skuPropertyId,
                  propertyIdCode: yearItem.skuPropertyCode,
                  value: yearItem.skuPropertyValueId
                }]
              }
//            classDetailInfo.skuPropertyNameList
            }
          })
          .catch(e => {
            console.log('<<<<<' + e)
          })
      },
      transformCourseList (type, courseList) {
        return courseList.map((item, index) => {
          let options = {}
          if (type === 1) {
            options = {
              expand: false,
              children: [],
              dirty: false
            }
          } else if (type === 2) {
            options = {
              expand: true
            }
          }
          return Object.assign({}, item, options)
        })
      },
      getCourseDirectory () {
        let type = storeTypes.COURSE_CHAPTERLIST_REQUEST
        let params = {
          courseId: this.trainingItem.courseId,
          objectType: 1,
          objectValue: this.trainingItem.schemeId,
          packageId: this.trainingItem.coursePackageId,
          courseType: 1
        }
        this.$store
          .dispatch(type, params)
          .then(data => {
            if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
              // this.courseList = data.data;
              this.courseList = this.transformCourseList(
                2,
                data.data.chapterList
              )
              return
            }
          })
          .catch(e => {
            console.log('<<<<<' + e)
          })
      },
      getCourseList (index) {
        this.showLoading('加载中')
        let param = {
          trainingClassId: this.trainingItem.schemeId,
          courseWrapId: this.courseList[index].courseWrapId,
          pageNo: 1,
          pageSize: 100
        }
        this.$store
          .dispatch(storeTypes.POOL_COURSE_LIST_REQUEST, param)
          .then(data => {
            this.hideLoading('加载中')
            if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
              this.courseList[index].children = data.data.courseList
              this.courseList[index].expand = true
              this.courseList[index].dirty = true
            } else {
              this.toast(data.head.message)
            }
          })
          .catch(e => {
            console.log('<<<<<' + e)
          })
      },
      hasBuy () {
        if (
          this.classDetailInfo.hasBuy &&
          this.classType === 'TRAINING_CLASS_GOODS'
        ) {
          this.toast('该培训班已报名，无需重复报名！')
          return false
        } else if (
          this.classDetailInfo.hasBuy &&
          this.classType === 'COURSE_SUPERMARKET_GOODS'
        ) {
          this.toast('该课程已报名，无需重复报名！')
          return false
        } else if (this.classDetailInfo.hasBuy &&
          this.classType === 'TRAINING_LINEOFF_CLASS') {
          this.toast('该面授班已报名，无需重复报名！')
          return false
        }
        return true
      },
      transformYearList (list) {
        if (!list) {
          return []
        }
        return list.map(item => {
          return {
            value: item.skuPropertyValueId,
            name: item.skuPropertyValueName
          }
        })
      },
      hideYearPicker (closeType) {
        this.showYearPicker = false
        if (closeType) {
          this.dealActions(this.joinType)
        }
      },
      getYearValueById (id) {
        let yearOptions = this.classDetailInfo.optionYearList
        for (let i = 0, len = yearOptions.length; i < len; i++) {
          if (yearOptions[i].skuPropertyValueId === id) {
            return yearOptions[i]
          }
        }
      },
      dealActions (joinType) {
        switch (joinType) {
          case 'JOIN_RIGHTNOW': {
            // 跳转至创建订单页面
            try {
              if (this.years[0]) {
                this.classDetailInfo.skuPropertyNameList[1] = Object.assign({}, this.classDetailInfo.skuPropertyNameList[1], this.getYearValueById(this.years[0]))
                this.classDetailInfo.yearOptionId = this.years[0]
              }
              this.$store.dispatch('changeSkuListState', [this.classDetailInfo])
            } catch (e) {
            }
            this.push({
              path: '/createOrder'
            })
            break
          }
          case 'JOIN_SHOPPINGCART': {
            this.addShoppingAction()
            break
          }
          default:
            console.log('no match type')
        }
      },
      checkClassStatus (joinType) {
        let skuValueObj = {
          schemeId: this.classDetailInfo.schemeId,
          commoditySkuId: this.classDetailInfo.skuId
        }
        if (
          this.classDetailInfo.courseId !== undefined &&
          this.classDetailInfo.courseId.length
        ) {
          skuValueObj.courseId = this.classDetailInfo.courseId
        }
        if (
          this.classDetailInfo.coursePackageId !== undefined &&
          this.classDetailInfo.coursePackageId.length
        ) {
          skuValueObj.coursePoolId = this.classDetailInfo.coursePackageId
        }
        let params = {
          skuId: this.classDetailInfo.skuId
        }
        params.orderSkuPlaceInfo = skuValueObj
        if (
          this.classDetailInfo.courseId !== undefined &&
          this.classDetailInfo.courseId.length
        ) {
          params.courseId = this.classDetailInfo.courseId
        }
        if (
          this.classDetailInfo.coursePackageId !== undefined &&
          this.classDetailInfo.coursePackageId.length
        ) {
          params.coursePoolId = this.classDetailInfo.coursePackageId
        }
        this.$store
          .dispatch(storeTypes.CLASS_BUY_JUDGE, params)
          .then(data => {
            if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
              this.toast(data.head.message)
              return
            }
            let code = parseInt(data.data.code)
            if (code === storeTypes.NETWORK_RESULT_SUCCESS) {
              if (
                this.categoryType === 'COURSE_SUPERMARKET_GOODS' &&
                this.classDetailInfo.optionYearList && this.classDetailInfo.optionYearList.length > 0
              ) {
                this.showYearPicker = true
                this.joinType = joinType
              } else {
                this.dealActions(joinType)
              }
            } else if (code === 30821) {
              if (this.classType === 'TRAINING_LINEOFF_CLASS') {
                this.toast('该面授班已报名，无需重复报名！')
              } else {
                this.toast('该课程已报名，无需重复报名！')
              }
              // 30824：已在未支付订单中
            } else if (code === 30824) {
              let that = this
              this.$vux.confirm.show({
                title: '提示',
                content: '该课程已存在未支付的订单，是否前往支付？',
                onCancel () {
                  console.log('plugin cancel')
                },
                onConfirm () {
                  console.log('plugin confirm')
                  that.push('/orderPay?orderNo=' + data.data.orderNo)
                }
              })
            } else if (code === 505) {
              this.toast(data.data.msg)
            } else {
              this.toast(data.data.msg)
            }
          })
          .catch(e => {
            console.log('<<<<<' + e)
          })
      },
      confirmSelectCourse () {
        let _this = this
        this.enablePurchase(() => {
          _this.$vux.confirm.show({
            title: '提示',
            content: '确认进行本次选课?',
            confirmText: '确认选课',
            cancelText: '取消',
            onCancel: function () {
            },
            onConfirm: function () {
              _this.confirmSelectCourseRequest()
            }
          })
        }, 1)
      },
      confirmSelectCourseRequest () {
        if (this.submitAble) {
          return false
        }
        var params = {
          paymentChannel: Global.isWeiXin() ? 'WECHAT_OFFICIAL_ACCOUNTS' : 'HTML5',
          courseOrderMode: 'NORMAL',
          orderSkuPlaceInfoList: [{
            commoditySkuId: this.classDetailInfo.skuId,
            coursePoolId: this.classDetailInfo.coursePackageId,
            courseId: this.classDetailInfo.courseId
          }]
        }
        this.submitAble = true
        let _this = this
        this.$vux.loading.show({
          text: '选课中！！！'
        })
        this.$store.dispatch(storeTypes.SELECT_COURSE, params).then((data) => {
          this.$vux.loading.hide()
          this.submitAble = false
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
//            _this.classDetailInfo.hasBuy = true
            this.$vux.confirm.show({
              title: '提示',
              content: '选课成功！',
              confirmText: '继续选课',
              cancelText: '进入学习',
              onCancel: function () {
                _this.goStudy()
              },
              onConfirm: function () {
                _this.$router.push({
                  path: '/selfSelectCourse',
                  query: {
                    year: utils.getSkuValueName(_this.classDetailInfo.skuPropertyNameList, 'trainingYear')
                  }
                })
              }
            })
          } else {
            this.$store.commit('selectCourseCommonDo', {
              data: data.data.creditOperateResult,
              context: _this,
              code: data.head.code,
              message: data.head.message,
              year: this.yearCode
            })
          }
        })
      },
      addShopping () {
        this.enablePurchase(() => {
          this.addShoppingRequest()
        }, 2)
      },
      addShoppingRequest () {
        if (this.submitAble) {
          return false
        }
        let params = {
          addCommodity: {
            schemeId: this.classDetailInfo.schemeId,
            skuId: this.classDetailInfo.skuId,
            coursePoolId: this.classDetailInfo.coursePackageId,
            courseId: this.classDetailInfo.courseId
          }
        }
        this.submitAble = true
        this.$store.dispatch(storeTypes.ADD_SHOPPINGCART, params).then((data) => {
          this.submitAble = false
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
//            加入购物车成功后手动刷新一下底部购物车BAR
            this.refreshShoppingCartBar()
            this.addShoppingCartSuccess = true
            setTimeout(() => {
              this.addShoppingCartSuccess = false
            }, 2000)
          } else if (data.head.code === 30801) {
            this.toast('兑课清单已存在该课程，无需重复加入！')
          } else {
            this.toast(data.head.message)
          }
        })
      }
    },
    mounted() {
//      let _this = this
//      this.$vux.confirm.show({
//        title: '提示',
//        content: '选课成功！',
//        confirmText: '继续选课',
//        cancelText: '进入学习',
//        onCancel: function () {
//          _this.goStudy()
//        },
//        onConfirm: function () {
//          _this.$router.push({
//            path: '/selfSelectCourse',
//            query: {
//              year: utils.getSkuValueName(_this.classDetailInfo.skuPropertyNameList, 'trainingYear')
//            }
//          })
//        }
//      })
    },
    beforeRouteEnter(to, f, next) {
      if (f.path === '/helpMeSelectCourse') {
        AppConstant.sysContext.fromHelpMeSelectCourse = true
      } else {
        AppConstant.sysContext.fromHelpMeSelectCourse = false
      }
      next()
    }
  }
</script>
