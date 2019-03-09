<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">学习中心</div>
    </div>
    <!--标题栏-->
    <scroller style="box-sizing: border-box;"
              :height="scrollerHeight" lock-x>
      <div>
        <div class="hb-user-img bor-b20" @click="gotoPersonInfo">

          <img class="user-img"
               :src="bindUserImg"
               alt=" ">
          <!--<img  class="user-img"-->
          <!--src="../../assets/user-img.jpg"-->
          <!--alt=" ">-->
          <div class="mt10">{{userInfo.userName}}</div>
          <div class="mt10 fs28">
            专业技术资格等级：{{userInfo.trainProfessionalLevel == null ? '' : userInfo.trainProfessionalLevel}}
          </div>
          <div class="go"><img src="../../../design/images/icon-go.png"/></div>
        </div>
        <div class="weui-cells hb-panel hb-personal-center" style="padding-bottom:1rem;">
          <div class="weui-cell weui-cell_access" @click="gotoYearSituation">
            <div class="weui-cell__hd"><span class="hb-ico ico-year"></span></div>
            <div class="weui-cell__bd">
              <div class="bd-items fs30">各年度继续教育培训情况</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
          <div class="weui-cell weui-cell_access" @click="popGuide">
            <div class="weui-cell__hd"><span class="hb-ico ico-study"></span></div>
            <div class="weui-cell__bd">
              <div class="bd-items fs30">进入学习</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
          <div class="weui-cell weui-cell_access bor-b20" @click="popGuide">
            <div class="weui-cell__hd"><span class="hb-ico ico-prove"></span></div>
            <div class="weui-cell__bd">
              <div class="bd-items fs30">培训证明</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>

          <div class="weui-cell weui-cell_access" @click="gotoChooseList">
            <div class="weui-cell__hd"><span class="hb-ico ico-exchange"></span></div>
            <div class="weui-cell__bd">
              <div class="bd-items fs30">选课清单（{{totalCredit}}学分）</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
          <div class="weui-cell weui-cell_access" @click="gotoMyOrder">
            <div class="weui-cell__hd"><span class="hb-ico ico-order"></span></div>
            <div class="weui-cell__bd">
              <div class="bd-items fs30">我的订单</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
          <div class="weui-cell weui-cell_access bor-b20" @click="gotoChooseRecord">
            <div class="weui-cell__hd"><span class="hb-ico ico-record"></span></div>
            <div class="weui-cell__bd">
              <div class="bd-items fs30">选课记录</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>

          <div class="weui-cell weui-cell_access" @click="changePwd">
            <div class="weui-cell__hd"><span class="hb-ico ico-pwd"></span></div>
            <div class="weui-cell__bd">
              <div class="bd-items fs30">修改密码</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
          <div class="weui-cell weui-cell_access" v-if="!isOnWechat()" @click="loginOut">
            <div class="weui-cell__hd"><span class="hb-ico ico-exit"></span></div>
            <div class="weui-cell__bd">
              <div class="bd-items fs30">退出登录</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>


        <PopGuide ref="popGuideRef"></PopGuide>
      </div>
    </scroller>
  </div>
</template>

<script>
  import * as storeTypes from '../../store/types'
  import PopGuide from '../../components/StudyQrcodeComponent.vue'
  import { Scroller } from 'vux'
  import AppConstant from '../../global/constants/AppConstant'

  export default {
    components: {
      PopGuide,
      Scroller
    },
    data () {
      return {
        scrollerHeight: '',
        userInfo: this.$store.getters.userInfo,
        totalCredit: 0
      }
    },
    mounted () {
      this.scrollerHeight = (window.outerHeight || window.innerHeight) + 'px'
      for (let key in this.$store.getters.userInfo) {
        this.userInfo[key] = this.$store.getters.userInfo[key]
      }
      debugger
      this.getTotalCredit()
//      debugger
    },
    computed: {
      bindUserImg () {
        var imgsrc = ''
        if (this.userInfo.sex === 1 || this.userInfo.sex === '1') {
          imgsrc = (this.userInfo.displayPhotoUrl == null || this.userInfo.displayPhotoUrl == '') ? require('../../../design/images/user-img.jpg') : this.userInfo.displayPhotoUrl
        } else {
          imgsrc = (this.userInfo.displayPhotoUrl == null || this.userInfo.displayPhotoUrl == '') ? require('../../../design/images/user-img-w.jpg') : this.userInfo.displayPhotoUrl
        }
        return imgsrc
      }
    },

    methods: {

//      bindUserImg() {
//        var imgsrc = (this.userInfo.displayPhotoUrl == null || this.userInfo.displayPhotoUrl == '') ? '../../../design/images/user-img.jpg' : this.userInfo.displayPhotoUrl;
//        return imgsrc
//      },
      //获取购物车学分统计
      getTotalCredit () {
        var context = this
        this.$store.dispatch(storeTypes.COUNT_SHOPPINGCART_TOTALCREDIT, {}).then((data) => {
          if (data.head.code == storeTypes.NETWORK_RESULT_SUCCESS) {
            context.totalCredit = data.data.totalCredit
          } else {
            context.toast(data.head.message)
          }
        })
      },
      //去个人信息页面
      gotoPersonInfo () {
        this.push('/personalInfo')
      },
      //引导区小程序学习
      popGuide () {
        debugger
        this.$refs.popGuideRef.show()
      },
      //去年度继续教育培训情况
      gotoYearSituation () {
        debugger
        this.push('/courseYearSituation')
      },
//      去选课清单
      gotoChooseList () {
        this.push('/demo/shoppingCart')
      },
      //去我的订单
      gotoMyOrder () {
        this.push({
          path: '/orderList'
        })
      },
      //去选课记录
      gotoChooseRecord () {
        this.push('/selectCourseRecord')
      },
      //修改密码
      changePwd () {
        this.push('/changePassword')
      },
      //退出登录
      loginOut () {
        this.$vux.loading.show({
          text: '退出中...'
        })
        this.$store.dispatch(storeTypes.ACCIYBT_EXIT, '').then(data => {
          this.$vux.loading.hide()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.removeCookie(AppConstant.cookie.beforeLoginUrl)
            this.$store.commit(storeTypes.GLOBAR_LOGIN_SET, false)
            this.replace('/loginByPassword')
            AppConstant.sysContext.isLogin = false
          } else {
            this.toast(data.head.message)
          }
        }).catch(e => {
          console.log(e)
        })


      },
      isOnWechat () {
        var ua = navigator.userAgent.toLowerCase()
        var isWeixin = ua.indexOf('micromessenger') != -1
        if (isWeixin) {
          return true
        } else {
          return false
        }
      }

    }
  }
</script>

