<template>
  <!--<div class="contain" style="height: 100%;overflow: scroll">
    <div class="hb-form-cells" style="z-index: auto">
      <div class="tit-box-1">
        <div class="h1">欢迎注册</div>
        <div class="fs30 c9 mt5">Welcome to register</div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">帐号</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入身份证号" class="weui-input" v-model="info.identityCardNo"/></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">姓名</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入真实姓名" class="weui-input" v-model="info.userName"/></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">手机号</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入11位手机号" class="weui-input" v-model="info.phoneNum"/></div>
        </div>
      </div>
      <div class="btn-primary mt80" @click="submit">立即注册</div>
      <div class="form-other mt60" style="padding-bottom: 30px">
        <div class="weui-check__label cb tc" @click="() => {this.push('/loginByPassword')}">直接登录</div>
      </div>
    </div>
  </div>-->

  <div class="contain">
    <!--注册第一步-->
    <div class="hb-form-cells" v-show="registStep==='1'">
      <div class="tit-box-1">
        <div class="h1">会计专业技术人员继续教育培训</div>
        <div class="h2">注册</div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">证件号</span></div>
          <div class="weui-cell__bd"><input type="text"
                                            v-model="info.identityCardNo"
                                            placeholder="请输入证件号"
                                            class="weui-input"></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">真实姓名</span></div>
          <div class="weui-cell__bd"><input type="text"
                                            v-model="info.userName"
                                            placeholder="请输入真实姓名"
                                            class="weui-input"></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">手机号</span></div>
          <div class="weui-cell__bd"><input type="text"
                                            class="weui-input"
                                            v-model="info.phoneNum"
                                            placeholder="请输入手机号，以便培训动态通知！"></div>
        </div>
      </div>
      <div class="btn-primary mt80" @click="submit">立即注册</div>
      <div class="form-other mt60">
        <div class="weui-check__label cb tc pb30" @click="() => {this.push('/loginByPassword')}">已有帐号，直接登录</div>
      </div>
    </div>
    <!--注册第二步-->
    <div class="hb-form-cells" v-show="registStep==='2'">
      <div class="tit-box-1">
        <div class="h1">会计专业技术人员继续教育培训</div>
        <div class="h2">帐号信息</div>
      </div>
      <div class="registered-info">
        <div class="pic"><img src="../../../design/images/icon-complete.png"></div>
        <div class="text">请牢记登录帐号信息</div>
        <div class="account">
          <div class="item">帐号：{{resultUserInfo.identityCardNo}}</div>
          <div class="item">密码：{{resultUserInfo.password}}</div>
        </div>
        <!--<div class="input-box"><input type="text"
                                      v-model="info.phoneNum"
                                      placeholder="请输入手机号，以便培训动态通知！"></div>-->
      </div>
      <div class="btn-primary mt80" @click="registStepTwoEvent">立即登录</div>
    </div>


    <div class="js_dialog" style="opacity: 1;" v-show="dialogShow1">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">
          <img class="d-icon-success" src="../../../design/images/icon-warning.png"/>
          <p class="mt20">您输入的身份证号、姓名不匹配！</p>
          <p class="mt20 tl">检查原因：</p>
          <p class="tl">1.检查输入的信息是否正确；</p>
          <p class="tl">2.检查身份证的长度是否为18位；</p>
          <p class="mt20 tl">
            若都不存在以上条件，这是由于会计人员库中没有找到您的信息，您需要到当地财政主管部门登记您的会计档案信息（http://www.xxx.com）。在登记确认后，再登录平台注册、报名、缴费、学习。</p>
        </div>
        <div class="weui-dialog__ft">
          <a href="javascript:void(0);"
             @click="dialogShow1 = false"
             class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
        </div>
      </div>
    </div>
    <div class="js_dialog" style="opacity: 1;" v-show="dialogShow2">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">
          <img class="d-icon-success" src="../../../design/images/icon-success.png"/>
          <p class="mt20">登录成功<span v-show="isWx">且绑定微信</span>！</p>
          <p>{{loginSuccessCount}}s后进入首页</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import "../../../node_modules/vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";


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

  .contain::-webkit-scrollbar {
    display: none;
  }
