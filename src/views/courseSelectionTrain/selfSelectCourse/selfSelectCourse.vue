<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box"
         v-show="!modalShow">
      <div class="header-tit">[{{$route.query.year}}年度]选课培训</div>
      <!--<div class="header-right">
        <a class="hb-ico ico-center"></a>
      </div>-->
    </div>
    <!--标题栏-->
    <div class="course-select-training-self" v-if="!modalShow">
      <div class="preview clear">
        <div class="situation">
          <div class="text">根据继续教育规定90学分培训要求。您，{{$route.query.year}}年度，选课学分分布如下：</div>
          <div class="proportion-tit clear">
            <div class="left">公需科目</div>
            <div class="right">专业科目</div>
            <div class="line-dotted"></div>
          </div>
          <div class="proportion">
            <div class="left">
              <div class="cur" :style="{width:yearLearnSituation.publicCourseTrainingStatus.pre+'%'}"></div>
            </div>
            <div class="right">
              <div class="cur" :style="{width:yearLearnSituation.professionCourseTrainingStatus.pre+'%'}"></div>
            </div>
            <div class="line-dotted"></div>
          </div>
          <div class="proportion-txt">
            <div class="item">
              <div class="color color-1"></div>
              <div class="name">已完成选课</div>
              <div class="num">{{yearLearnSituation.publicCourseTrainingStatus.publicHasSelect}}学分</div>
            </div>
            <div class="item">
              <div class="color color-2"></div>
              <div class="name">已完成选课</div>
              <div class="num">{{yearLearnSituation.professionCourseTrainingStatus.professionHasSelect}}学分</div>
            </div>
          </div>
          <div class="proportion-txt">
            <div class="item">
              <div class="color"></div>
              <div class="name">未完成选课</div>
              <div class="num">{{yearLearnSituation.publicCourseTrainingStatus.publicCourseNeedTrainingCredit}}学分</div>
            </div>
            <div class="item">
              <div class="color"></div>
              <div class="name">未完成选课</div>
              <div class="num">{{yearLearnSituation.professionCourseTrainingStatus.professionCourseNeedTrainingCredit}}学分</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <sku-search v-show="tabType==='COURSE_SUPERMARKET_GOODS'"
                :training-year="selectYear"
                ref="COURSE_SUPERMARKET_GOODS"
                @findClassList="findSelfPickClassList"
                category-type="COURSE_SUPERMARKET_GOODS"
                classType="1">
      <div class="select-items-cont select-items-cont-3" slot="creditSearch">
        <div class="select-items-hd">
          <div class="filter-circle"></div>
          <span class="fs30">学分区间</span>
        </div>
        <div class="select-items-bd">
          <div class="select-item"
               :class="{'current':item.begin===beginHour&&item.end===endHour}"
               @click="tabCrdit(item)"
               v-for="(item,index) in crditList">{{item.name}}</div>
        </div>
      </div>
    </sku-search>
    <scroller
      v-if="!modalShow"
      style="box-sizing: border-box;"
      :height="scrollerHeight"
      lock-x
      scrollbar-y
      use-pulldown
      use-pullup
      @on-pullup-loading="loadMoreFn"
      @on-pulldown-loading="refreshData"
      v-model="scroller" ref="scroller">
      <div>
        <div class="hb-wrap-box-4 pb100" v-if="!modalShow">
          <div class="hb-panel">
            <no-data v-if="!selfClassList.length"></no-data>
            <div class="hb-panel-bd" v-if="selfClassList.length">
              <!--<div class="hb-media-box">
                <div class="hb-media-box-hd">
                  <img class="hb-media-box-thumb" src="../../../../design/images/course-img.jpg" />
                  <div class="label">已选择</div>
                </div>
                <div class="hb-media-box-bd">
                  <div class="hb-media-box-title">这里是一个课程名称这里是一个课程名称</div>
                  <div class="hb-media-box-desc">年度：2019年<span class="ml20">科目：专业科目</span></div>
                  <div class="hb-media-box-desc">专业技术资格等级：初级</div>
                  <div class="hb-media-box-desc">学分：30</div>
                </div>
              </div>-->
              <div class="hb-media-box"
                   @click="goClassDetail(item)"
                   v-for="(item,index) in selfClassList">
                <div class="hb-media-box-hd">
                  <img class="hb-media-box-thumb" :src="iamgeUrl(item)" />
                  <div class="label" v-if="item.hasBuy">已选择</div>
                </div>
                <div class="hb-media-box-bd">
                  <div class="hb-media-box-title">{{item.skuName}}</div>
                  <div class="hb-media-box-desc">年度：{{getSkuValueName(item.skuPropertyNameList,'trainingYear')}}年<span class="ml20">科目：{{getSkuValueName(item.skuPropertyNameList,'trainingSubject')}}</span></div>
                  <div class="hb-media-box-desc">专业技术资格等级：{{getSkuValueName(item.skuPropertyNameList,'professionalGrade')}}</div>
                  <div class="hb-media-box-desc">学分：{{item.credits}}</div>
                </div>
              </div>

            </div>
            <div class="loading-tips" v-if="selfPickTotalSize<selfPickPager.pageSize"><span class="line"></span><span class="txt">已经到最底部啦</span><span class="line"></span>
            </div>
            <div class="loading-tips" v-if="(tabType==='COURSE_SUPERMARKET_GOODS'&&selfPickTotalSize>=selfPickPager.pageSize) && scroller.pullupStatus === 'default'"><span class="line"></span><span class="txt">上拉加载更多</span><span class="line"></span>
            </div>
            <!--<div class="loading-tips"><span class="line"></span><span class="txt">已经到最底部啦</span><span class="line"></span></div>-->
          </div>
        </div>
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
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
           style="position: absolute; width: 100%; height: 40px; bottom: 10px; text-align: center;">
        <!--<load-more :show-loading="false" v-show="((tabType==='TRAINING_CLASS_GOODS'&&trainClassTotalSize>0)||(tabType==='COURSE_SUPERMARKET_GOODS'&&selfPickTotalSize)) && scroller.pullupStatus === 'default'" :tip="'上拉加载更多'"
                   background-color="#F4F4F4"></load-more>-->
        <span class="pullup-arrow"
              v-show="(scroller.pullupStatus === 'up'||scroller.pullupStatus === 'down') && !noMore"
              :class="{'rotate':scroller.pullupStatus === 'down'}"
              style="font-size: 16px;font-weight: bold;">↑</span>
        <div v-show="scroller.pullupStatus === 'loading'">
          <p class="inloading">
            <inline-loading></inline-loading>
            <span class="il-text">
      加载中...
      </span>
          </p>
        </div>
      </div>
    </scroller>
    <!--返回顶部-->
    <div class="layer-box">
      <div class="a-items" @click="fastSelect()">
        <img class="img" src="../../../../design/images/icon-ksxk.png" alt=" " />
      </div>
    </div>
    <!--/返回顶部-->
    <select-info-bar
      ref="selectInfoBar"
      :year-sku-arr="skuPropertyKeyValueList"
      v-show="!modalShow"></select-info-bar>

    <!--快速选课弹窗-->
    <div class="js_dialog" style="opacity: 1;" v-if="showFastSelectDialog">
      <div class="weui-mask"></div>
      <div class="dialog-quick-box" style="margin-top: -50px">
        <div class="quick-box">
          <div class="bg"><img src="../../../../design/images/quick-bg.png" /></div>
          <div class="con">
            <div class="hd">{{selectCourseRecommend.yearCode}}年度，您已购买的学分中，可进行以下科目学分的选课：</div>
            <div class="bd">
              <div class="item">
                <div class="name">公需科目</div>
                <div class="slider slider-1" >
                  <div :class="{'cur':publicPre>0}"
                       :style="{width:publicPre+'%'}">
                    <!--<div class="slider-block"></div>-->
                  </div>
                </div>
                <div class="num">{{selectCourseRecommend.publicRecommendCredit}}学分</div>
              </div>
              <div class="item">
                <div class="name">专业科目</div>
                <div class="slider">
                  <div :class="{'cur':professionalPre>0}"
                       :style="{width:professionalPre+'%'}">
                    <!--<div class="slider-block"></div>-->
                  </div>
                </div>
                <div class="num">{{selectCourseRecommend.professionalRecommendCredit}}学分</div>
              </div>

            </div>
          </div>
          <a class="quick-btn" @click="fastSelectGoView"><img src="../../../../design/images/quick-btn.png" /></a>
        </div>
        <a class="btn-close" @click="showFastSelectDialog=false"><img src="../../../../design/images/icon-close.png" /></a>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  #app{overflow:auto}
