<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">[专业技术资格等级：{{skuPropertyValue(compulsoryCourseList[0], 'professionalGrade')}}]必修课程
      </div>
      <div class="header-right">
        <!--<a class="hb-ico ico-center"></a>-->
      </div>
    </div>
    <!--标题栏-->
    <div class="e-course-box-wrap">
      <div class="e-course-box">
        <div class="course-tag">{{skuPropertyValue(compulsoryCourseList[0], 'trainingYear')}}</div>
        <!--<div class="course-go"><img src="../../../design/images/icon-go-w.png" /></div>-->
        <div class="item" v-show="filterResultObject.publicSubject.coursePeriod>0">
          <h2>公需科目</h2>
          <p><em>{{filterResultObject.publicSubject.coursePeriod}}</em> 学分</p>
        </div>
        <div class="item" v-show="filterResultObject.professionSubject.coursePeriod>0">
          <h2>专业科目</h2>
          <p><em>{{filterResultObject.professionSubject.coursePeriod}}</em> 学分</p>
        </div>
      </div>
      <div class="e-course-title">以下课程为根据继续教育培训方针，制定的必修课程</div>
    </div>
    <div class="e-course-tit" v-show="filterSelectedShowUI().length">
      <div class="item">
        <div class="text">{{filterSelectedShowUI()}}</div>
        <img @click="setSelectObject('all', '')" src="../../../design/images/icon-clear-bg.png"/></div>
      <a href="javascript:void(0)" @click="seeCourseStructure()">切换</a>
    </div>
    <!--滚动到顶部悬停添加fixed-->
    <!--
    <div class="e-course-tit fixed">
      <div class="text">课程分类名称1/公需科目</div><img src="../images/icon-clear-bg.png" /></div>
      <a href="#">切换</a>
    </div>
    -->
    <!--班级列表-->
    <div class="hb-wrap-box-4">
      <div class="hb-panel">
        <div class="hb-panel-bd">
          <div class="hb-media-box" v-for="(item,index) in filterResultObject.filterResultList" :key="index">
            <div class="hb-media-box-hd">
              <img class="hb-media-box-thumb" src="../../../design/images/course-img.jpg"/>
            </div>
            <div class="hb-media-box-bd">
              <div class="hb-media-box-title">{{item.courseName}}</div>
              <div class="hb-media-box-desc">科目：{{skuPropertyValue(item,'trainingSubject')}}</div>
              <div class="hb-media-box-desc">专业技术资格等级：{{skuPropertyValue(item,'professionalGrade')}}</div>
              <div class="hb-media-box-desc">学分：{{item.period}}</div>
            </div>
          </div>
        </div>
        <div class="loading-tips"><span class="line"></span><span class="txt">已经到最底部啦</span><span class="line"></span>
        </div>
      </div>
    </div>
    <!--/班级列表-->
    <!--<div class="e-course-tip">-->
    <!--<div class="pic"><img src="../images/icon-warning.png" /></div>-->
    <!--<div class="text">您持有X学分支持兑换课程。本次兑换课程还差Y学分，<a href="#">前往购买</a></div>-->
    <!--</div>-->
    <div v-show="showCoursecClassifyUI" class="weui-mask"></div>
    <div class="e-course-change-box" v-show="showCoursecClassifyUI">

      <div class="item clear">
        <div class="con">
          <a href="javascript:void(0)" :class="selectBackgroundColor(0)" @click="setSelectObject('all')">全部</a>
        </div>
      </div>
      <div class="item clear" v-show="filterResultObject.publicSubject.courseCount > 0">
        <a href="javascript:void(0)" @click="setSelectObject('public')">
          <div class="tit">公需科目<span>(共{{filterResultObject.publicSubject.courseCount}}门，共{{filterResultObject.publicSubject.coursePeriod}}学分)</span>
            <div class="pic"><img src="../../../design/images/icon-go.png"/></div>
          </div>
        </a>
        <div class="con">
          <a href="javascript:void(0)" :class="selectBackgroundColor(1)"
             @click="setSelectObject('public', item.categoryName)"
             v-for="(item,index) in filterResultObject.publicSubject.courseCategoryList">{{item.categoryName}}，
            {{filterResultObject.publicSubject.courseCount}}门，{{filterResultObject.publicSubject.coursePeriod}}学分</a>
        </div>
      </div>
      <div class="item clear" v-show="filterResultObject.professionSubject.courseCount > 0">
        <a href="javascript:void(0)" @click="setSelectObject('profession')">
          <div class="tit">专业科目<span>(共{{filterResultObject.professionSubject.courseCount}}门，共{{filterResultObject.professionSubject.coursePeriod}}学分)</span>
            <div class="pic"><img src="../../../design/images/icon-go.png"/></div>
          </div>
        </a>
        <div class="con">
          <a href="javascript:void(0)" :class="selectBackgroundColor(2,index)"
             @click="setSelectObject('profession',item.categoryName)"
             v-for="(item,index) in filterResultObject.professionSubject.courseCategoryList">{{item.categoryName}}，
            {{item.categoryCount}}门，{{item.categoryPeriod}}学分</a>
        </div>
      </div>
    </div>
    <div class="hb-tabbar" v-show="filterObject.subjectType == 'all' && refreshButtonDataShowUI().length">
      <div class="left-box flex e-course-tab-left">
        <div class="text2">{{refreshButtonDataShowUI()}}</div>
        <div class="pic" v-if="!showCoursecClassifyUI" @click="seeCourseStructure()"><img src="../../../design/images/icon-go-bgbase-up.png" /></div>
        <div class="pic" v-if="showCoursecClassifyUI" @click="seeCourseStructure()"><img src="../../../design/images/icon-go-bgbase-down.png" /></div>
      </div>
      <div class="hb-btn" @click="seeCourseStructure()">查看课程体系<img src="../../../design/images/icon-go.png"/></div>
      <!--不可操作-->
      <!--<div class="hb-btn disabled"><img src="../images/icon-exchange.png" />立即兑换</div>-->
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

