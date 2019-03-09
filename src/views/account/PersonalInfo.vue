<template>
  <div class="contain">
    <!--标题栏-->
    <!--<div class="hb-header-box">-->
    <!--<div class="header-left" @click="back()">-->
    <!--<a href="javascript:void(0);" class="hb-ico ico-return"></a>-->
    <!--</div>-->
    <!--<div class="header-tit">个人信息</div>-->
    <!--</div>-->

    <div class="hb-header-box">
      <div class="header-tit">个人信息</div>
      <!--<div class="header-right3" @click="back()">-->
        <!--<a href="#">返回</a>-->
      <!--</div>-->
    </div>
    <Scroller style="box-sizing: border-box;background-color: white;"
              :height="scrollerHeight" lock-x
               ref="scroller">
    <div>


    <div class="personal-tip">
      <div class="pic"><img src="../../../design/images/icon-warning.png"/></div>
      <div class="text">会计人员信息统一由会计继续教育管理系统统一管理，如需变更，请前往管理系统登记变更。</div>
    </div>
    <!--标题栏-->
    <div class="hb-box-bd hb-box-bd-4 pb0">
      <div class="weui-panel hb-panel">
        <div class="weui-cells">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">身份证号</span></div>
            <div class="weui-cell__bd">{{userInfo.identityCardNo}}</div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">真实姓名</span></div>
            <div class="weui-cell__bd tr">{{userInfo.userName}}</div>

          </div>

          <div class="weui-cell weui-cell_access sex">
            <div class="weui-cell__hd"><span class="tit-2">性别</span></div>
            <div class="weui-cell__bd tr">{{sex == 1?'男':'女'}}</div>

            <!--<popup-picker class="gray-color" confirm-text="确定" placeholder="请选择性别" value-text-align="left" :data="sexList" :columns="1" v-model="sex" show-name></popup-picker>-->

          </div>
          <div class="weui-cell weui-cell_access" @click="showChangephoneView">
            <div class="weui-cell__hd"><span class="tit-2">手机号</span></div>
            <div class="weui-cell__bd">
              <span style="font-size: .28rem">{{userInfo.phoneNumber}}</span>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">专业技术资格等级（培训）</span></div>
            <div class="weui-cell__bd tr">{{userInfo.trainProfessionalLevel ==
              null?'':userInfo.trainProfessionalLevel}}
            </div>
          </div>
          <!--<div class="weui-cell weui-cell_access">-->
          <!--<div class="weui-cell__hd"><span class="tit-2">获得资格时间</span></div>-->
          <!--<div class="weui-cell__bd to tr">{{userInfo.getQualificationTime == null?'':userInfo.getQualificationTime}}</div>-->
          <!--</div>-->
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">单位名称</span></div>
            <div class="weui-cell__bd tr">{{userInfo.unitName}}</div>


          </div>
        </div>
      </div>
    </div>
    <div class="personal-tip-2">
      <div class="text">
        <b><img src="../../../design/images/icon-warning.png"/>《会计专业技术人员继续教育规定》对会计人员继续教育培训时间说明如下：</b><br/>
        <p><em>※</em>具有会计技术专业技术资格的人员应当自取得会计专业技术资格的次年开始参加继续教育，并在规定时间内取得规定学分。</p>
        <p><em>※</em>不具有会计技术专业技术资格的人员应当自从事会计工作的次年开始参加继续教育，并在规定时间内取得规定学分。</p>
      </div>
    </div>
    <!--<div class="hb-tabbar">-->
    <!--<div class="hb-btn hb-btn-3" style="width:100%;position:absolute;left:0;bottom:0" @click="submit">确定修改</div>-->
    <!--</div>-->
    </div>
    </Scroller>
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;" v-if="success">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">
          <img class="d-icon-success" src="../../../design/images/icon-success.png"/>
          <p class="mt20">修改个人信息成功</p>
        </div>
        <!-- <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">返回个人中心</a>
        </div> -->
      </div>
    </div>
    <changePhoneComponent @changeClick="changePhone" ref="changePhoneView"></changePhoneComponent>
  </div>
</template>
<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

  .sex {
    font-size: .28rem !important;

    .vux-cell-box:not(:first-child):before {
      width: 0 !important;
    }

    .vux-popup-picker-placeholder {
      font-size: .28rem !important;
    }
  }

  .gray-color {
    .weui-cell {
      padding: 0 !important;
    }

    .vux-popup-picker-placeholder {
      color: #666 !important;
    }

    .vux-popup-picker-value {
      color: #333333 !important;
    }
  }
</style>
<script>

  import * as storeTypes from '../../store/types'
  import { PopupPicker,Scroller } from 'vux'
  import changePhoneComponent from './PersonalCenter_changePhone.vue'

  export default {
    components: { PopupPicker, changePhoneComponent,Scroller },
    mounted () {
      this.scrollerHeight = ((window.outerHeight || window.innerHeight)) + 'px'
      for (let key in this.$store.getters.userInfo) {
        this.userInfo[key] = this.$store.getters.userInfo[key]
      }
    },
    data () {
      return {
        scrollerHeight:'0px',
        showChangePhone: false,
        success: false,
        userInfo: this.$store.getters.userInfo,
        sexList: [{
          name: '男',
          value: '1'
        }, {
          name: '女',
          value: '2'
        }],
        sex: this.$store.getters.userInfo.sex ? (this.$store.getters.userInfo.sex === 1 || this.$store.getters.userInfo.sex === 2) ? [this.$store.getters.userInfo.sex + ''] : [] : []
      }
    },
    methods: {

      showChangephoneView () {
        this.$refs.changePhoneView.show(this.userInfo.phoneNumber)
      },
      changePhone (newPhoneNumber) {

        if (newPhoneNumber.length != 11) {
          this.toast('请填写正确的手机号码')
          return false
        }
        this.$refs.changePhoneView.hideComponent()
        this.userInfo.phoneNumber = newPhoneNumber
        this.submit()
      },
      checkAndToast () {
        let regu = /^[ ]+$/
//        if (regu.test(this.userInfo.userName) || this.userInfo.userName.length <= 0) {
//          this.toast('请填写姓名')
//          return false
//        }
//        if (!this.sex[0]) {
//          this.toast('请选择性别')
//          return false
//        }
//        if (regu.test(this.userInfo.unitName) || this.userInfo.unitName.length <= 0) {
//          this.toast('请填写单位名称')
//          return false
//        }
        return true
      },
      submit () {
        if (this.checkAndToast()) {
          let params = {}
          params.userInfo = Object.assign({}, this.userInfo, { sex: parseInt(this.sex[0]) })
          this.showLoading('修改中...')
          this.$store.dispatch(storeTypes.ACCOUNT_UPDATE_USERINFO, params).then(retObj => {
            this.hideLoading()
            if (retObj.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
              // this.toast('信息修改成功！')
              this.success = true
              setTimeout(() => {
                this.success = false
              }, 1000)
            } else {
              this.toast(retObj.head.message)
            }
          })
        }
      }
    }
  }
</script>
