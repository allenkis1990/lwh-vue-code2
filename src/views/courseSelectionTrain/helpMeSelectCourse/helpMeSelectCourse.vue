<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">[{{$route.query.yearCode}}年度]帮你快速选课</div>
    </div>
    <!--标题栏-->
    <div class="course-select-training-helpme">
      <div class="helpme-box" style="width:100%;height:100%;">
        <div class="tit">帮你快速选课，一键轻松选课推荐的课程如下：</div>
        <!--<div class="situation">
          <img src="../../../../design/images/pic-tongji2.png" />
        </div>-->
        <div style="width:100%;height:3.28rem">
          <pie-statistics
            class-name="helpMeSelectEcharMain"
            :data-source="echarsData"></pie-statistics>
        </div>
      </div>
    </div>
    <div class="e-course-tit"
         v-show="queryBoxCurrent!=='all'"
         style="margin-top:4.9rem;">
      <div class="item">
        <div class="text">{{queryBoxCurrentNav}}</div><!--<img src="../../../../design/images/icon-clear-bg.png" />-->
      </div>
      <a href="javascript:void(0)" @click="queryBoxShow=!queryBoxShow">切换</a>
    </div>
    <!--班级列表-->
    <scroller
      style="box-sizing: border-box;"
      :style="queryBoxCurrent==='all'?{'margin-top':'4.9rem'}:''"
      :height="scrollerHeight"
      lock-x
      scrollbar-y
      use-pulldown
      @on-pulldown-loading="refreshData"
      v-model="scroller" ref="scroller">
      <div>
        <div class="hb-wrap-box-4"
             style="padding-bottom:2rem;">
          <div class="hb-panel">
            <no-data v-if="!currentHelpResult.length"></no-data>
            <div class="hb-panel-bd" v-if="currentHelpResult.length">
              <div class="hb-media-box"
                   @click="goClassDetail(item)"
                   v-for="(item,index) in currentHelpResult">
                <div class="hb-media-box-hd">
                  <img class="hb-media-box-thumb"
                       :src="imageUrl(item)"/>
                  <!--<div class="course-tag">必修</div>-->
                </div>
                <div class="hb-media-box-bd">
                  <div class="hb-media-box-title">{{item.courseName}}</div>
                  <div class="hb-media-box-desc">科目：{{item.trainingSubject}}</div>
                  <div class="hb-media-box-desc">资格等级：{{item.professionalGrade}}</div>
                  <div class="hb-media-box-desc">学分：{{item.period}}</div>
                </div>
              </div>
            </div>
            <div class="loading-tips"><span class="line"></span><span class="txt">已经到最底部啦</span><span
              class="line"></span></div>
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
    </scroller>
    <!--/班级列表-->
    <div v-show="queryBoxShow">
      <div class="e-course-change-box" :style="queryBoxCurrent!=='all'?{'bottom':0}:''">
        <div class="item clear">
          <div class="con"><a href="javascript:void(0)"
                              :class="{cur:queryBoxCurrent==='all'}"
                              @click="searchResultList('all')"
                              class="pb0">全部</a></div>
        </div>
        <div class="item clear">
          <div class="tit" @click="searchResultList('public')">公需科目<span>(共{{helpResult.publicCount}}门，共{{helpResult.publicCredit}}学分)</span>
            <div class="pic"><img v-show="queryBoxCurrent!=='public'"
                                  src="../../../../design/images/icon-go.png"/><img v-show="queryBoxCurrent==='public'"
                                                                                    src="../../../../design/images/icon-go-bgbase.png"/>
            </div>
          </div>
          <div class="con">
            <a href="javascript:void(0)"
               :class="{cur:queryBoxCurrent===item.categoryName}"
               @click="searchResultList('itemCategory',item,'公需科目')"
               v-for="(item,index) in helpResult.publicSubject.category">{{item.categoryName}}，{{item.count}}门，{{item.period}}学分</a>
          </div>
        </div>
        <div class="item clear">
          <div class="tit" @click="searchResultList('profess')">专业科目<span>(共{{helpResult.professCount}}门，共{{helpResult.professCredit}}学分)</span>
            <div class="pic"><img v-show="queryBoxCurrent!=='profess'"
                                  src="../../../../design/images/icon-go.png"/><img v-show="queryBoxCurrent==='profess'"
                                                                                    src="../../../../design/images/icon-go-bgbase.png"/>
            </div>
          </div>
          <div class="con">
            <a href="javascript:void(0)"
               :class="{cur:queryBoxCurrent===item.categoryName}"
               @click="searchResultList('itemCategory',item,'专业科目')"
               v-for="(item,index) in helpResult.professionalSubject.category">{{item.categoryName}}，{{item.count}}门，{{item.period}}学分</a>
          </div>
        </div>
      </div>
      <div class="weui-mask" @click="queryBoxShow=false"></div>
    </div>
    <!--v-if="queryBoxCurrent==='all'&&currentHelpResult.length"-->
    <div class="hb-tabbar"
         style="z-index:999"
         v-if="currentHelpResult.length">
      <div class="left-box flex e-course-tab-left" @click="queryBoxShow=!queryBoxShow">
        <div class="text"><span v-show="!queryBoxShow">查看课程结构</span><span v-show="queryBoxShow">收起课程体系</span></div>
        <div class="pic"><img v-show="!queryBoxShow"
                              src="../../../../design/images/icon-go2.png"/><img v-show="queryBoxShow"
                                                                                 src="../../../../design/images/icon-go3.png"/>
        </div>
      </div>
      <div class="hb-btn hb-btn2" @click="confirmSelectCourse"><img src="../../../../design/images/icon-exchange.png"/>确认选课
      </div>
      <!--不可操作-->
      <!--<div class="hb-btn hb-btn2 disabled"><img src="../../../../design/images/icon-exchange.png" />确认选课</div>-->
    </div>
    <study-qrcode ref="studyQrcode"></study-qrcode>
  </div>
