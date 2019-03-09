<template>
  <div class="contain">
    <div class="hb-form-cells">

      <div class="tit-box">
        <div class="h1">会计专业技术人员继续教育培训</div>
        <div class="h2">登录</div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label">帐号</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入证件号" class="weui-input"
                                            v-model="info.account"/></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label">密码</span></div>
          <div class="weui-cell__bd"><input type="password" placeholder="请输入密码" class="weui-input"
                                            v-model="info.password"/></div>
        </div>
      </div>
      <div class="btn-primary mt80" @click="submit">立即登录</div>
      <div class="form-other mt60">
        <div class="weui-check__label cb" @click="() => {this.push('/regiter')}">注册新用户</div>
        <div class="tr a-forget" @click="() => {this.push('/forgotPassword')}">忘记密码?</div>
      </div>
      <div class="other-login" v-if="isWx"><span class="line"></span><span class="txt">微信授权登录</span><span
        class="line"></span></div>
      <div class="login-enter tc" v-if="isWx"><img class="img" src="../../../design/images/wx-icon.png" alt=" "
                                                   @click="checkIsBindWx"/></div>
    </div>
    <img class="login-box-img" style="width:100%" src="../../../design/images/login-pic.jpg" alt=""/>
  </div>
</template>
<style>
</style>
<script>
  import * as storeTypes from '../../store/types'
  import AppConstant from '../../global/constants/AppConstant'
  import LoginUtil from '../../common/core/Login'
  import Global from '@/global/global'

  export default {
    data () {
      return {
        info: {
          account: '',
          password: ''
        },
        isWx: Global.isWeiXin(),
        isBindWxLoading: false
      }
    },
    methods: {
      auth () {
        this.showLoading()
        this.$store.dispatch(storeTypes.ACCOUNT_WX_APPID_REQUEST, {}).then(data => {
          this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            let REDIRECT_URI = encodeURI(AppConstant.sysContext.wxRedirectURI)  //  + '/#' + redirectAddress
            let APP_ID = data.data.WXAppId
            this.setCookie(AppConstant.cookie.appId, APP_ID)
            let path = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APP_ID + '&redirect_uri=' + REDIRECT_URI +
              '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
            this.setCookie('authPath', path)
            window.location.href = path
          }
        }).catch(e => {
          console.log('e>>>>>' + e)
        })
//        window.location.href = this.getCookie('authPath')
      },
      checkIsBindWx () {
        if (this.isBindWxLoading) {
          return false
        }
        let p = {
          unionId: this.getCookie(AppConstant.cookie.unionId),
          openId: this.getCookie(AppConstant.cookie.openId)
        }
        this.isBindWxLoading = true
        this.$store.dispatch(storeTypes.ACCOUNT_WX_HASBIND_REQUEST, p).then(data => {
          this.isBindWxLoading = false
          // 判断微信是否绑定帐号，有就授权登陆，没有就弹窗提示
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            if (data.data.haveBind) {
              this.auth()
            } else {
              this.toast('当前微信还未绑定本平台帐号，请输入帐号密码并点击立即登录进行绑定！')
            }
          }
        }).catch(e => {
          this.isBindWxLoading = false
          console.log(e)
        })
      },
      checkInfoAndToast () {
        if (!this.info.account) {
          this.toast('帐号不能为空')
          return false
        }
//        if (this.info.account.length && this.info.account.length !== 18) {
//          this.toast('请输入18位身份证号')
//          return false
//        }
        if (!this.info.password) {
          this.toast('密码不能为空')
          return false
        }
        if (this.info.password.length && (this.info.password.length > 18 || this.info.password.length < 6)) {
          this.toast('请输入6-18位密码')
          return false
        }
        return true
      },
      submit () {
        if (this.checkInfoAndToast()) {
          let params = {
            account: this.info.account
          }
          this.$vux.loading.show({
            text: '加载中'
          })
          if (Global.isWeiXin()) {
            LoginUtil.checkAccount(params, storeTypes, this).then((checkSuccess) => {
              this.$vux.loading.hide()
              if (checkSuccess) {
                this.accountHasBindWx()
              }
            })
          } else {
            LoginUtil.checkAccount(params, storeTypes, this).then((checkSuccess) => {
              this.$vux.loading.hide()
              if (checkSuccess) {
                this.html5Login()
              }
            })
          }
        }
      },
