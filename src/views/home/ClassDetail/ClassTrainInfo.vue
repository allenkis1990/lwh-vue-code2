<template>
  <!-- 平台班级培训信息 -->
  <div class="course-catalog">
    <div class="block-box situation-info-box" v-if="trainInfo.assessInformation">
      <div class="info-tit">考核要求</div>
      <div class="info-desc">
        <span v-if="trainInfo.assessInformation.assessTrainingComplete">学习进度 = {{trainInfo.assessInformation.assessTrainingComplete}}%</span>
        <span
          v-if="trainInfo.assessInformation.assessPassScore">考试成绩 ≥ {{trainInfo.assessInformation.assessPassScore}}</span>
      </div>
    </div>
    <div class="block-box situation-info-box" v-if="trainInfo.assessInformation">
      <div class="info-tit">选课要求</div>
      <div class="info-desc">本年度继续教育学时须≥{{trainInfo.assessInformation.trainingHours}}</div>
    </div>
    <div class="block-box situation-info-box" v-if="trainInfo.skuPropertyNameList">
      <div class="info-tit">班级培训信息</div>
      <div class="info-desc">科目：{{getSkuValueByName(trainInfo.skuPropertyNameList, '科目')}}</div>
      <div class="info-desc">年度：{{getSkuValueByName(trainInfo.skuPropertyNameList, '年度')}}年</div>
      <div class="info-desc">学时：{{trainInfo.trainingPeriod}}</div>
      <div class="info-desc" v-if="trainInfo.trainingStartTime">培训起止时间： {{trainInfo.trainingStartTime}} 至
        {{trainInfo.trainingEndTime || '-'}}
      </div>
      <div class="info-desc" v-if="trainInfo.signUpStartTime">报名起止时间： {{trainInfo.signUpStartTime}} 至
        {{trainInfo.signUpEndTime || '-'}}
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
            assessInformation: {},
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