</style>

<script>
  import { Scroller, InlineLoading } from 'vux'
  import NoData from '@/components/NoData.vue'
  import * as storeTypes from '@/store/types'
  import skuSearch from '@/views/home/skuSearchComponent/skuSearchComponent.vue'
  import utils from '@/common/util/Utils'
  import constant from '@/global/constants/AppConstant'
  import selectInfoBar from '@/views/home/selectInfoBar'
  export default {
    components: {
      Scroller,
      InlineLoading,
      NoData,
      skuSearch,
      selectInfoBar
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
        noMore: false,
        orderNo: '',
        tabList: [
          {name: '自主选课', type: 'COURSE_SUPERMARKET_GOODS'}
        ],
        tabType: 'COURSE_SUPERMARKET_GOODS', // 默认培训班tab
        selfClassList: [],
        loadMore: false,
        selfPickPager: {pageNo: 1, pageSize: 10},
        selfPickTotalSize: 0,
        loadMoreTrggierTime: null,
        modalShow: false,
        showFastSelectDialog: false,
        selectYear: this.$route.query.year,
        crditList: [
          {name: '所有学分', begin: '', end: ''},
          {name: '0-5', begin: 0, end: 5},
          {name: '6-10', begin: 6, end: 10},
          {name: '11-15', begin: 11, end: 15},
          {name: '16-20', begin: 16, end: 20},
          {name: '21-25', begin: 21, end: 25},
          {name: '26-30', begin: 26, end: 30}
        ],

        beginHour: '',
        endHour: '',
        hourName: '所有学分',
        skuPropertyKeyValueList: [],
//        选课推荐
        selectCourseRecommend: {},
        yearLearnSituation: {
          publicCourseTrainingStatus: {},
          professionCourseTrainingStatus: {}
        },
        yearCode: this.$route.query.year
      }
    },
    created () {
    },
    mounted () {
//      console.log(this.$refs.selectInfoBar.$forceUpdate(),'kk');
      this.setScrollerHeight()
      let that = this
      this.$watch('$refs.COURSE_SUPERMARKET_GOODS.status', function (nv) {
        if (nv) {
          that.modalShow = true
        } else {
          that.modalShow = false
        }
        console.log(nv,'kk');
      })
    },
    methods: {
//      对拿到的顶部学分数据进行处理
      parseYearData (yearLearnSituation) {
        //            未完成 = 在培训 + 还差
//            公需已选
        yearLearnSituation.publicCourseTrainingStatus.publicHasSelect = utils.clearZero(utils.accAdd(yearLearnSituation.publicCourseTrainingStatus.publicCourseTrainingCredit,yearLearnSituation.publicCourseTrainingStatus.publicCourseTrainedCredit))
//            专业已选
        yearLearnSituation.professionCourseTrainingStatus.professionHasSelect = utils.clearZero(utils.accAdd(yearLearnSituation.professionCourseTrainingStatus.professionCourseTrainingCredit,yearLearnSituation.professionCourseTrainingStatus.professionCourseTrainedCredit))
//            公需总共
        yearLearnSituation.publicCourseTrainingStatus.total = utils.clearZero(utils.accAdd(yearLearnSituation.publicCourseTrainingStatus.publicHasSelect,yearLearnSituation.publicCourseTrainingStatus.publicCourseNeedTrainingCredit))
//            专业总共
        yearLearnSituation.professionCourseTrainingStatus.total = utils.clearZero(utils.accAdd(yearLearnSituation.professionCourseTrainingStatus.professionHasSelect,yearLearnSituation.professionCourseTrainingStatus.professionCourseNeedTrainingCredit))
//            公需百分比
        if (yearLearnSituation.publicCourseTrainingStatus.publicHasSelect === 0 || yearLearnSituation.publicCourseTrainingStatus.total === 0) {
          yearLearnSituation.publicCourseTrainingStatus.pre = 0
        } else {
          yearLearnSituation.publicCourseTrainingStatus.pre = (yearLearnSituation.publicCourseTrainingStatus.publicHasSelect / yearLearnSituation.publicCourseTrainingStatus.total) * 100
        }
//            专业百分比
        if (yearLearnSituation.professionCourseTrainingStatus.professionHasSelect === 0 || yearLearnSituation.professionCourseTrainingStatus.total === 0) {
          yearLearnSituation.professionCourseTrainingStatus.pre = 0
        } else {
          yearLearnSituation.professionCourseTrainingStatus.pre = (yearLearnSituation.professionCourseTrainingStatus.professionHasSelect / yearLearnSituation.professionCourseTrainingStatus.total) * 100
        }
        this.yearLearnSituation = yearLearnSituation
      },
//      用于自主选课列表顶部的公需专业学分统计
      getYearLearnSituation () {
        let params = {
          selectTrainingYearName: this.$route.query.year
        }
        this.$store.dispatch(storeTypes.YEAR_LEARN_SITUATION,params).then((data) => {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.parseYearData(data.data)
          } else {
            this.toast('请求失败')
          }
        })
      },
      //      点击快速选课
      fastSelectGoView () {
        let _this = this
        switch (this.selectCourseRecommend.recommendResult) {
          case 3:
            if (this.submitAble) {
              return false
            }
//            判断是否可以进入快速选课，课程够不够
//            判断是否有异常记录
            let queryParams = {
              pubicCredit: this.selectCourseRecommend.publicRecommendCredit,
              professionalCredit: this.selectCourseRecommend.professionalRecommendCredit,
              yearCode: this.selectCourseRecommend.yearCode
            }
            this.$vux.loading.show({
              text: '加载中'
            })
            this.submitAble = true
            this.$store.dispatch(storeTypes.SELECT_TRAIN_HELPLIST, queryParams).then((data) => {
              this.$vux.loading.hide()
              this.submitAble = false
              if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
                let code = data.data.code
                if (Number(code) === storeTypes.NETWORK_RESULT_SUCCESS) {
                  this.$router.push({
                    path: '/helpMeSelectCourse',
                    query: queryParams
                  })
                } else {
                  switch (code) {
                    case '30905':
                      this.$vux.confirm.show({
                        title: '提示',
                        content: '您存在一条选课异常的记录，请联系客服，优先处理，再进行选课！',
                        confirmText: '拨打联系客服',
                        cancelText: '知道了',
                        onCancel: function () {
                        },
                        onConfirm: function () {
                          _this.giveRing('968823')
                        }
                      })
                      break
                    default:
                      let msg = data.data.message ? data.data.message : '智能选课失败，请联系管理员'
                      this.toast(msg)
                  }
                }
              } else {
                this.toast('请求失败')
              }
            })
            break;
          case 2:
            this.$vux.confirm.show({
              title: '提示',
              content: '请先购买学分，系统才可帮你快速选课！',
              confirmText: '前往购买',
              cancelText: '知道了',
              onCancel: function () {
              },
              onConfirm: function () {
                let pa = {}
                let currentYear = new Date().getFullYear() + ''
                _this.getStudentOrderTipInfo(pa, () => {
                  _this.$router.push({
                    path: '/createOrder',
                    query: {
                      currentYear: currentYear
                    }
                  });
                },currentYear, true)
              }
            })
            break;
          case 1:
            this.$vux.alert.show({
              title: '提示',
              content: '您已完成本继续教育年度的学分选课，无需选课！',
              buttonText: '知道了',
              onShow() {
              },
              onHide() {
              }
            })
            break
        }
      },
      fastSelect() {
        if (this.submitAble) {
          return false
        }
        this.getSelectCourseRecommend(this.skuPropertyKeyValueList)
      },
      tabCrdit: function (item) {
        this.beginHour = item.begin
        this.endHour = item.end
        this.hourName = item.name
      },