</style>
<script>
  import * as storeTypes from '../../store/types'
  //  import Utils from '../../common/util/Utils'
  import Global from '@/global/global'
  import LoginUtil from '../../common/core/Login'
  import AppConstant from '../../global/constants/AppConstant'
  import RegionPicker from './RegionPicker.vue'
  import { PopupPicker } from 'vux'

  export default {
    components: { PopupPicker, RegionPicker },
    data () {
      return {
        info: {},
        organList: [],
        btnDisabled: true,
        isCounting: false,
        time: 60,
//        身份证姓名不匹配弹窗
        dialogShow1: false,
//        登录成功弹窗
        dialogShow2: false,
        loginSuccessCount: 3,
        registStep: '1',
        resultUserInfo: {
          identityCardNo: '',
          password: ''
        },
        logining: false,
        isWx: Global.isWeiXin()
      }
    },
    beforeMount () {
    },
    methods: {
      startCounting () {
        this.isCounting = true
        let timer = setInterval(() => {
          if (this.time === 1) {
            this.isCounting = false
            this.time = 60
            clearInterval(timer)
          }
          this.time = this.time - 1
        }, 1000)
      },
      /**
       * 检查注册第一步的输入合法性
       */
      checkInfoAndToast () {
        if (!this.info.identityCardNo) {
          this.toast('证件号不能为空')
          return false
        }
//        if (this.info.identityCardNo.length && this.info.identityCardNo.length !== 18) {
//          this.toast('请输入18位身份证号')
//          return false
//        }
        if (!this.info.userName) {
          this.toast('姓名不能为空')
          return false
        }
        if (!this.info.phoneNum) {
          this.toast('手机号不能为空')
          return false
        }
        if (this.info.phoneNum.length && this.info.phoneNum.length !== 11) {
          this.toast('请输入11位手机号')
          return false
        }
        return true
      },
      /**
       * 点击注册
       */
      submit () {
        if (!this.btnDisabled) {
          return
        }
        if (!this.checkInfoAndToast()) {
          return
        }
//        let params = {
//          account: this.info.identityCardNo
//        };
//        LoginUtil.checkAccount(params,storeTypes,this,true).then((checkSuccess) => {
//          if (checkSuccess) {
//            this.registRequest()
//          } else {
//          }
//        })
        this.registRequest()
      },
      /**
       * 注册请求
       */
      registRequest () {
        let context = this
        this.btnDisabled = false
        let params = {
          phoneNum: this.info.phoneNum,
          identityCardNo: this.info.identityCardNo,
          userName: this.info.userName
        }
//        let params = Object.assign({}, userInfo, this.info)
        this.$vux.loading.show({
          text: '注册中'
        })
        this.$store.dispatch(storeTypes.ACCOUNT_REGISTER_REQUEST, params).then(data => {
          this.$vux.loading.hide()
          if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            this.btnDisabled = true
            switch (data.head.code) {
              case 802:
                this.toast('证件号格式错误')
                break
              case 803:
                this.toast('证件号不存在')
                break
              case 804:
                this.toast('当前证件号已被停用，无法注册！,请前往管理系统核实')
                break
              case 805:
                this.$vux.confirm.show({
                  title: '提示',
                  content: '当前证件号已注册，无需重复注册！请前往登录！',
                  confirmText: '前往登录',
                  cancelText: '取消',
                  onCancel: function () {
                    console.log('取消')
                  },
                  onConfirm: function () {
                    context.replace('/loginByPassword')
                    console.log('前往登录')
                  }
                })
                break
              case 806:
                this.toast('当前证件号为集体报名帐号，请前往PC端登录')
                break
              case 812:
                this.dialogShow1 = true
                break
              case 822:
                this.toast('请输入11位纯数字的手机号')
                break
              default:
                this.toast(data.head.message)
            }
          } else {
            this.resultUserInfo.identityCardNo = data.data.account
            this.resultUserInfo.password = data.data.password
            this.registStep = '2'
            this.toast('注册成功！')
          }
        }).catch(e => {
          this.$vux.loading.hide()
          console.log(e)
        })
      },
      /**
       * 注册第二步
       */
      registStepTwoEvent () {
        this.loginRequest()
      },
      accountHasBindWx () {
        let params = {
          account: this.resultUserInfo.identityCardNo,
          password: this.resultUserInfo.password,
          openId: this.getCookie(AppConstant.cookie.openId),
          unionId: this.getCookie(AppConstant.cookie.unionId),
          registerChannel: '3'
        }
        this.showLoading('加载中......')
        this.$store
          .dispatch(storeTypes.ACCOUNT_HAS_BIND_WX, params)
          .then((data) => {
            this.hideLoading()
            switch (data.head.code) {
              case storeTypes.NETWORK_RESULT_SUCCESS:
                this.wxLogin()
                break
              case '601':
                this.toast('证件号错误')
                break
              case '602':
                this.toast('密码错误')
                break
              case '603':
                this.toast('该微信号被其他证件号绑定')
                break
              case '604':
                this.toast(
                  '该证件号已关联了其他微信帐号，无法登录！请使用与该微信号绑定的证件号登录！'
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
      /**
       * H5登录或者微信登陆
       */
      loginRequest () {
        if (Global.isWeiXin()) {
          this.accountHasBindWx()
        } else {
          this.html5Login()
        }
        console.log('h5或者微信登陆')
      },
      /**
       * H5登录
       */
      html5Login () {
        this.showLoading('加载中......')
        let context = this
        LoginUtil.loginHtml5(
          this,
          storeTypes,
          context.resultUserInfo.identityCardNo,
          context.resultUserInfo.password,
          true
        ).then(data => {
          this.hideLoading()
          if (data !== undefined && data !== null && data.state === true) {
//            context.$store.commit(storeTypes.GLOBAR_LOGIN_SET, true);
//            AppConstant.sysContext.isLogin = true
//            let {domain, isCompletionInfo} = this.$store.getters.userInfo
//            if (domain) {
//              this.setHeaderDomain(domain)
//            }
//            if (isCompletionInfo === false) {
//              this.replace('/perfectInfomation')
//              return
//            }
//            let url = context.getCookie(AppConstant.cookie.beforeLoginUrl);
            let tempUrl
//            if (url === undefined || url.length <= 0) {
            tempUrl = context.pages.Home
//            } else {
//              tempUrl = url;
//            }
//            倒计时登录
            context.countLogin(() => {
              context.replace(tempUrl)
            })
          } else {
            if (data !== undefined && data !== null) {
              context.toast(data.message)
            } else {
              context.toast('登录失败')
            }
            // 跳转到一个新界面，只要一个登录按钮，并执行登录
            context.replace('/loginByPassword')
          }
        })
          .catch(e => {
            context.hideLoading()
            console.log('---------------------登录异常-----------------' + e)
            context.toast('登录失败')
            context.replace('/loginByPassword')
          })
      },
      /**
       * 微信登录
       */
      wxLogin () {
        this.showLoading('加载中......')
        let context = this
        LoginUtil.login(
          this.getCookie(AppConstant.cookie.openId),
          this.getCookie(AppConstant.cookie.unionId),
          this.getCookie(AppConstant.cookie.accessToken),
          this.getCookie(AppConstant.cookie.nickname),
          this,
          console,
          storeTypes,
          true
        ).then(data => {
          this.hideLoading()
          if (data !== undefined && data !== null && data.state === true) {
//            context.$store.commit(storeTypes.GLOBAR_LOGIN_SET, true);
//            AppConstant.sysContext.isLogin = true
//            let { domain, isCompletionInfo } = this.$store.getters.userInfo
//            if (domain) {
//              this.setHeaderDomain(domain)
//            }
//            if (isCompletionInfo === false) {
//              this.replace('/perfectInfomation')
//              return
//            }
            let url = context.getCookie(AppConstant.cookie.beforeLoginUrl)
            let tempUrl
            if (url === undefined || url.length <= 0) {
              tempUrl = context.pages.Home
            } else {
              tempUrl = url
            }
//            倒计时登录
            context.countLogin(() => {
              context.replace(tempUrl)
            })
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
      /**
       * 倒计时登录
       */
      countLogin (goWhere) {
        this.dialogShow2 = true
        var timer = setInterval(() => {
          this.loginSuccessCount--
          if (this.loginSuccessCount === 0) {
            clearInterval(timer)
            goWhere()
          }
        }, 1000)
      }
    }
  }
</script>
