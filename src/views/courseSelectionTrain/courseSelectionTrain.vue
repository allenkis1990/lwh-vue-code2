<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">选课培训<div><button @click="routeBack">111111</button></div></div>
      <!--<div class="header-right">
        <a class="hb-ico ico-center"></a>
      </div>-->
    </div>
    <!--标题栏-->
    <div class="course-select-training">

      <scroller
        style="box-sizing: border-box;"
        :height="scrollerHeight"
        lock-x
        scrollbar-y
        use-pulldown
        @on-pulldown-loading="refreshData"
        v-model="scroller" ref="scroller">
        <div>
          <div class="preview clear">
            <popup-picker :data="trainYearList"
                          class="yearListPickPlaceHolder"
                          placeholder="请选择继续教育年度"
                          popup-title="请选择继续教育年度"
                          :display-format="format"
                          value-text-align="left"
                          v-model="trainYearModel"
                          @on-hide="pickHide"
                          @on-change="changeYear()">
            </popup-picker>
            <!--<div class="tit">
              <div class="text">2018年度继续教育学分分布</div>
              <div class="pic"><img src="../../../design/images/icon-go-bg.png" /></div>
            </div>-->
            <div class="chart clear" :class="{'inheritBox':selectCourseRecommend.needPurchasedCredits<=0}">
              <div class="pic" :class="{'marginauto':selectCourseRecommend.needPurchasedCredits<=0}" style="background:none;">
                <!--<img src="../../../design/images/pic-tongji.png" />-->
                <circle-statistics
                  class-name="courseSelectEcharMain"
                  :label-text="circleText"
                  label-color="#333"
                  :label-fontsize="circleLabelFontSize"
                  :data-source="echarsData"></circle-statistics>
              </div>
              <div class="text" :class="{'marginauto':selectCourseRecommend.needPurchasedCredits<=0}">
                <!--<div class="item">
                  <div class="color color-1"></div>
                  <div class="name">已获得学分</div>
                  <div class="num">{{selectCourseRecommend.finishCredit}}学分</div>
                </div>-->
                <div class="item">
                  <div class="color color-2"></div>
                  <div class="name">已购买学分</div>
                  <div class="num">{{selectCourseRecommend.purchasedCredits}}学分</div>
                </div>
                <div class="item" v-if="selectCourseRecommend.needPurchasedCredits>0">
                  <div class="color color-3"></div>
                  <div class="name">还需购买学分</div>
                  <div class="num">{{selectCourseRecommend.needPurchasedCredits}}学分</div>
                </div>
              </div>
            </div>
            <div class="order-tip jcc" v-show="selectCourseRecommend.freezeCredit != undefined && selectCourseRecommend.freezeCredit>0">
              <img src="../../../design/images/icon-warning.png" />
              <div class="text">已购买学分中，<em>{{selectCourseRecommend.freezeCredit}}</em>学分处于退款中，无法选课！</div>
            </div>
            <a href="javascript:void(0)"
               @click="buyCredit"
               class="btn"
               v-show="selectCourseRecommend.needPurchasedCredits>0">点我购买学分</a>
            <div class="line" :class="{'line-margin-top02rem':selectCourseRecommend.needPurchasedCredits<=0}"></div>
            <div class="situation" v-if="selectCourseRecommend.recommendResult===3">
              <div class="text">本年度已购买的学分中，剩余<span>{{selectCourseRecommend.remainCredit}}</span>学分，尚未完成选课。系统根据您选课情况，建议您完成以下科目的选课：</div>
              <div class="proportion">
                <div class="left"
                     :class="{'pre100':selectCourseRecommend.professionalRecommendCredit<=0}"
                     :style="{width:publicPre+'%'}"></div>
                <div class="right"
                     :class="{'pre100':selectCourseRecommend.publicRecommendCredit<=0}"
                     :style="{width:professionalPre+'%'}"></div>
              </div>
              <div class="proportion-txt">
                <div class="item"
                     v-if="selectCourseRecommend.publicRecommendCredit>0"
                     :class="{'justifyCenter':selectCourseRecommend.publicRecommendCredit>0&&selectCourseRecommend.professionalRecommendCredit<=0}">
                  <div class="color color-1"></div>
                  <div class="name">公需科目</div>
                  <div class="num">{{selectCourseRecommend.publicRecommendCredit}}学分</div>
                </div>
                <div class="item"
                     v-if="selectCourseRecommend.professionalRecommendCredit>0"
                     :class="{'justifyCenter':selectCourseRecommend.professionalRecommendCredit>0&&selectCourseRecommend.publicRecommendCredit<=0}">
                  <div class="color color-2"></div>
                  <div class="name">专业科目</div>
                  <div class="num num-2">{{selectCourseRecommend.professionalRecommendCredit}}学分</div>
                </div>
              </div>
              <a href="javascript:void(0)"
                 @click="fastSelectCourse"
                 class="btn mb0">点我快速选课</a>
              <a href="javascript:void(0)"
                 @click="selfSelectCourse"
                 class="btn2">自主选课>></a>
            </div>
            <div class="situation" v-if="selectCourseRecommend.recommendResult===2">
              <div class="proportion-img"><img src="../../../design/images/icon-traing1.png" /></div>
              <div class="text tc">请先购买学分，方可快速的完成选课！</div>
              <a href="javascript:void(0)"
                 @click="fastSelectCourse"
                 class="btn mb0">点我快速选课</a>
              <a href="javascript:void(0)"
                 @click="selfSelectCourse()"
                 class="btn2">自主选课>></a>
            </div>
            <div class="situation" v-if="selectCourseRecommend.recommendResult===1">
              <div class="proportion-img"><img src="../../../design/images/icon-traing2.png" /></div>
              <div class="text tc">您已完成本继续教育年度的学分选课，无需选课！</div>
              <div class="text tc"><a href="javascript:void(0)"
                                      @click="goSelf"
                                      class="btn3">浏览平台课程目录</a><a href="javascript:void(0)"
                                                                  @click="goStudy"
                                                                  class="btn3">进入学习</a></div>
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
    </div>
    <study-qrcode ref="studyQrcode"></study-qrcode>
  </div>