//      设置scroller高度
      setScrollerHeight () {
        let h1 = Number.parseInt(utils.selectClass('.course-select-training-self').height);
        let h2 = Number.parseInt(utils.selectClass('.hb-header-box').height);
        let h3 = Number.parseInt(utils.selectClass('.screening-bar-exchange').height);
        this.scrollerHeight = (window.outerHeight - (h1 + h2 + h3) || window.innerHeight - (h1 + h2 + h3)) + 'px';
        console.log(this.scrollerHeight);
      },
      /**
       * 判断是否短时间内触发两次加载更多
       */
      judgeLoadMoreTriggerToShort () {
        if (this.loadMoreTrggierTime) {
          if (new Date().getTime() - this.loadMoreTrggierTime < 200) {
            console.log(new Date().getTime() - this.loadMoreTrggierTime, 'todo 时间差太小了不运行')
            this.loadingUIState()
            return true
          } else {
            this.loadMoreTrggierTime = new Date().getTime()
            return false
          }
        } else {
          this.loadMoreTrggierTime = new Date().getTime()
          return false
        }
      },
      drawerVisibilityEvent () {
        this.$store.commit(storeTypes.GLOBAL_SET_DRAWER, true)
      },
      initPager: function () {
        this.trainClassPager = {pageNo: 1, pageSize: 10}
        this.selfPickPager = {pageNo: 1, pageSize: 10}
        this.trainLineOffClassPager = {pageNo: 1, pageSize: 10}
      },
      getSkuValueName: function (skuArr,code) {
        return utils.getSkuValueName(skuArr,code)
      },
      loadMoreFn: function () {
        if (!this.resetPullUp()) {
          return false
        }
        if (this.judgeLoadMoreTriggerToShort()) {
          return false
        }
        var that = this
        this.scorllerStatus = 2
        var params = null
        if (this.tabType === 'TRAINING_CLASS_GOODS') {
          if (this.trainClassTotalSize < this.trainClassPager.pageSize) {
            console.log('没有更多了')
            this.loadingUIState()
            return false
          }
          this.trainClassPager.pageNo++
          params = {
            pageNo: that.trainClassPager.pageNo,
            pageSize: that.trainClassPager.pageSize,
            skuPropertyList: that.$refs.TRAINING_CLASS_GOODS.skuPropertySearchList,
            trainingClassType: '1'
          }
          this.$refs.TRAINING_CLASS_GOODS.refreshClassList(params, constant.apiUrl.classListModule.trainClass)
        } else if (this.tabType === 'COURSE_SUPERMARKET_GOODS') {
          if (this.selfPickTotalSize < this.selfPickPager.pageSize) {
            console.log('没有更多了')
            this.loadingUIState()
            return false
          }
          this.selfPickPager.pageNo++
          params = {
            pageNo: that.selfPickPager.pageNo,
            pageSize: that.selfPickPager.pageSize,
            skuPropertyList: that.$refs.COURSE_SUPERMARKET_GOODS.skuPropertySearchList,
            trainingClassType: '1'
          }
          this.$refs.COURSE_SUPERMARKET_GOODS.refreshClassList(params, constant.apiUrl.classListModule.self)
        } else {
          if (this.trainLineOffClassTotalSize < this.trainLineOffClassPager.pageSize) {
            console.log('没有更多了')
            this.loadingUIState()
            return false
          }
          this.trainLineOffClassPager.pageNo++
          params = {
            pageNo: that.trainLineOffClassPager.pageNo,
            pageSize: that.trainLineOffClassPager.pageSize,
            skuPropertyList: that.$refs.TRAINING_LINEOFF_CLASS.skuPropertySearchList,
            trainingClassType: '2'
          }
          this.$refs.TRAINING_LINEOFF_CLASS.refreshClassList(params, constant.apiUrl.classListModule.trainClass)
        }
        console.log('我已经到底部')
      },
      findSelfPickClassList: function (params,url) {
        let yearItem = utils.findItem(params.skuPropertyList,'propertyIdCode','trainingYear')
        if (yearItem) {
          this.skuPropertyKeyValueList = [{
            propertyId: yearItem.propertyId,
            propertyIdCode: yearItem.propertyIdCode,
            value: yearItem.value
          }]
        }
        var type = 'post'
        console.log(params,url,'自主选课')
        if (this.scorllerStatus === 0) {
          this.$vux.loading.show({
            text: '加载中'
          })
        }
        if (this.beginHour !== '' && this.endHour !== '') {
          params.beginHour = this.beginHour
          params.endHour = this.endHour
        }
        utils.getAjaxData(type, params, url).then(res => {
          this.loadingUIState();
          if (this.$refs.scroller !== undefined && this.scorllerStatus !== 2) this.$refs.scroller.reset({top: 0})
          if (res.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            return this.toast(res.head.message)
          } else {
            console.log(res.data, '自主选课列表')
            this.selfPickTotalSize = res.data.commodityList.length
//            2是加载更多
            if (this.scorllerStatus === 2) {
              this.selfClassList = this.selfClassList.concat(res.data.commodityList)
              this.scorllerStatus = 0
            } else {
              this.selfClassList = res.data.commodityList
              this.initPager()
            }
          }
        }).catch(e => {
          this.loadingUIState();
          console.log(e)
        })
      },
