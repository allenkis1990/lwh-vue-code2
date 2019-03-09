<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">各继续教育年度培训情况</div>
      <div class="header-right3">
        <a @click="tipDialogShow()"><img style="margin:0;" src="../../../design/images/icon-warning.png" /></a>
      </div>
    </div>
    <!--标题栏-->
    <scroller style="box-sizing: border-box;"
              :height="scrollerHeight" lock-x>
      <div class="course-select-training pb0">
        <div class="preview clear">
          <div class="tit">
            <popup-picker :data="years"
                          class="yearListPickPlaceHolder"
                          placeholder="请选择继续教育年度"
                          popup-title="请选择继续教育年度"
                          :display-format="format"
                          value-text-align="left"
                          v-model="selectYear"

                          @on-change="yearChange()">
            </popup-picker>
            <!--<div class="text">{{selectYear}}年度继续教育学分分布</div>-->
            <!--<div class="pic"><img src="../../../design/images/icon-go-bg.png" /></div>-->
          </div>
          <div class="tip" v-for="(item,index) in situationModel.approvalStatus" v-if="item.approvalCredit>0">
            <img src="../../../design/images/icon-warning.png">
            <div class="text">视同申报的{{item.type == 'publicCourse'?'公需':'专业'}}科目{{item.approvalCredit}}学分处于待审批中</div>
          </div>
          <!--<div class="tip" v-if="situationModel.approvalStatus.professionCourseTrainingStatus.approvalCredit>0">-->
          <!--<img src="../../../design/images/icon-warning.png">-->
          <!--<div class="text">视同申报的专业科目{{situationModel.approvalStatus.professionCourseTrainingStatus.approvalCredit}}学分处于待审批中</div>-->
          <!--</div>-->
          <div class="chart clear pb30">
            <div class="pic" style="background-color: white;">
              <!--<img src="../../../design/images/pic-tongji.png" /> 年度学分-->
              <circleStatistics className="circle0"
                                :label-text="cirleText(1)"
                                label-color="#333"
                                :label-fontsize="circleLabelFontSize"
                                :data-source="echarsData[0]?echarsData[0]:[]"></circleStatistics>
            </div>
            <div class="text">
              <div class="item">
                <div class="color color-1"></div>
                <div class="name">已获得</div>
                <div class="num">
                  {{situationModel.publicCourseTrainingStatus.publicCourseTrainedCredit+situationModel.professionCourseTrainingStatus.professionCourseTrainedCredit}}学分
                </div>
              </div>
              <div class="item">
                <div class="color color-2"></div>
                <div class="name">正在学习</div>
                <div class="num">
                  {{situationModel.publicCourseTrainingStatus.publicCourseTrainingCredit+situationModel.professionCourseTrainingStatus.professionCourseTrainingCredit}}学分
                </div>
              </div>

              <div class="item">
                <div class="color color-3"></div>
                <div class="name">还未学习</div>
                <div class="num">
                  {{situationModel.publicCourseTrainingStatus.publicCourseNeedTrainingCredit+situationModel.professionCourseTrainingStatus.professionCourseNeedTrainingCredit}}学分
                </div>
              </div>
              <!--有一项不为0 则显示,都为0时则学院全部学完了 不显示-->

              <a v-if="btnType(situationModel.publicCourseTrainingStatus.publicCourseTrainingCredit+situationModel.professionCourseTrainingStatus.professionCourseTrainingCredit,situationModel.publicCourseTrainingStatus.publicCourseNeedTrainingCredit+situationModel.professionCourseTrainingStatus.professionCourseNeedTrainingCredit,1) == 2" @click="gotoLearn" class="btn">前往学习</a>
              <a @click="gotoChooseCourse(0)"
                 v-if="btnType(situationModel.publicCourseTrainingStatus.publicCourseTrainingCredit+situationModel.professionCourseTrainingStatus.professionCourseTrainingCredit,situationModel.publicCourseTrainingStatus.publicCourseNeedTrainingCredit+situationModel.professionCourseTrainingStatus.professionCourseNeedTrainingCredit,1) == 4"
                  class="btn">前往选课</a>
              <a v-if="btnType(situationModel.publicCourseTrainingStatus.publicCourseTrainingCredit+situationModel.professionCourseTrainingStatus.professionCourseTrainingCredit,situationModel.publicCourseTrainingStatus.publicCourseNeedTrainingCredit+situationModel.professionCourseTrainingStatus.professionCourseNeedTrainingCredit,1) == 3" @click="gotoBuyCredit" class="btn">购买学分</a>
            </div>
          </div>
          <div class="order-tip jcc" v-show="situationModel.freezeCredit != undefined && situationModel.freezeCredit>0">
            <img src="../../../design/images/icon-warning.png" />
            <div class="text">已购买学分中，<em>{{situationModel.freezeCredit}}</em>学分处于退款中，无法选课！</div>
          </div>
          <div class="line"></div>
          <div class="chart clear pt30 pb30">
            <div class="pic" style="background-color: white;">
              <!--<img src="../../../design/images/pic-tongji.png" />-->
              <circleStatistics className="circle1"
                                :label-text="cirleText(2)"
                                label-color="#333"
                                :label-fontsize="circleLabelFontSize"
                                :data-source="echarsData[1]?echarsData[1]:[]"></circleStatistics>
            </div>
            <div class="text">
              <div class="item">
                <div class="color color-1"></div>
                <div class="name">已获得</div>
                <div class="num">{{situationModel.publicCourseTrainingStatus.publicCourseTrainedCredit}}学分</div>
              </div>
              <div class="item">
                <div class="color color-2"></div>
                <div class="name">正在学习</div>
                <div class="num">{{situationModel.publicCourseTrainingStatus.publicCourseTrainingCredit}}学分</div>
              </div>
              <!--<div class="item">-->
                <!--<div class="color color-3"></div>-->
                <!--<div class="name">未学习</div>-->
                <!--<div class="num">15学分</div>-->
              <!--</div>-->
              <div class="item">
                <div class="color color-3"></div>
                <div class="name">还差</div>
                <div class="num">{{situationModel.publicCourseTrainingStatus.publicCourseNeedTrainingCredit}}学分</div>
              </div>
              <a v-if="btnType(situationModel.publicCourseTrainingStatus.publicCourseTrainingCredit,situationModel.publicCourseTrainingStatus.publicCourseNeedTrainingCredit,2) == 2" @click="gotoLearn" class="btn">前往学习</a>
              <a @click="gotoChooseCourse(0)"
                 v-if="btnType(situationModel.publicCourseTrainingStatus.publicCourseTrainingCredit,situationModel.publicCourseTrainingStatus.publicCourseNeedTrainingCredit,2) == 4"
                 class="btn">前往选课</a>
              <a v-if="btnType(situationModel.publicCourseTrainingStatus.publicCourseTrainingCredit,situationModel.publicCourseTrainingStatus.publicCourseNeedTrainingCredit,2) == 3" @click="gotoBuyCredit" class="btn">购买学分</a>

            </div>
          </div>
          <div class="line"></div>
          <div class="chart clear pt30 pb30">
            <div class="pic" style="background-color: white;">
              <!--<img src="../../../design/images/pic-tongji.png" />-->
              <circleStatistics className="circle3"
                                :label-text="cirleText(3)"
                                label-color="#333"
                                :label-fontsize="circleLabelFontSize"
                                :data-source="echarsData[2]?echarsData[2]:[]"></circleStatistics>
            </div>
            <div class="text">
              <div class="item">
                <div class="color color-1"></div>
                <div class="name">已获得</div>
                <div class="num">{{situationModel.professionCourseTrainingStatus.professionCourseTrainedCredit}}学分</div>
              </div>
              <div class="item">
                <div class="color color-2"></div>
                <div class="name">正在学习</div>
                <div class="num">{{situationModel.professionCourseTrainingStatus.professionCourseTrainingCredit}}学分
                </div>
              </div>
              <!--<div class="item">-->
                <!--<div class="color color-3"></div>-->
                <!--<div class="name">未学习</div>-->
                <!--<div class="num">15学分</div>-->
              <!--</div>-->
              <div class="item">
                <div class="color color-3"></div>
                <div class="name">还差</div>
                <div class="num">
                  {{situationModel.professionCourseTrainingStatus.professionCourseNeedTrainingCredit}}学分
                </div>
              </div>
              <a v-if="btnType(situationModel.professionCourseTrainingStatus.professionCourseTrainingCredit,situationModel.professionCourseTrainingStatus.professionCourseNeedTrainingCredit,3) == 2" @click="gotoLearn" class="btn">前往学习</a>
              <a @click="gotoChooseCourse(0)"
                 v-if="btnType(situationModel.professionCourseTrainingStatus.professionCourseTrainingCredit,situationModel.professionCourseTrainingStatus.professionCourseNeedTrainingCredit,3) == 4"
                 class="btn">前往选课</a>
              <a v-if="btnType(situationModel.professionCourseTrainingStatus.professionCourseTrainingCredit,situationModel.professionCourseTrainingStatus.professionCourseNeedTrainingCredit,3) == 3" @click="gotoBuyCredit" class="btn">购买学分</a>

            </div>
          </div>
          <div class="tip2">数据来源：实时同步继续教育管理系统</div>
        </div>
      </div>
    </scroller>
    <tipDialog ref="tipDialogRef"></tipDialog>
    <QRPopView ref="QRPopViewRef"></QRPopView>
    <!--<popup-picker title="请选择" :data="years" v-model="selectYear"  @on-change="yearChange" ></popup-picker>-->
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

  .yearListPickPlaceHolder {
    font-size: .28rem;

    .weui-cell {
      padding: 0 !important;
    }

    .vux-popup-picker-placeholder {
      color: #333 !important;
      font-weight: bold;
    }

    .vux-popup-picker-value {
      font-size: .28rem;
      color: #333 !important;
    }
  }

  .pic2 {
    width: 2.4rem;
    height: 2.4rem;
    background: #ddd;
    margin-right: .2rem;
  }

  .pic1 {
    width: 2.4rem;
    height: 2.4rem;
    background: #ddd;
    margin-right: .2rem;
  }