</style>
<script>
  import { InlineLoading } from 'vux'
  import * as storeTypes from '../../store/types'

  export default {
    components: {
      InlineLoading
    },

    data () {
      return {
        currentYear: this.$route.query.currentYear,
        filterObject: { // 筛选过滤对象
          subjectType: 'all',
          courseType: ''
        },
        filterResultObject: {
          filterResultList: [], // 筛选过后数组
          publicSubject: {
            courseCount: 0,
            coursePeriod: 0,
            courseYear: -1,
            courseList: [],
            courseCategoryList: []
          }, // 本地处理公需课对象
          professionSubject: {
            courseCount: 0,
            coursePeriod: 0,
            courseList: [],
            courseCategoryList: []
          }, // 本地处理专业课对象
          totalCount: 0,
          totalPeriod: 0
        },
        list: [
          {
            count: 3,
            period: 6,
            courseCommodityCategoryGroupVoList: [
              {
                categoryName: '2018低级课程分类',
                count: 2,
                courseCommodityBaseVoList: [
                  {
                    categoryId: '2c9180176753db7c016755302cde0343',
                    categoryName: '2018低级课程分类',
                    courseId: '2c9180176753db7c0167553069cf0345',
                    courseName: '音乐',
                    period: 1
                  },
                  {
                    categoryId: '2c9180176753db7c016755302cde0343',
                    categoryName: '2018低级课程分类',
                    courseId: '2c9180176753db7c0167553069cf0345',
                    courseName: '美术',
                    period: 2
                  }
                ],
                period: 3
              },
              {
                categoryName: '2018高级课程分类',
                count: 1,
                courseCommodityBaseVoList: [
                  {
                    categoryId: '2c9180176753db7c016755302cde0343',
                    categoryName: '2018低级课程分类',
                    courseId: '2c9180176753db7c0167553069cf0345',
                    courseName: '体育',
                    period: 3
                  }
                ],
                period: 2
              }
            ],
            skuPropertyList: [
              {
                skuPropertyCode: 'trainingYear',
                skuPropertyId: '7a4847b2667e31d9e40652c4d14cdbc2',
                skuPropertyName: null,
                skuPropertyValueCode: null,
                skuPropertyValueId: '812b569c015628569c5a77f6a0315011',
                skuPropertyValueName: '2018'
              },
              {
                skuPropertyCode: 'professionalGrade',
                skuPropertyId: '40289979626a2975024652c4d14cdb11',
                skuPropertyName: null,
                skuPropertyValueCode: null,
                skuPropertyValueId: '40289979626a2975024652c4d14cds26',
                skuPropertyValueName: '初级'
              },
              {
                skuPropertyCode: 'trainingSubject',
                skuPropertyId: '40289979626a2975018652c4d14cdbc3',
                skuPropertyName: null,
                skuPropertyValueCode: null,
                skuPropertyValueId: '40289979626a2975018a77f6a0316101',
                skuPropertyValueName: '公需科目'
              }
            ]
          },
          {
            count: 3,
            period: 10,
            courseCommodityCategoryGroupVoList: [
              {
                categoryName: '2018低级课程分类',
                count: 2,
                courseCommodityBaseVoList: [
                  {
                    categoryId: '2c9180176753db7c016755302cde0343',
                    categoryName: '2018低级课程分类',
                    courseId: '2c9180176753db7c0167553069cf0345',
                    courseName: '语文',
                    period: 2
                  },
                  {
                    categoryId: '2c9180176753db7c016755302cde0343',
                    categoryName: '2018低级课程分类',
                    courseId: '2c9180176753db7c0167553069cf0345',
                    courseName: '数学',
                    period: 3
                  }
                ],
                period: 3
              },
              {
                categoryName: '高级课程',
                count: 1,
                courseCommodityBaseVoList: [
                  {
                    categoryId: '2c9180176753db7c016755302cde0343',
                    categoryName: '高级课程',
                    courseId: '2c9180176753db7c0167553069cf0345',
                    courseName: '英语',
                    period: 5
                  }
                ],
                period: 5
              }
            ],
            skuPropertyList: [
              {
                skuPropertyCode: 'trainingYear',
                skuPropertyId: '7a4847b2667e31d9e40652c4d14cdbc2',
                skuPropertyName: null,
                skuPropertyValueCode: null,
                skuPropertyValueId: '812b569c015628569c5a77f6a0315011',
                skuPropertyValueName: '2018'
              },
              {
                skuPropertyCode: 'professionalGrade',
                skuPropertyId: '40289979626a2975024652c4d14cdb11',
                skuPropertyName: null,
                skuPropertyValueCode: null,
                skuPropertyValueId: '40289979626a2975024652c4d14cds26',
                skuPropertyValueName: '初级'
              },
              {
                skuPropertyCode: 'trainingSubject',
                skuPropertyId: '40289979626a2975018652c4d14cdbc3',
                skuPropertyName: null,
                skuPropertyValueCode: null,
                skuPropertyValueId: '40289979626a2975018a77f6a0316101',
                skuPropertyValueName: '专业科目'
              }
            ]
          }
        ],
        compulsoryCourseList: [],
        showCoursecClassifyUI: false
      }
    },
    mounted () {
      this.requestCompulsoryCourseList()
//      this.compulsoryCourseList = this.list;

    },
    computed: {},
    methods: {
      /**
       * 班级图片
       * @param item
       * @returns {*}
       */
      iamgeUrl (item) {
        if (item.coursePicPath === undefined) {
          return require('../../../design/images/course-img.jpg')
        }
        return item.coursePicPath
      },
//      /**
//       * 获取必修课数组对象
//       * @returns {*}
//       */
//      compulsoryCourseList () {
//        let compulsoryCourseList = this.list; //$store.state.orderModule.compulsoryCourseList
//        if (compulsoryCourseList === undefined || compulsoryCourseList === null) {
//          return []
//        }
//        return compulsoryCourseList
//      },
      /**
       * 筛选sku对象名称
       * @param item
       * @param property
       * @returns {*}
       */
      skuPropertyValue (item, property) {
//        debugger
        if (item == undefined) {
          return
        }
        let skuPropertyObeject = this.skuPropertyObeject(item, property)
        if (skuPropertyObeject !== undefined && skuPropertyObeject !== null) {
          return skuPropertyObeject.skuPropertyValueName
        }
        return ''
      },
      /**
       * 筛选sku对象
       * @param item
       * @param property
       * @returns {*}
       */
      skuPropertyObeject (item, property) {
        let skuPropertyList = item.skuPropertyList
        if (skuPropertyList === undefined || skuPropertyList === null) {
          return ''
        }
        for (let i = 0; i < skuPropertyList.length; i++) {
          if (skuPropertyList[i].skuPropertyCode === property) {
            return skuPropertyList[i]
          }
        }
        return ''
      },
      /**
       * 网络请求---请求必修课数组对象
       */
      requestCompulsoryCourseList () {
        var _this = this
        _this.showLoading('加载中.....')
        var param = {
          yearName: this.currentYear
        }
        _this.$store.dispatch(storeTypes.ORDER_GET_COMPULSORY_COURSE_MSG, param).then(data => {
          _this.hideLoading()
          if (data.head.code == storeTypes.NETWORK_RESULT_SUCCESS) {
            _this.$store.commit(storeTypes.ORDER_SET_COMPULSORY_COURSE_MSG, data.data.courseCommoditySubjectGroupVoList)
            _this.compulsoryCourseList = data.data.courseCommoditySubjectGroupVoList
            debugger
            _this.filterRequestAfterData()
            _this.filterDataShowUI(this.filterObject)
          } else {
            _this.toast(data.head.message)
          }
        }).catch(e => {
          _this.hideLoading()
          console.log('error>>>>>>>' + e)
        })
      },

      /**
       * 本地数据处理
       */
      filterRequestAfterData () {
//        debugger
        this.compulsoryCourseList.forEach((item) => {
          debugger
          if (item.courseCommodityCategoryGroupVoList != undefined && item.courseCommodityCategoryGroupVoList.length) {
            debugger
            if (this.skuPropertyValue(item, 'trainingSubject') === '公需科目') {
              item.courseCommodityCategoryGroupVoList.forEach((subItem) => {
                if (subItem.courseCommodityBaseVoList != undefined && subItem.courseCommodityBaseVoList.length) {
                  this.filterResultObject.publicSubject.courseList = this.filterResultObject.publicSubject.courseList.concat(subItem.courseCommodityBaseVoList) // 拿取公需课全部数组
                }
              })
              var tempStr = this.skuPropertyValue(item, 'trainingYear') + '年度'
              this.filterResultObject.publicSubject.courseCategoryList = [{
                categoryName: tempStr
              }]
              this.filterResultObject.publicSubject.courseCount = item.count
              this.filterResultObject.publicSubject.coursePeriod = item.period
              debugger
            } else if (this.skuPropertyValue(item, 'trainingSubject') === '专业科目') {
              item.courseCommodityCategoryGroupVoList.forEach((subItem) => {
                if (subItem.courseCommodityBaseVoList != undefined && subItem.courseCommodityBaseVoList.length) {
                  this.filterResultObject.professionSubject.courseList = this.filterResultObject.professionSubject.courseList.concat(subItem.courseCommodityBaseVoList) // 拿取公需课全部数组
                  this.filterResultObject.professionSubject.courseCategoryList.push({
                    categoryName: subItem.categoryName,
                    categoryCount: subItem.count,
                    categoryPeriod: subItem.period
                  })
                }
              })
              this.filterResultObject.professionSubject.courseCount = item.count
              this.filterResultObject.professionSubject.coursePeriod = item.period
              debugger
            }
            this.filterResultObject.totalCount += item.count
            this.filterResultObject.totalPeriod += item.period
          }
        })
      },
      /**
       * 过滤数据展示UI
       */
      filterDataShowUI (filterObject) {
        debugger
        this.filterResultObject.filterResultList = []
        var tempList = []
        if (filterObject.subjectType == 'public') {
          tempList = tempList.concat(this.filterResultObject.publicSubject.courseList)
        } else if (filterObject.subjectType == 'profession') {
//          debugger
          if (filterObject.courseType && filterObject.courseType.length) {
            this.filterResultObject.professionSubject.courseList.forEach((item) => {
              if (filterObject.courseType === item.categoryName) {
                tempList.push(item)
              }
            })
          } else {
            tempList = tempList.concat(this.filterResultObject.professionSubject.courseList)
            debugger
          }
        } else {
          tempList = this.filterResultObject.publicSubject.courseList.concat(this.filterResultObject.professionSubject.courseList)
        }
        this.filterResultObject.filterResultList = tempList
      },
      /**
       * 刷新底部UI
       */
      refreshButtonDataShowUI () {
        if (this.filterResultObject.professionSubject.coursePeriod > 0 && this.filterResultObject.publicSubject.coursePeriod > 0) {
          return '共' + this.filterResultObject.totalCount + '门课程，共' + this.filterResultObject.totalPeriod + '学分。其中公需科目'
            + this.filterResultObject.publicSubject.coursePeriod + '学分，专业科目' + this.filterResultObject.professionSubject.coursePeriod + '学分'
        } else if (this.filterResultObject.professionSubject.coursePeriod <= 0 && this.filterResultObject.publicSubject.coursePeriod > 0) {
          return '共' + this.filterResultObject.totalCount + '门课程，公需科目' + this.filterResultObject.publicSubject.coursePeriod + '学分'
        } else if (this.filterResultObject.professionSubject.coursePeriod > 0 && this.filterResultObject.publicSubject.coursePeriod <= 0) {
          return '共' + this.filterResultObject.totalCount + '门课程，公需科目' + this.filterResultObject.professionSubject.coursePeriod + '学分'
        } else {
          return ''
        }
      },
      /**
       * 选中背景色
       * @param int 选中位置
       */
      selectBackgroundColor (type, chooseIndex) {
//          debugger
        switch (type) {
          case 0:
            if (this.filterObject.subjectType === 'all') {
              return ['cur', 'pb0']
            }
            break
          case 1:
            if (this.filterObject.subjectType === 'public') {
              if (this.filterObject.courseType == this.filterResultObject.publicSubject.courseCategoryList[0].categoryName) {
                return ['cur', 'pb0']
              }
            }
            break
          case 2:
            if (this.filterObject.subjectType === 'profession') {
              var context = this
              var Model = this.filterResultObject.professionSubject.courseCategoryList[chooseIndex]


              if (context.filterObject.courseType === Model.categoryName) {

                return ['cur', 'pb0']
              }

//                this.filterResultObject.professionSubject.courseCategoryList.forEach((item) => {
//
//                  if (context.filterObject.courseType === item.categoryName){
//
//                    return  ['cur', 'pb0'];
//                  }else {
//                    return  ['pb0'];
//                  }
//                })
            }
            break

          default:
            return ['pb0']
        }
      },
      setSelectObject (subjectType, courseType) {
//          debugger

        this.filterObject.subjectType = subjectType
        this.filterObject.courseType = courseType
//        if(!subjectType && !courseType){
//          this.showCoursecClassifyUI = true;
//        }else {
        this.showCoursecClassifyUI = false
//        }

        this.filterDataShowUI(this.filterObject)
      },
      seeCourseStructure () {
        this.showCoursecClassifyUI = !this.showCoursecClassifyUI
      },

      filterSelectedShowUI () {
        if (this.filterObject.subjectType != 'all' && this.filterObject.subjectType.length) {
//          if (this.filterObject.courseType != undefined) {
            if (this.filterObject.subjectType === 'public') {
              return (this.filterObject.courseType ? this.filterObject.courseType + '/' : '') + '公需科目'
            } else {
              return (this.filterObject.courseType ? this.filterObject.courseType + '/' : '') + '专业科目'
            }
//          }
//          else {
//            if (this.filterObject.subjectType === 'public') {
//              return (this.filterObject.courseType ? this.filterObject.courseType + '/' : '') + '公需科目'
//            } else {
//              return (this.filterObject.courseType ? this.filterObject.courseType + '/': '') + '专业科目'
//            }
//          }
        }
        return ''
      }

    }
  }
</script>