</template>

<style lang="less">
  .line-margin-top02rem{margin-top:0.2rem}
  .yearListPickPlaceHolder {
    font-size: .28rem;
    .weui-cell {
      padding: 0 !important;
    }
    .vux-popup-picker-placeholder {
      color: #333 !important;
      font-weight:bold;
    }
    .vux-popup-picker-value {
      font-size: .28rem;
      color: #333 !important;
    }
  }
  .course-select-training .preview .chart .pic.marginauto{
    margin:0px auto
  }
  .course-select-training .preview .chart .text.marginauto{margin:10px auto}
  .course-select-training .preview .chart.inheritBox{display:inherit}
  .course-select-training .preview .situation .proportion-txt .item.justifyCenter{
    justify-content: center;
  }
  .course-select-training .preview .situation .proportion .right.pre100{
    border-top-left-radius: .1rem;
    border-bottom-left-radius: .1rem;
  }
  .course-select-training .preview .situation .proportion .left.pre100{
    border-top-right-radius: .1rem;
    border-bottom-right-radius: .1rem;
  }
</style>

<script>
  import circleStatistics from '@/components/circleStatistics'
  import {PopupPicker, Scroller, InlineLoading} from 'vux'
  import utils from '@/common/util/Utils'
  import * as storeTypes from '@/store/types'
  import studyQrcode from '@/components/StudyQrcodeComponent.vue'
  export default {
    data () {
      return {
        echarsData: [],
        trainYearModel: [],
        trainYearList: [],
//        年度学分统计
        tjObj1: {},
//        科目学分统计
        tjObj2: {},
        circleLabelFontSize: '',
        leftStyle: {},
        rightStyle: {},
        skuPropertyKeyValueList: [],
        selectCourseRecommend: {
          finishCredit: this.$store.state.courseSelectionTrainModule.selectCourseRecommend.finishCredit,
          purchasedCredits: this.$store.state.courseSelectionTrainModule.selectCourseRecommend.purchasedCredits,
          needPurchasedCredits: this.$store.state.courseSelectionTrainModule.selectCourseRecommend.needPurchasedCredits,
          freezeCredit: this.$store.state.courseSelectionTrainModule.selectCourseRecommend.freezeCredit
        },
        scrollerHeight: '',
        scroller: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
//      0加载 1下拉加载
        scorllerStatus: 0,
        circleText: '年度\n学分'
      }
    },
    mounted () {
      this.setScrollerHeight()
      this.getCircleLabelFontSize()
      this.getYearList()
    },
    computed: {
    },
    components: {
      circleStatistics,
      PopupPicker,
      studyQrcode,
      Scroller,
      InlineLoading
    },
    methods: {
      routeBack () {
//        console.log(this.$router,'fuck');
//        window.location.replace('#/demo/newHome')
//        this.$router.go(-1)
//        history.pushState(null, null, document.URL);
//        window.addEventListener('popstate', function () {
//          history.pushState(null, null, document.URL);
//        })
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
        this.getYearList(true).then((data) => {
          if (data.state) {
            this.getYearSkuList(data.yearCode)
            console.log(data,'~~~');
          }
        })
      },
      //      设置scroller高度
      setScrollerHeight () {
        let h1 = Number.parseInt(utils.selectClass('.hb-header-box').height);
//        底部的导航
        let h2 = 53
        this.scrollerHeight = (window.outerHeight - (h1 + h2) || window.innerHeight - (h1 + h2)) + 'px';
        console.log(this.scrollerHeight,'高度');
      },
      goSelf () {
        this.$router.push({
          path: '/selfSelectCourse',
          query: {
            year: this.trainYearModel[0]
          }
        })
      },
      goStudy () {
        this.$refs.studyQrcode.show()
      },
      //      获取快速选课推荐
      getSelectCourseRecommend(arr) {
        let params = {
          skuPropertyKeyValueList: arr
        }
        this.$vux.loading.show({
          text: '加载中'
        })
        this.$store.dispatch(storeTypes.SELECT_COURSE_RECOMMEND, params).then((data) => {
          this.loadingUIState()
          this.$vux.loading.hide()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.selectCourseRecommend = data.data
//            this.selectCourseRecommend.professionalRecommendCredit = 0
            this.$store.commit('rememberCircleData', data.data)
            this.getCircleData(this.selectCourseRecommend)
            this.publicPre = this.selectCourseRecommend.publicRecommendCredit ? ((this.selectCourseRecommend.publicRecommendCredit / this.selectCourseRecommend.remainCredit) * 100) : 0
            this.professionalPre = this.selectCourseRecommend.professionalRecommendCredit ? ((this.selectCourseRecommend.professionalRecommendCredit / this.selectCourseRecommend.remainCredit) * 100) : 0
          } else {
            this.$vux.loading.hide()
            this.loadingUIState()
            this.toast('请求失败')
          }
        })
      },
//      获取年度的sku用来请求推荐选课数据
      getYearSkuList(year) {
        this.$store.dispatch(storeTypes.GET_SELF_SKU_LIST).then((data) => {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            let yearItem = utils.findItem(data.data,'code','trainingYear')
            if (yearItem) {
              let yearValueItem = utils.findItem(yearItem.options, 'skuPropertyValueName', year)
              if (yearValueItem) {
                this.skuPropertyKeyValueList = [{
                  propertyId: yearItem.skuPropertyId,
                  propertyIdCode: yearItem.code,
                  value: yearValueItem.skuPropertyValueId
                }]
                this.getSelectCourseRecommend(this.skuPropertyKeyValueList)
              }
            }
          } else {
            this.loadingUIState()
            this.toast('请求失败')
          }
        })
      },