//      获取快速选课推荐
      getSelectCourseRecommend(arr) {
        let params = {
          skuPropertyKeyValueList: arr
        }
        this.submitAble = true
        this.$store.dispatch(storeTypes.SELECT_COURSE_RECOMMEND, params).then((data) => {
          this.submitAble = false
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.showFastSelectDialog = true
            this.selectCourseRecommend = data.data
            this.publicPre = this.selectCourseRecommend.publicRecommendCredit ? ((this.selectCourseRecommend.publicRecommendCredit / 30) * 100) : 0
            this.professionalPre = this.selectCourseRecommend.professionalRecommendCredit ? ((this.selectCourseRecommend.professionalRecommendCredit / 60) * 100) : 0
          } else {
            this.toast('请求失败')
          }
        })
      },
      loadingUIState () {
        if (this.scorllerStatus === 1) {
          if (this.$refs.scroller !== undefined) {
            this.$refs.scroller.donePulldown()
            this.scroller.pulldownStatus = 'default'
            this.scorllerStatus = 0
            return
          }
        }
        if (this.scorllerStatus === 2) {
          if (this.$refs.scroller !== undefined) {
            this.$refs.scroller.donePullup()
            this.scroller.pullupStatus = 'default'
            return
          }
        }
        this.$vux.loading.hide()
      },
