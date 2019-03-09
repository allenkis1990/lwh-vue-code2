<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left" @click="back()">
        <a href="javascript:void(0);" class="hb-ico ico-return"></a>
      </div>
      <div class="header-tit">换绑手机</div>
    </div>
    <!--标题栏-->
    <div class="hb-form-cells pt100">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label weui-label-2">手机号</label></div>
          <input class="weui-input" type="text" placeholder="请输入新手机号" v-model="newTelephoneNum">
        </div>
        <div class="weui-cell weui-cell_vcode">
          <div class="weui-cell__hd"><label class="weui-label weui-label-2">验证码</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" placeholder="请输入验证码" v-model="imageValidateCode">
          </div>
          <div class="weui-cell__ft">
            <img class="weui-vcode-img" :src="getValidateImageUrl()" @click="sendImageValidateCodeAction">
          </div>
        </div>
        <div class="weui-cell weui-cell_vcode">
          <div class="weui-cell__hd">
            <label class="weui-label weui-label-2">短信验证</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="tel" placeholder="请输入短信验证码" v-model="smsValidateCode">
          </div>
          <div class="weui-cell__ft">
            <div class="hb-btn-s" @click="sendSmsValidateCodeAction"
                 v-if="!isCounting">{{sendSmsButtonText}}
            </div>
            <a href="javascript:;" class="hb-btn-s-unable" style="width: 100px;" v-if="isCounting">{{time}}S后重新获取
            </a>
          </div>
        </div>
      </div>
      <div class="btn-primary mt80" @click="changeTelephoneNumAction">确定换绑</div>
    </div>
  </div>
</template>
<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

  .hb-btn-s-unable {
    width: 90px;
    height: 30px;
    line-height: 2.5;
    text-align: center;
    border: 1px solid #ddd;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
    display: inline-block;
    color: #666;
    font-size: 13px;
  }
</style>
<script>

  import * as storeTypes from '../../store/types'
  import AppConstant from '../../global/constants/AppConstant'
  import Utils from '../../common/util/Utils'

  export default {
    components: {},
    data () {
      return {
        newTelephoneNum: '',
        imageValidateCode: '',
        smsValidateCode: '',
        isCanSendSmsValidateCode: false,
        sendSmsButtonText: '获取验证码',
        validateImageUrl: '../../../design/images/code.jpg',
        time: 60,
        isCounting: false,
        userInfo: this.$store.getters.userInfo
      }
    },
    mounted () {
      this.sendImageValidateCodeAction()
    },
    methods: {
      hasFilledInformation () {
        if (this.imageValidateCode.length && this.smsValidateCode.length) {
          return true
        } else {
          return false
        }
      },
      checkFormate () {
        if (!this.newTelephoneNum || !this.newTelephoneNum.length) {
          this.toast('请填写手机号')
          return false
        }
        if (this.newTelephoneNum === this.userInfo.phoneNumber) {
          this.toast('不能填写原手机号')
          return false
        }
        if (!this.imageValidateCode || !this.imageValidateCode.length) {
          this.toast('请填写图形验证码')
        }
        if (!this.smsValidateCode || !this.smsValidateCode.length) {
          this.toast('请获取短信验证码')
          return false
        }
        return true
      },
      getSendSmsButtonClass () {
        if (this.isCanSendSmsValidateCode) {
          return 'hb-btn-s'
        } else {
          return 'hb-btn-s-unable'
        }
      },
      getSendSmsButtonText () {
        if (this.isCanSendSmsValidateCode) {
        } else {
        }
      },
      getValidateImageUrl () {
        if (this.validateImageUrl.indexOf('code.jpg') > 0) {
          return require('../../../design/images/code.jpg')
        } else {
          return this.validateImageUrl
        }
      },
      /*
       * 开启计时器
       */
      startCountDownTime () {
        var timer = setInterval(() => {
          if (this.time > 0) {
            this.time--
          } else {
            this.time = 60
            this.isCounting = false
            clearInterval(timer)
          }
        }, 1000)
      },
      changeTelephoneNumAction () {
        let param = {
          newTelNumber: this.newTelephoneNum,
          type: 8,
          smsValidateCode: this.smsValidateCode
        }
        if (this.checkFormate()) {
          let self = this
          this.$store.dispatch(storeTypes.ACCOUNT_CHANGE_TELEPHONENUM, param).then(retObj => {
            if (retObj.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
              this.toast('成功绑定新手机号')
              this.userInfo.phoneNumber = this.newTelephoneNum
              this.$store.commit(storeTypes.ACCOUNT_SET_USERINFO, this.userInfo)
              setTimeout(function () {
                self.back()
              }, 1000)
            } else {
              this.toast(retObj.head.message)
            }
          })
        }
      },
      sendSmsValidateCodeAction () {
        if (!this.newTelephoneNum || !this.newTelephoneNum.length) {
          this.toast('请填写手机号')
          return
        }
        if (this.newTelephoneNum === this.userInfo.phoneNumber) {
          this.toast('不能填写原手机号')
          return
        }
        if (!this.imageValidateCode || !this.imageValidateCode.length) {
          this.toast('请填写图形验证码')
          return
        }
        let requestData = {
          type: 8,
          telNumber: this.newTelephoneNum,
          imageValidateCode: this.imageValidateCode
        }
        this.$store.dispatch(storeTypes.ACCOUNT_GET_SMSVALIDATECODE, requestData).then(retObj => {
          if (retObj.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.toast('验证码已发送成功，请查看手机')
            this.isCounting = true
            this.startCountDownTime()
          } else {
            if (retObj.head.code === 400) {
              this.sendImageValidateCodeAction()
            }
            this.toast(retObj.head.message)
          }
        })
      },
      sendImageValidateCodeAction () {
        let params = { type: 8 }
        this.validateImageUrl = AppConstant.sysContext.apiPlatformHost + 'mobile/home/mobileRegister/sendImageValidateCode' + '?&requestString=' + Utils.requestString(params)
      },
      getNextButtonStyle () {
        if (this.hasFilledInformation()) {
          return { color: '#fff' }
        } else {
          return { color: '#666' }
        }
      }
    },
    watch: {
      imageValidateCode (value) {
        if (value.length === 4) {
          this.isCanSendSmsValidateCode = true
        } else {
          this.isCanSendSmsValidateCode = false
        }
      }
    }
  }
</script>