//      点击购买学分
      buyCredit () {
        let _this = this
        let params = {}
        _this.getStudentOrderTipInfo(params, () => {
          _this.$router.push({
            path: '/createOrder',
            query: {
              currentYear: _this.trainYearModel[0]
            }
          });
        }, this.trainYearModel[0], true)
      },
//      点击自主选课
      selfSelectCourse() {
        let _this = this
        switch (this.selectCourseRecommend.recommendResult) {
          case 3:
            this.$vux.loading.show({
              text: '加载中'
            })
            this.$store.dispatch(storeTypes.JUDGE_ENTER_SELFSELECT_COURSE).then((data) => {
              this.$vux.loading.hide()
              if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
                let code = data.data.code
                if (Number(code) === storeTypes.NETWORK_RESULT_SUCCESS) {
                  this.$router.push({
                    path: '/selfSelectCourse',
                    query: {
                      year: this.trainYearModel[0]
                    }
                  })
                } else {
                  switch (code) {
                    case '30901':
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
                      let msg = data.data.message ? data.data.message : '自主选课失败，请联系管理员'
//                      this.toast(msg)
                      console.log(msg);
                      this.$router.push({
                        path: '/selfSelectCourse',
                        query: {
                          year: this.trainYearModel[0]
                        }
                      })
                  }
                }
              } else {
                this.toast('请求失败')
              }
            })
//            判断是否有异常记录
            break;
          case 2:
            this.$vux.confirm.show({
              title: '提示',
              content: '您当前无可选课的学分，建议先购买学分！',
              confirmText: '浏览课程',
              cancelText: '前往购买',
              onCancel: function () {
                let params = {}
                _this.getStudentOrderTipInfo(params, () => {
                  _this.$router.push({
                    path: '/createOrder',
                    query: {
                      currentYear: _this.trainYearModel[0]
                    }
                  });
                },_this.trainYearModel[0], true)
              },
              onConfirm: function () {
                _this.$router.push({
                  path: '/selfSelectCourse',
                  query: {
                    year: _this.trainYearModel[0]
                  }
                })
              }
            })
            break;
        }
      },