</style>
<script>

  import * as storeType from '../../store/types'
  import circleStatistics from '@/components/circleStatistics'
  import { PopupPicker, Scroller } from 'vux'
  import tipDialog from './PersonalCenter_Situation_Dialog.vue'
  import QRPopView from '@/components/StudyQrcodeComponent'
  export default {
    components: {
      circleStatistics,
      PopupPicker,
      Scroller,
      tipDialog,
      QRPopView
    },
    data () {
      return {
        circleLabelFontSize: '',
        echarsData: [],
        years: [],
        yearlist: [],
        situationModel: {
          havaCredits: 0, //拥有未兑换的学分
          havaapprovalStatus: true, //是否拥有视同申报
          approvalStatus: [
            {
              type: 'publicCourse',
              approvalCredit: 0
            },
            {
              type: 'professionCourse',
              approvalCredit: 0
            }
          ],
          publicCourseTrainingStatus: {    //| 公需课培训状态 |
            publicCourseTrainedCredit: 0, //| 公需课已培训学分 |
            publicCourseTrainingCredit: 0, //| 公需课在 培训学分 |
            publicCourseNeedTrainingCredit: 0 //| 公需课还差学分 |
          },
          professionCourseTrainingStatus: {    //| 专业课总培训状态 |
            professionCourseTrainedCredit: 0, //| 专业课已培训学分 |
            professionCourseTrainingCredit: 0, //| 专业课在培训学分 |
            professionCourseNeedTrainingCredit: 0 //| 专业课还差培训学分 |
          }
        },
        selectYear: ['2018'],
        scrollerHeight: ''
      }
    },
    mounted () {
      this.scrollerHeight = (window.outerHeight || window.innerHeight) + 'px'
      this.getCircleLabelFontSize()
      this.requestYear()
    },
    methods: {
      gotoLearn(){
         this.$refs.QRPopViewRef.show();
      },
      //控制按钮显示影藏 type 1年度 2公需 3 专业  返回值1 为不显示 2 显示去学习 3 购买学分 4 前往选课
      btnType(TrainingCredit,NeedTrainingCredit,type){
          if(TrainingCredit == 0  && NeedTrainingCredit == 0) return 1;
          if(NeedTrainingCredit == 0 && TrainingCredit > 0)return 2;
          if(type == 1){
            if (this.situationModel.havaCredits>=NeedTrainingCredit) return 4;
            return 3;
          }else {
             if(this.situationModel.havaCredits > 0)return 4;
             return 3;
          }

      },
      //提示弹窗显示出来
      tipDialogShow(){
        this.$refs.tipDialogRef.show();
      },
        cirleText(type){
        var circleText = '';
        if(type == 1){
          circleText = '年度\n学分'
        }else if(type == 2){
          circleText = '公需\n科目'
        }else {
          circleText = '专业\n科目'
        }
        return circleText
      },
      getYearData () {
        var context = this
        var arr = []
        var subArr = []
        this.yearlist.forEach((item) => {
          subArr.push({ name: item, value: item })
        })
        arr.push(subArr)
        context.years = arr
        var chooseArr = []
        var firstYear = context.years[0][0]
        chooseArr.push(firstYear.value)
        context.selectYear = chooseArr
      },
      //获取圆环数据
      getEchartData () {
        var publicCourseTrainingStatus = this.situationModel.publicCourseTrainingStatus
//           .publicCourseTrainedCredit+this.situationModel.professionCourseTrainingStatus.professionCourseTrainedCredit
        var professionCourseTrainingStatus = this.situationModel.professionCourseTrainingStatus
//公需课的数组 #ccc
        let publicCourseArr = []
        publicCourseArr.push({
          itemName: '已获得学分', value: publicCourseTrainingStatus.publicCourseTrainedCredit, itemStyle: {
            color: '#007dba'
          }
        })
        publicCourseArr.push({
          itemName: '正在学习学分', value: publicCourseTrainingStatus.publicCourseTrainingCredit, itemStyle: {
            color: '#fa5655'
          }
        })

        publicCourseArr.push({
          itemName: '还未学习学分', value: publicCourseTrainingStatus.publicCourseNeedTrainingCredit, itemStyle: {
            color: '#ffc320'
          }
        })
//        publicCourseArr.push({
//          itemName: '还差', value: publicCourseTrainingStatus.publicCourseNeedTrainingCredit, itemStyle: {
//            color: '#ccc'
//          }
//        })
        //专业课的数组

        let professionCourseArr = []
        professionCourseArr.push({
          itemName: '已获得学分', value: professionCourseTrainingStatus.professionCourseTrainedCredit, itemStyle: {
            color: '#007dba'
          }
        })
        professionCourseArr.push({
          itemName: '正在学习学分', value: professionCourseTrainingStatus.professionCourseTrainingCredit, itemStyle: {
            color: '#fa5655'
          }
        })
        professionCourseArr.push({
          itemName: '还未学习学分', value: professionCourseTrainingStatus.professionCourseNeedTrainingCredit, itemStyle: {
            color: '#ffc320'
          }
        })
//        professionCourseArr.push({
//          itemName: '还差', value: professionCourseTrainingStatus.professionCourseNeedTrainingCredit, itemStyle: {
//            color: '#ccc'
//          }
//        })
        //年度的数组
        let totalArr = []
        totalArr.push({
          itemName: '已获得学分',
          value: professionCourseTrainingStatus.professionCourseTrainedCredit + publicCourseTrainingStatus.publicCourseTrainedCredit,
          itemStyle: {
            color: '#007dba'
          }
        })
        totalArr.push({
          itemName: '正在学习学分',
          value: professionCourseTrainingStatus.professionCourseTrainingCredit + publicCourseTrainingStatus.publicCourseTrainingCredit,
          itemStyle: {
            color: '#fa5655'
          }
        })
        totalArr.push({
          itemName: '还未学习学分',
          value: professionCourseTrainingStatus.professionCourseNeedTrainingCredit + publicCourseTrainingStatus.publicCourseNeedTrainingCredit,
          itemStyle: {
            color: '#ffc320'
          }
        })
//        totalArr.push({
//          itemName: '还差',
//          value: professionCourseTrainingStatus.professionCourseNeedTrainingCredit + publicCourseTrainingStatus.publicCourseNeedTrainingCredit,
//          itemStyle: {
//            color: '#ccc'
//          }
//        })
        var temArr = []
        temArr.push(totalArr)
        temArr.push(publicCourseArr)
        temArr.push(professionCourseArr)
        this.echarsData = temArr
      },

      //      获取圆环统计中间的文字大小
//      由于只能接收px为单位所以要用html标签的fontSize*0.28rem得出px这样设备大小变化文字大小才能跟着变
      getCircleLabelFontSize () {
        let htmlFontSize = Number.parseInt(window.getComputedStyle(document.documentElement, null).fontSize)
        this.circleLabelFontSize = (htmlFontSize * 0.28) + ''
        console.log(this.circleLabelFontSize)
      },
      format: function (value, name) {
//        debugger
        return `${name}年度继续教育学分分布`
      },
      yearChange (value, name) {
        var selectYear = this.selectYear
        var yearId = selectYear[0]
        this.requestEduationSituation(yearId)
//         debugger
//        debugger
//        this.selectYear = value;
      },
      gotoBuyCredit () {

        //前往购买学分
        this.$router.push({
          path: '/createOrder',
          query: {
            currentYear: parseInt(this.selectYear[0])
          }
        })
      },
      //前往选课界面
      gotoChooseCourse (type) {
        this.$router.push('/demo/courseSelectionTrain')
//        type 0 两者都有 1 公需课 2 专业课
      },
      //判断显示去选课 还是去购买学分
      judgeBuyCredit (needCredit) {
        return this.situationModel.havaCredits >= needCredit
      },
      requestYear () {
        var context = this
        this.$vux.loading.show({
          text: '加载中'
        })
        var param = {}
        this.$store.dispatch(storeType.ACCOUNT_GET_EDUCATION_YEAR, param).then((data) => {
          if (data.head.code == storeType.NETWORK_RESULT_SUCCESS) {
            context.yearlist = data.data
            context.getYearData()
//           var firstYear = context.yearlist[0];
//           context.selectYear = firstYear.trainingYearName;
            context.requestEduationSituation(context.selectYear[0])
          } else {
            context.toast('请求失败')
            context.$vux.loading.hide()
          }
        })
      },
      requestEduationSituation (selectYear) {
        var param = {
          selectTrainingYearName: selectYear
        }
//    /mobile/user/miniProgram/yearLearnSituation
        var context = this
        this.$store.dispatch(storeType.ACCOUNT_GET_EDUCATION_CREDIT_SITUATION, param).then((data) => {
          context.$vux.loading.hide()
          if (data.head.code == storeType.NETWORK_RESULT_SUCCESS) {
            context.situationModel = data.data
            context.getEchartData()
          } else {
            context.toast('请求失败')
          }
        })
      }
    }
  }
</script>
