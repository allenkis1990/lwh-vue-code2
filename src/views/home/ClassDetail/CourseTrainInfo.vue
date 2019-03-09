<template>
  <!-- 课程超市班级培训信息 -->
  <div class="course-catalog">
    <scroller
      :height="scrollerHeight"
      style="box-sizing: border-box;"
      lock-x
      scrollbar-y
      v-model="scroller" ref="scroller">
      <div>
        <div class="block-box situation-info-box" v-if="trainInfo.courseRequire">
          <div class="info-tit">考核要求</div>
          <div class="info-desc">
            <span v-if="trainInfo.courseRequire.rateOfProgress">学习进度 = {{trainInfo.courseRequire.rateOfProgress}}%</span>
            <span
              v-if="trainInfo.courseRequire.practicePaperScore">课后测验成绩 ≥ {{trainInfo.courseRequire.practicePaperScore}}分</span>
            <span
              v-if="trainInfo.courseRequire.popupQuestionScore">弹窗题成绩 ≥ {{trainInfo.courseRequire.popupQuestionScore}}分</span>
          </div>
        </div>
        <div class="block-box situation-info-box" v-if="trainInfo.courseRequire && trainInfo.courseRequire.trainingHours">
          <div class="info-tit">选课要求</div>
          <div class="info-desc">本年度继续教育学时须>={{trainInfo.courseRequire.trainingHours}}</div>
        </div>
        <div class="block-box situation-info-box" v-if="trainInfo.skuPropertyNameList">
          <div class="info-tit">课程培训信息</div>
          <div class="info-desc">科目：{{trainInfo.skuPropertyNameList[2].skuPropertyValueName}}</div>
          <div class="info-desc">年度：{{trainInfo.skuPropertyNameList[0].skuPropertyValueName ?
            trainInfo.skuPropertyNameList[0].skuPropertyValueName + '年' : '-'}}
          </div>
          <div class="info-desc">专业技术资格等级：{{trainInfo.skuPropertyNameList[1].skuPropertyValueName ?
            trainInfo.skuPropertyNameList[1].skuPropertyValueName : '-'}}
          </div>
          <div class="info-desc">学分：{{trainInfo.credits}}</div>
          <div class="info-desc" v-if="trainInfo.trainingStartTime">培训起止时间： {{trainInfo.trainingStartTime}} 至
            {{trainInfo.trainingEndTime || '-'}}
          </div>
          <div class="info-desc" v-if="trainInfo.signUpStartTime">报名起止时间： {{trainInfo.registrationTimeBegin}} 至
            {{trainInfo.registrationTimeEnd || '-'}}
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
  import { Scroller } from 'vux'
  import utils from '@/common/util/Utils'
  export default {
    components: {
      Scroller
    },
    mounted () {
      this.setScrollerHeight()
    },
    data () {
      return {
        scrollerHeight: '',
        scroller: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        }
      }
    },
    methods: {
//      设置scroller高度
      setScrollerHeight () {
        let h1 = Number.parseInt(utils.selectClass('.view-pos').height)
        let h2 = !this.fromHelpMeSelectCourse ? Number.parseInt(utils.selectClass('.exchange-pool').height) : 0
        let h3 = !this.fromHelpMeSelectCourse ? Number.parseInt(utils.selectClass('.hb-tabbar').height) : 0
        this.scrollerHeight = (window.outerHeight - (h1 + h2 + h3) || window.innerHeight - (h1 + h2 + h3)) + 'px'
        console.log(this.scrollerHeight, '高度')
      }
    },
    props: {
      trainInfo: {
        type: Object,
        default () {
          return {
            courseRequire: {
              trainingHours: null,
              rateOfProgress: null,
              practicePaperScore: null,
              popupQuestionScore: null
            },
            skuPropertyNameList: []
          }
        }
      },
      fromHelpMeSelectCourse: {
        type: Boolean
      }
    }
  }
</script>