//    用帐号密码来和当前微信号绑定
      accountHasBindWx () {
        let params = {
          account: this.info.account,
          password: this.info.password,
          openId: this.getCookie(AppConstant.cookie.openId),
          unionId: this.getCookie(AppConstant.cookie.unionId),
          registerChannel: '3'
        }
        this.$store
          .dispatch(storeTypes.ACCOUNT_HAS_BIND_WX, params)
          .then((data) => {
            this.hideLoading()
            switch (data.head.code) {
              case storeTypes.NETWORK_RESULT_SUCCESS:
                this.login()
                break
              case '601':
                this.toast('帐号错误')
                break
              case '602':
                this.toast('密码错误')
                break
              case '603':
                this.toast('该微信号被其他帐号绑定')
                break
              case '604':
                this.toast(
                  '该帐号已关联了其他微信帐号，无法登录！请使用与该微信号绑定的帐号登录！'
                )
                break
              default:
                this.toast(data.head.message)
            }
          })
          .catch(e => {
            this.hideLoading()
            console.log(e)
          })
      },
      login () {
        this.showLoading('加载中......')
        let context = this
        LoginUtil.login(
          this.getCookie(AppConstant.cookie.openId),
          this.getCookie(AppConstant.cookie.unionId),
          this.getCookie(AppConstant.cookie.accessToken),
          this.getCookie(AppConstant.cookie.nickname),
          this,
          console,
          storeTypes
        ).then(data => {
          this.hideLoading()
          if (data !== undefined && data !== null && data.state === true) {
//          context.$store.commit(storeTypes.GLOBAR_LOGIN_SET, true);
//          AppConstant.sysContext.isLogin = true
//          isCompletionInfo
//          let { domain } = this.$store.getters.userInfo
//          if (domain) {
//            this.setHeaderDomain(domain)
//          }
//          if (isCompletionInfo === false) {
//            this.replace('/perfectInfomation')
//            return
//          }
            let url = context.getCookie(AppConstant.cookie.beforeLoginUrl)
            let tempUrl
            if (url === undefined || url.length <= 0) {
              tempUrl = context.pages.Home
            } else {
              tempUrl = url
            }
            context.replace(tempUrl)
          } else {
            if (data !== undefined && data !== null) {
              context.toast(data.message)
            } else {
              context.toast('登录失败')
            }
            // 跳转到一个新界面，只要一个登录按钮，并执行登录
            context.replace(context.pages.Login)
          }
        })
          .catch(e => {
            context.hideLoading()
            console.log('---------------------登录异常-----------------' + e)
            context.toast('登录失败')
            context.replace(context.pages.Login)
          })
      },
      html5Login () {
        this.showLoading('加载中......')
        let context = this
        LoginUtil.loginHtml5(
          this,
          storeTypes,
          context.info.account,
          context.info.password
        ).then(data => {
          this.hideLoading()
          if (data !== undefined && data !== null && data.state === true) {
//          context.$store.commit(storeTypes.GLOBAR_LOGIN_SET, true);
//          AppConstant.sysContext.isLogin = true
//          isCompletionInfo
//          let {domain} = this.$store.getters.userInfo
//          if (domain) {
//            this.setHeaderDomain(domain)
//          }
//          if (isCompletionInfo === false) {
//            this.replace('/perfectInfomation')
//            return
//          }
//          let url = context.getCookie(AppConstant.cookie.beforeLoginUrl);
            let tempUrl
//          if (url === undefined || url.length <= 0) {
            tempUrl = context.pages.Home
//          } else {
//            tempUrl = url;
//          }
            context.replace(tempUrl)
          } else {
            if (data !== undefined && data !== null) {
              context.toast(data.message)
            } else {
              context.toast('登录失败')
            }
            // 跳转到一个新界面，只要一个登录按钮，并执行登录
//          context.replace(context.pages.Login);
          }
        })
          .catch(e => {
            context.hideLoading()
            console.log('---------------------登录异常-----------------' + e)
            context.toast('登录失败')
//          context.replace(context.pages.Login);
          })
      }
    }
  }
</script>