//      点击快速选课
      fastSelectCourse () {
        let _this = this
        switch (this.selectCourseRecommend.recommendResult) {
          case 3:
//            判断是否可以进入快速选课，课程够不够
//            判断是否有异常记录
            let queryParams = {
              pubicCredit: this.selectCourseRecommend.publicRecommendCredit,
              professionalCredit: this.selectCourseRecommend.professionalRecommendCredit,
              yearCode: this.trainYearModel[0]
            }
            this.$vux.loading.show({
              text: '加载中'
            })
            this.$store.dispatch(storeTypes.SELECT_TRAIN_HELPLIST, queryParams).then((data) => {
              this.$vux.loading.hide()
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
                let params = {}
                _this.getStudentOrderTipInfo(params, () => {
                  _this.$router.push({
                    path: '/createOrder',
                    query: {
                      currentYear: _this.trainYearModel[0]
                    }
                  });
                },_this.trainYearModel[0], true)
              }
            })
            break;
        }
      },
//      获取圆环统计中间的文字大小
//      由于只能接收px为单位所以要用html标签的fontSize*0.28rem得出px这样设备大小变化文字大小才能跟着变
      getCircleLabelFontSize () {
        let htmlFontSize = Number.parseInt(utils.selectClass('html').fontSize);
        this.circleLabelFontSize = (htmlFontSize * 0.28) + ''
        console.log(this.circleLabelFontSize);
      },