</template>

<style lang="less">

</style>

<script>
  import { Scroller, InlineLoading } from 'vux'
  import pieStatistics from '@/components/pieStatistics'
  import * as storeTypes from '@/store/types'
  import utils from '@/common/util/Utils'
  import Global from '@/global/global'
  import studyQrcode from '@/components/StudyQrcodeComponent.vue'
  import NoData from '@/components/NoData.vue'

  export default {
    data () {
      return {
        echarsData: [],
        helpResult: {
          all: [],
          publicSubject: {
            all: [],
            category: []
          },
          professionalSubject: {
            all: [],
            category: []
          },
          publicCount: 0,
          publicCredit: 0,
          professCount: 0,
          professCredit: 0
        },
        currentHelpResult: [],
        queryBoxCurrent: 'all',
        queryBoxCurrentNav: '',
        queryBoxShow: false,
        scrollerHeight: '',
        scroller: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
//      0加载 1下拉加载 2加载更多
        scorllerStatus: 0
      }
    },
    mounted () {
      this.setScrollerHeight()
      this.getHelpResultList()
    },
    computed: {},
    components: {
      Scroller,
      InlineLoading,
      pieStatistics,
      studyQrcode,
      NoData
    },
    methods: {
      imageUrl (item) {
        if (!item.iconPath) {
          return require('../../../../design/images/course-img.jpg')
        }
        return item.iconPath
      },
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
      goStudy () {
        this.$refs.studyQrcode.show()
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
      refreshData () {
        console.log(this.scroller)
        console.log('下拉刷新！！！')
        this.scorllerStatus = 1
        if (this.queryBoxCurrent !== 'all') {
          setTimeout(() => {
            this.loadingUIState()
          }, 300)
        } else {
          this.getHelpResultList()
        }
      },
      //      设置scroller高度
      setScrollerHeight () {
        let h1 = Number.parseInt(utils.selectClass('.hb-header-box').height)
        let h2 = Number.parseInt(utils.selectClass('.course-select-training-helpme').height)
        let h3 = this.queryBoxCurrent === 'all' ? 0 : Number.parseInt(utils.selectClass('.e-course-tit').height)
        this.scrollerHeight = (window.outerHeight - (h1 + h2 + h3) || window.innerHeight - (h1 + h2 + h3)) + 'px'
        console.log(this.scrollerHeight, '高度')
      },
      getPieData (options) {
        let data = {
          totalPublicCredit: options.publicCredit,
          totalPublicCount: options.publicCount,
          totalMajorCredit: options.professCredit,
          totalMajorCount: options.professCount
        }
        let publicName = '公需科目\n' + data.totalPublicCredit + '学分，' + data.totalPublicCount + '门'
        let majorName = '专业科目\n' + data.totalMajorCredit + '学分，' + data.totalMajorCount + '门'
        let tempArr = []
        tempArr.push({
          name: publicName, value: data.totalPublicCredit, itemStyle: {
            color: 'rgb(255,195,51)'
          }
        })
        tempArr.push({
          name: majorName, value: data.totalMajorCredit, itemStyle: {
            color: 'rgb(41,157,213)'
          }
        })
        this.echarsData = tempArr
        console.log(this.echarsData)
      },
//      获取帮我选课结果列表
      getHelpResultList () {
        var context = this
        this.$vux.loading.show({
          text: '加载中'
        })
        var params = {
          yearCode: context.$route.query.yearCode,
          pubicCredit: context.$route.query.pubicCredit,
          professionalCredit: context.$route.query.professionalCredit
        }
        this.$store.dispatch(storeTypes.SELECT_TRAIN_HELPLIST, params).then((data) => {
          this.loadingUIState()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            console.log(data.data.courseCommoditySubjectGroupVoList, 'json!!')
            if (data.data.courseCommoditySubjectGroupVoList && data.data.courseCommoditySubjectGroupVoList.length) {
              this.parseHelpResultList(data.data.courseCommoditySubjectGroupVoList)
            }  else if (data.data.code === 30901 || data.data.code === '30901') {
              context.$router.replace({
                path: '/demo/courseSelectionTrain'
              })
            } else {
              this.getPieData({
                publicCredit: 0,
                publicCount: 0,
                professCredit: 0,
                professCount: 0
              })
              this.initHelpResult()
              this.$vux.alert.show({
                title: '提示',
                content: 'Sorry，当前无可推荐的课程！',
                buttonText: '知道了',
                onShow () {
                },
                onHide () {
                  context.$router.replace({
                    path: '/demo/courseSelectionTrain'
                  })
                }
              })
            }
          } else {
            context.toast('请求失败')
          }
        })
      },
      initHelpResult () {
        this.helpResult = {
          all: [],
          publicSubject: {
            all: [],
            category: []
          },
          professionalSubject: {
            all: [],
            category: []
          },
          publicCount: 0,
          publicCredit: 0,
          professCount: 0,
          professCredit: 0
        }
        this.currentHelpResult = []
      },
      commonPush (arr, grandItem, trainingSubject, professionalGrade, isYearCategory) {
        let obj = {
          schemeId: grandItem.schemeId,
          courseId: grandItem.courseId,
          courseName: grandItem.courseName,
          period: grandItem.period,
          trainingSubject: trainingSubject,
          professionalGrade: professionalGrade,
          commoditySkuId: grandItem.commoditySkuId,
          coursePoolId: grandItem.coursePoolId,
          iconPath: grandItem.iconPath,
          fromOtherCommoditySKu: grandItem.fromOtherCommoditySKu,
          originalCommoditySkuId: grandItem.originalCommoditySkuId,
          creditReset: grandItem.creditReset
        }
        if (isYearCategory) {
          obj.categoryId = this.$route.query.yearCode
          obj.categoryName = this.$route.query.yearCode
        } else {
          obj.categoryId = grandItem.categoryId
          obj.categoryName = grandItem.categoryName
        }
        arr.push(obj)
      },
//      打平列表
      parseHelpResultList (arr) {
        this.initHelpResult()
        arr.forEach((item) => {
          let trainingSubject = utils.getSkuValueName(item.skuPropertyList, 'trainingSubject')
          let professionalGrade = utils.getSkuValueName(item.skuPropertyList, 'professionalGrade')
          if (item.courseCommodityCategoryGroupVoList && item.courseCommodityCategoryGroupVoList.length) {
            if (trainingSubject === '专业科目') {
              this.helpResult.professCount = item.count
              this.helpResult.professCredit = item.period
              this.helpResult.professionalSubject.category = item.courseCommodityCategoryGroupVoList
            }
            if (trainingSubject === '公需科目') {
              this.helpResult.publicCount = item.count
              this.helpResult.publicCredit = item.period
//              公需课按年度分 年度只有一个所以写死一个数组
              this.helpResult.publicSubject.category = [{
                categoryName: this.$route.query.yearCode,
                count: item.count,
                period: item.period,
                courseCommodityBaseVoList: []
              }]
            }
            item.courseCommodityCategoryGroupVoList.forEach((subItem, subIndex) => {
              if (subItem.courseCommodityBaseVoList && subItem.courseCommodityBaseVoList.length) {
                subItem.courseCommodityBaseVoList.forEach((grandItem, grandIndex) => {
                  this.commonPush(this.helpResult.all, grandItem, trainingSubject, professionalGrade, false)
                  if (trainingSubject === '专业科目') {
                    this.commonPush(this.helpResult.professionalSubject.all, grandItem, trainingSubject, professionalGrade, false)
//                    因为原来的courseCommodityGroupVoList缺少科目和等级所以这里赋值
                    this.helpResult.professionalSubject.category[subIndex].courseCommodityBaseVoList[grandIndex].trainingSubject = trainingSubject
                    this.helpResult.professionalSubject.category[subIndex].courseCommodityBaseVoList[grandIndex].professionalGrade = professionalGrade
                  }
                  if (trainingSubject === '公需科目') {
//                    把所有的公需课程都塞到这个年度里面去
                    this.commonPush(this.helpResult.publicSubject.category[0].courseCommodityBaseVoList, grandItem, trainingSubject, professionalGrade, true)
                    this.commonPush(this.helpResult.publicSubject.all, grandItem, trainingSubject, professionalGrade, true)
                  }
                })
              }
            })
          }
        })
        this.currentHelpResult = this.helpResult.all
//        生成饼图
        this.getPieData({
          publicCredit: this.helpResult.publicCredit,
          publicCount: this.helpResult.publicCount,
          professCredit: this.helpResult.professCredit,
          professCount: this.helpResult.professCount
        })
        console.log(this.helpResult, '打平数据')
      },
      searchResultList (type, item, itemType) {
//        防重复点击
        if (type === 'itemCategory' && this.queryBoxCurrent === item.categoryName) {
          return false
        }
//        防重复点击
        if (this.queryBoxCurrent === type && type !== 'itemCategory') {
          return false
        }
        this.$refs.scroller.reset({ top: 0 })
        this.queryBoxShow = false
//        如果选中的是ITEM那么把类别名当作当前选中 否则当前选中就是传进来的type
        if (type !== 'itemCategory') {
          this.queryBoxCurrent = type
        } else {
          this.queryBoxCurrent = item.categoryName
        }
        switch (type) {
          case 'all':
            this.currentHelpResult = this.helpResult.all
            this.queryBoxCurrentNav = ''
            break
          case 'public':
            this.currentHelpResult = this.helpResult.publicSubject.all
            this.queryBoxCurrentNav = '公需科目'
            this.setScrollerHeight()
            break
          case 'profess':
            this.currentHelpResult = this.helpResult.professionalSubject.all
            this.queryBoxCurrentNav = '专业科目'
            this.setScrollerHeight()
            break
          case 'itemCategory':
            this.currentHelpResult = item.courseCommodityBaseVoList
            this.queryBoxCurrentNav = itemType + '/' + item.categoryName
            this.setScrollerHeight()
            break
        }
      },
      confirmSelectCourse () {
        if (this.submitAble) {
          return false
        }
        this.queryBoxShow = false
        let _this = this
        _this.$vux.confirm.show({
          title: '提示',
          content: '确认进行本次选课？',
          confirmText: '确认选课',
          cancelText: '取消',
          onCancel: function () {
          },
          onConfirm: function () {
            _this.confirmSelectCourseRequest()
          }
        })
      },
      confirmSelectCourseRequest () {
        if (this.submitAble) {
          return false
        }
        let params = {
          paymentChannel: Global.isWeiXin() ? 'WECHAT_OFFICIAL_ACCOUNTS' : 'HTML5',
          courseOrderMode: 'RECOMMEND',
          orderSkuPlaceInfoList: []
        }
        this.submitAble = true
        this.helpResult.all.forEach((item) => {
          params.orderSkuPlaceInfoList.push({
            commoditySkuId: item.commoditySkuId,
            coursePoolId: item.coursePoolId,
            courseId: item.courseId,
            fromOtherCommoditySKu: item.fromOtherCommoditySKu,
            originalCommoditySkuId: item.originalCommoditySkuId,
            creditReset: item.creditReset,
            hour: item.period
          })
        })
        console.log(this.helpResult.all, '~~~~')
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
                this.submitAble = true
                if (res.data.type === 3) {
                  let content = '选课成功！' + '<br><br>' + '完成' + res.data.yearCode + '年度继续教育90学分要求，您还需要' + res.data.needPurchaseCredit + '学分！'
                  this.$vux.confirm.show({
                    title: '提示',
                    content: content,
                    confirmText: '前往购买学分',
                    cancelText: '暂不',
                    onCancel: function () {
                      setTimeout(() => {
                        _this.submitAble = false
                        _this.getHelpResultList()
                      }, 500)
                    },
                    onConfirm: function () {
                      let pa = {}
                      _this.getStudentOrderTipInfo(pa, () => {
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
                    cancelText: '返回',
                    onCancel: function () {
                      _this.$router.replace({
                        path: '/demo/courseSelectionTrain'
                      })
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
            if (data.head.code + '' === '309042') {
              this.$vux.alert.show({
                title: '提示',
                content: '推荐的课程，存在个别课程已不开放选择，系统为你重新推荐！',
                buttonText: '好的,前往',
                onShow () {
                },
                onHide () {
                  _this.submitAble = true
                  setTimeout(() => {
                    _this.submitAble = false
                    _this.getHelpResultList()
                  }, 500)
                }
              })
              return false
            }
            this.$store.commit('selectCourseCommonDo', {
              data: data.data.creditOperateResult,
              context: _this,
              code: data.head.code,
              message: data.head.message
            })
          }
        })
      }
    }
  }
</script>

