<template>
  <div class="course-catalog">
    <div class="block-box situation-info-box">
      <div class="info-tit">班级简介</div>
      <div class="info-desc" v-html="trainInfo.trainClassCommodityDes">
      </div>
    </div>
    <div class="block-box situation-info-box"
         v-if="trainInfo.assessConfig && (trainInfo.assessConfig.haveExam || trainInfo.assessConfig.questionnaireInfoAddToAssess || trainInfo.assessConfig.signInAddToAssess || trainInfo.assessConfig.signOutAddToAssess)">
      <div class="info-tit">考核要求</div>
      <div class="info-desc">
        <span v-if="trainInfo.assessConfig.signInAddToAssess">要求签到次数：<span class="cb">≥{{trainInfo.assessConfig.signInAssessCount}}</span>次</span>
        <span v-if="trainInfo.assessConfig.signOutAddToAssess">要求签退次数：<span class="cb">≥{{trainInfo.assessConfig.signOutAssessCount}}</span>次</span>
        <span v-if="trainInfo.assessConfig.haveExam">考试考核成绩：<span
          class="cb">≥{{trainInfo.assessConfig.assessPassScore}}</span>分</span>
        <span v-if="trainInfo.assessConfig.questionnaireInfoAddToAssess">要求完成调查问卷份数：<span class="cb">{{trainInfo.assessConfig.needCompleteQuestionnaireCount}}</span>份</span>
      </div>
    </div>
    <div class="block-box situation-info-box" v-if="trainInfo.skuPropertyNameList">
      <div class="info-tit">班级培训信息</div>
      <div class="info-desc">科目：{{getSkuValueByName(trainInfo.skuPropertyNameList, '科目')}}</div>
      <div class="info-desc">年度：{{getSkuValueByName(trainInfo.skuPropertyNameList, '年度')}}年</div>
      <div class="info-desc">学时：{{trainInfo.credit}}</div>
      <div class="info-desc" v-if="trainInfo.trainingBeginTime">培训起止时间： {{trainInfo.trainingStartTime}} 至
        {{trainInfo.trainingEndTime || '-'}}
      </div>
      <div class="info-desc" v-if="trainInfo.registrationTimeBegin">报名起止时间： {{trainInfo.registrationTimeBegin}} 至
        {{trainInfo.registrationTimeEnd || '-'}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      trainInfo: {
        type: Object,
        default () {
          return {
            assessConfig: {},
            skuPropertyNameList: []
          }
        }
      }
    },
    methods: {
      getSkuValueByName (skuList, name) {
        for (let i = 0; i < skuList.length; i++) {
          if (skuList[i].skuPropertyName === name) {
            return skuList[i].skuPropertyValueName
          }
        }
      }
    }
  }
</script>
