<template>
  <!--// 登录-->
</template>
<script>
  import * as storeTypes from '@/store/types'
  import AppConstant from '@/global/constants/AppConstant'
  import LoginUtil from '@/common/core/Login'
  //  import Global from '@/global/global'
  export default {
    data () {
      return {}
    },
    created () {
      console.log(1)
    },
    mounted () {
      this.html5Login()
    },
    methods: {
      /**
       * 网络    获取微信的unionId和openId数据
       * @param query
       */
//      wxInfoRequest (query) {
//        let params = {
//          code: query.code
//        }
//        this.showLoading('加载中......')
//        this.$store.dispatch(storeTypes.ACCOUNT_WX_INFO_REQUEST, params).then(data => {
//          this.hideLoading()
//          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
//            this.setCookie(AppConstant.cookie.openId, data.data.openId)
//            this.setCookie(AppConstant.cookie.unionId, data.data.unionId)
//            // window.localStorage.setItem(AppConstant.localStorage.unionId, data.data.unionId)
//            // window.localStorage.setItem(AppConstant.localStorage.openId, data.data.openId)
//            this.setCookie(AppConstant.cookie.accessToken, data.data.accessToken)
//            this.setCookie(AppConstant.cookie.refreshToken, data.data.refreshToken)
//            this.setCookie(AppConstant.cookie.nickname, data.data.nickname)
//            this.setCookie(AppConstant.cookie.wxUserSex, parseInt(data.data.sex))
//            this.setCookie(AppConstant.cookie.wxUserHeadImage, data.data.headimgurl)
//            this.hasBindWXRquest()
//          } else {
//            this.redirect()
//          }
//          console.log('---------------------获取微信的unionId和openId失败---------------------------------' + data)
//        }).catch(e => {
//          this.hideLoading()
//          console.log('---------------------获取微信的unionId和openId异常---------------------------------- ' + e)
//        })
//      },
      html5Login () {
        this.showLoading('加载中......')
        let context = this
        LoginUtil.loginHtml5(
          this,
          storeTypes,
          null,
          null
        ).then(data => {
          this.hideLoading()
          if (data !== undefined && data !== null && data.state === true) {
//            context.$store.commit(storeTypes.GLOBAR_LOGIN_SET, true);
//            AppConstant.sysContext.isLogin = true
//            isCompletionInfo
//            let {domain} = this.$store.getters.userInfo
//            if (domain) {
//              this.setHeaderDomain(domain)
//            }
//            if (isCompletionInfo === false) {
//              this.replace('/perfectInfomation')
//              return
//            }
            let tempUrl = context.pages.Home
            context.replace(tempUrl)
          } else {
            if (data !== undefined && data !== null) {
              console.log(data.message)
//              context.toast(data.message);
            } else {
              console.log('登录失败')
//              context.toast('登录失败');
            }
            // H5自动登录如果没成功跳去首页门户
            context.replace(context.pages.Home)
          }
        })
          .catch(e => {
            context.hideLoading()
            console.log('---------------------登录异常-----------------' + e)
            console.log('登录失败')
//            context.toast('登录失败');
            context.replace(context.pages.Home)
          })
      }
    }
  }
</script>
