<template>
  <div id="app" class="container" style="height:100%">
    <loading :show="isLoading" :text="text"></loading>
    <transition name="router" appear>
      <keep-alive>
        <router-view class="animated" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router" appear>
      <router-view class="animated" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<style lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
  @import "../design/styles/webstyle.less";

  #app {
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

</style>
<script>
  import { XHeader, Loading } from 'vux'
  import utils from '@/common/util/Utils'
  export default {
    components: {
      XHeader,
      Loading
    },
    data () {
      return {
        show6: false,
        userInfo: null,
        hasLogin: false
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.loadInfo.isLoading
      },
      text () {
        return this.$store.state.loadInfo.text
      },
      appInfo () {
        return this.$store.state.appInfo
      },
      isFromRegist () {
        return this.$store.state.isFromRegist
      }
    },
    created () {
      console.mainPage = this
      window.addEventListener('popstate', function (e) {
        if (window.pageBackFun) {
          window.pageBackFun()
        }
        setTimeout(function () {
          window.pageBackFun = null
        }, 1)
      }, false)
    },
    mounted () {
      // 友盟统计添加
      const script = document.createElement("script");
      script.src =
        "https://s5.cnzz.com/z_stat.php?id=1276144609&web_id=1276144609";
      script.language = "JavaScript";
      document.body.appendChild(script);

      this.$watch('$store.state.accountModule.userInfo', function (nv) {
        if (nv.userName) {
          this.userInfo = nv
        }
      })
    },
    watch: {
      userInfo: {
        handler(nv, ov) {
          if (nv && nv.userName) {
            if (this.$store.state.hasLogin) {
              if (this.$route.path === '/H5OrderPagePaidSuccess') {
                return
              }
              let _this = this
              let params = {
                yearName: _this.getCurrentYear()
              }
              let isFromRegist = this.isFromRegist
              if (isFromRegist) {
                setTimeout(() => {
                  this.getStudentOrderTipInfo(params)
                }, 3000)
              } else {
                this.getStudentOrderTipInfo(params)
              }
            }
          }
        },
        deep: true
      }
      // 如果是从注册成功后登录成功的打一个标记，用于延迟三秒再发待支付订单弹窗，因为登录成功倒计时3秒
//      hasLogin (nv) {
//        if (nv) {
//          if (this.$route.path === '/H5OrderPagePaidSuccess') {
//            return
//          }
//          let _this = this
//          let params = {
//            yearName: _this.getCurrentYear()
//          }
//          let isFromRegist = this.isFromRegist
//          if (isFromRegist) {
//            setTimeout(() => {
//              this.getStudentOrderTipInfo(params)
//            }, 3000)
//          } else {
//            this.getStudentOrderTipInfo(params)
//          }
//        }
//      }
    },
    methods: {
      getCurrentYear () {
        return new Date().getFullYear() + ''
      }
    }
  }

</script>