//      拼装圆形统计环数据
      getCircleData (data) {
        let tempArr = []
//        tempArr.push({
//          itemName: '已获得学分', value: data.finishCredit, itemStyle: {
//            color: '#007dba'
//          }
//        })
        tempArr.push({itemName: '已购买学分', value: data.purchasedCredits,itemStyle: {
          color: '#fa5655'
        }})
        tempArr.push({itemName: '还需购买学分', value: data.needPurchasedCredits,itemStyle: {
          color: '#ffc320'
        }})
        this.echarsData = tempArr
        console.log(this.echarsData);
//        setTimeout(() => {
//          this.echarsData = [
//            {value: 2, itemName: 'a',itemStyle: {
//              color: 'red'
//            }},
//            {value: 2, itemName: 'b',itemStyle: {
//              color: 'black'
//            }},
//            {value: 4, itemName: 'c',itemStyle: {
//              color: 'blue'
//            }},
//            {value: 5, itemName: 'd',itemStyle: {
//              color: 'green'
//            }},
//            {value: 7, itemName: 'e',itemStyle: {
//              color: 'pink'
//            }}
//          ]
//        },3000)
      },
//      获取年度数组
//      pullDown:false初始化 true下拉加载
      getYearList (pullDown) {
        if (!pullDown) {
          this.trainYearModel = []
          this.trainYearList = []
        }
        return new Promise((resolve,reject) => {
          this.$store.dispatch(storeTypes.GET_ALL_ORDER_YEAR).then((data) => {
            if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
              let tempArr = []
              data.data.forEach((item) => {
                tempArr.push({name: item, value: item})
              })
              this.trainYearList = [tempArr]
//          默认选中当前年度如果没有就选中年度数组第一个,初始化的时候才给一个默认值
              if (!pullDown) {
                this.trainYearModel = [this.getCurrentYear(data.data) ? this.getCurrentYear(data.data) : data.data[0]]
                resolve({state: false})
              } else {
                if (this.trainYearModel[0]) {
                  let yearIndex = data.data.indexOf(this.trainYearModel[0])
                  if (yearIndex < 0) {
                    this.trainYearModel = [this.getCurrentYear(data.data) ? this.getCurrentYear(data.data) : data.data[0]]
//                    下拉刷新后年度变了走watch流程,变了说明之前的年度数据丢了
                    resolve({state: false, yearCode: this.trainYearModel[0]})
                  } else {
//                    下拉刷新后年度没变走then的流程
                    resolve({state: true, yearCode: this.trainYearModel[0]})
                  }
                } else {
//                  下拉刷新后年度变了走watch流程,变了说明之前的年度数据丢了
                  this.trainYearModel = [this.getCurrentYear(data.data) ? this.getCurrentYear(data.data) : data.data[0]]
                  resolve({state: false, yearCode: this.trainYearModel[0]})
                }
              }
            } else {
              this.toast('请求失败')
              this.loadingUIState()
              resolve({state: false})
            }
          })
        })
      },
//      选中一个年度触发
      changeYear () {
//        console.log(this.trainYearModel);
      },
      pickHide () {},
//      自定义在cell上的显示格式，参数为当前 value，使用该属性时，show-name 属性将失效
      format: function (value, name) {
        return `${name}年度继续教育学分购买情况`
      },
//      获取当前年度id
      getCurrentYear (yearArr) {
        let fullYear = new Date().getFullYear() + '';
        let current = ''
        let index = yearArr.indexOf(fullYear)
        if (index >= 0) {
          current = yearArr[index]
        }
        return current;
      }
    },
    watch: {
      trainYearModel: {
        handler: function (nv, ov) {
          if (nv && nv.length && nv[0]) {
            console.log('nv:' + nv[0], 'ov:' + ov[0])
            if (nv[0] === ov[0]) {
              return false
            }
            console.log(nv[0], '年度值变化');
            this.getYearSkuList(nv[0])
          }
        },
        deep: true
      }
    }
  }
</script>