//      筛选SKU的时候不执行下拉操作
//      resetPullDown () {
//        if (this.modalShow) {
//          this.scroller.pulldownStatus = 'default'
//          this.$refs.scroller.donePulldown()
//          this.scorllerStatus = 0
//          this.$refs.scroller.reset({top: 0})
//          return false
//        } else {
//          return true
//        }
//      },
//      筛选SKU的时候不执行加载更多
      resetPullUp () {
        if (this.modalShow) {
          this.scroller.pullupStatus = 'default'
          this.$refs.scroller.donePullup()
          this.scorllerStatus = 0
          this.$refs.scroller.reset({bottom: 0})
          return false
        } else {
          return true
        }
      },
      /**
       * 上拉刷新
       */
      refreshData () {
//        if (!this.resetPullDown()) {
//          return false
//        }
        console.log(this.scroller)
        console.log('下拉刷新！！！')
        this.scorllerStatus = 1
        var that = this
        var COURSE_SUPERMARKET_GOODS_PARAMS = {
          pageNo: 1,
          pageSize: 10,
          skuPropertyList: that.$refs.COURSE_SUPERMARKET_GOODS.skuPropertySearchList,
          trainingClassType: '1'
        }
        if (this.beginHour !== '' && this.endHour !== '') {
          COURSE_SUPERMARKET_GOODS_PARAMS.beginHour = this.beginHour
          COURSE_SUPERMARKET_GOODS_PARAMS.endHour = this.endHour
        }
        if (that.$refs.COURSE_SUPERMARKET_GOODS.courseCategoryId) {
          COURSE_SUPERMARKET_GOODS_PARAMS.courseCategoryId = that.$refs.COURSE_SUPERMARKET_GOODS.courseCategoryId
        }
//       下拉刷新自主选课列表 培训班列表
        this.$refs.COURSE_SUPERMARKET_GOODS.refreshClassList(COURSE_SUPERMARKET_GOODS_PARAMS,constant.apiUrl.classListModule.self)
//        console.log(this.$refs.TRAINING_CLASS_GOODS.skuPropertySearchList)
//        console.log(this.$refs.COURSE_SUPERMARKET_GOODS.skuPropertySearchList)
      },
      /**
       * 滚动顶部  点击事件
       */
      goTopEvent () {
        this.$refs.scroller.reset({top: 0})
      },
      /**
       * 班级列表的item  点击事件
       */
      goClassDetail (item) {
        let trainingItem = {
          skuId: item.skuId,
          schemeId: item.schemeId
        }
        if (item.categoryType === 'COURSE_SUPERMARKET_GOODS') {
          trainingItem.courseId = item.courseId
          trainingItem.coursePackageId = item.coursePackageId
        }
//        utils.setSessionStorage(storeTypes.CLASS_DETAIL_TRAINING_ITEM,trainingItem)
        this.$store.dispatch(storeTypes.CLASS_DETAIL_TRAINING_ITEM, trainingItem)
        this.$router.push({
          path: '/classDetail',
          query: {
            categoryType: item.categoryType,
            classType: this.tabType
          }
        })
      },
      iamgeUrl (item) {
        if (!item.photoPath) {
          return require('../../../../design/images/course-img.jpg')
        }
        return item.photoPath
      },
      refreshList () {
        this.beginHour = ''
        this.endHour = ''
        this.hourName = '所有学分'
        this.$refs.COURSE_SUPERMARKET_GOODS.courseCategoryId = ''
        this.$refs.COURSE_SUPERMARKET_GOODS.courseCategoryName = '所有分类'
        this.$refs.COURSE_SUPERMARKET_GOODS.getSkuValue().then((data) => {
          if (data) {
            this.refreshData()
          }
        })
      },
      activatedDo() {
//        keepAlive的时候底部购物车BAR要刷新，头部的选课情况也要刷新
//        keepAlive的时候只有年度变得情况下才刷新列表
        this.getYearLearnSituation()
        var type = 'get'
        var url = 'mobile/home/mobileCommodity/listSkuProperty'
        var param = {
          categoryType: 'COURSE_SUPERMARKET_GOODS',
          trainingClassType: '1',
          propertyQueries: []
        }
        let _this = this
        function getYearValue() {
          let yearObj = utils.findItem(_this.$store.state.skuData, 'code', 'trainingYear')
          let yearItem = utils.findItem(yearObj.options, 'skuPropertyValueName', _this.$route.query.year)
          let params = {
            skuPropertyKeyValueList: [{
              propertyId: yearObj.skuPropertyId,
              propertyIdCode: 'trainingYear',
              value: yearItem.skuPropertyValueId
            }]
          }
          _this.$refs.selectInfoBar.countShoppingCartCredit(params.skuPropertyKeyValueList)
        }
        if (!this.$store.state.skuData.length) {
          utils.getAjaxData(type, param, url).then((res) => {
            this.$store.state.skuData = res.data
            getYearValue()
          })
        } else {
          getYearValue()
        }
        if (this.$store.state.selectYear) {
          if (this.$store.state.selectYear !== this.$route.query.year) {
            debugger
            this.$store.state.selectYear = this.$route.query.year
            this.selectYear = this.$route.query.year
            this.yearCode = this.$route.query.year
            this.refreshList()
          }
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.state.selectYear = this.$route.query.year
      this.$refs.COURSE_SUPERMARKET_GOODS.status = false
      next()
    },
    beforeRouteEnter(to, f, next) {
      if (f.path === '/classDetail') {
        constant.sysContext.visitSelfListFromDetail = true
      } else {
        constant.sysContext.visitSelfListFromDetail = false
      }
      console.log(f);
      next()
    },
    activated () {
      if (constant.sysContext.visitSelfListFromDetail) {
        this.refreshList()
      }
      this.activatedDo()
//      this.getYearLearnSituation()
      // 从购物车过来的请求刷新页面
//      let isFromShopCart = this.$store.state.classModule.isFromShopCart
//      if (this.$route.query.unitId && isFromShopCart) {
//        this.currentOrgan = {
//          unitId: this.$route.query.unitId,
//          unitName: this.$route.query.unitName,
//          domain: this.$route.query.domain
//        }
//        this.setHeaderDomain(this.currentOrgan.domain)
//        this.$refs.COURSE_SUPERMARKET_GOODS.getSkuValue()
//        this.$refs.COURSE_SUPERMARKET_GOODS.yearHided = false
//        this.refreshData()
//        this.$store.commit(storeTypes.SET_IS_FROM_SHOPCART, false)
//      }
    }
  }
</script>

