<template>
  <div style="height:100%;width:100%">
    <!--<drawer
      width="180px;"
      :show.sync="$store.state.drawerVisibility"
      :show-mode="showModeValue"
      :placement="showPlacementValue"
      :drawer-style="{'background-color':'#38373d', width: '180px'}">
      <div slot="drawer">
        <div class="hb-popover" style="width:180px;left:0">
          <div class="popover-bd">
            <div class="user-img-box" style="padding:0;margin: -10px 0 35px 0">
              <img class="user-img" :src="imgUserHeader" @click="gotoPage('/demo/mine')" >
              <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default hd-btn"
                 v-if="!$store.getters.hasLogin" @click="loginEvent">登 录</a>
            </div>
            <div class="hb-menu-box">
              <a href="javascript:void(0);" :class="[itemStyle('/demo/newhome')]" @click="gotoPage('/demo/newHome')">
                <span class="hb-ico ico-found"></span>首页
              </a>
              <a href="javascript:void(0);" :class="[itemStyle('/demo/home')]" @click="gotoPage('/demo/home')">
                <span class="hb-ico ico-found"></span>发现培训
              </a>
              <a href="javascript:void(0);" :class="[itemStyle('/demo/ShoppingCart')]"
                 @click="gotoPage('/demo/ShoppingCart')">
                <span class="hb-ico ico-car"></span>购物车
              </a>
              <a href="javascript:void(0);"  :class="[itemStyle('/demo/orderList')]"
                 @click="gotoPage('/demo/orderList')">
                <span class="hb-ico ico-list"></span>报名清单
              </a>
              <a href="javascript:void(0);" class="menu-items" @click="() => {this.showCode = true}"
                >
                <span class="hb-ico ico-class"></span>我的学习
              </a>
              <a href="javascript:void(0);" class="menu-items" @click="() => {this.showCode = true}"
                >
                <span class="hb-ico ico-prove"></span>学习档案
              </a>
              <a href="javascript:void(0);" class="menu-items" @click="openApp"
                >
                <span class="hb-ico ico-app"></span>APP学习
              </a>
              &lt;!&ndash; <a href="javascript:void(0);" class="menu-items"
                @click="exitAppEvent()">
                <span class="hb-ico ico-exit"></span>退出登录
              </a> &ndash;&gt;
            </div>
          </div>
        </div>
      </div>
    </drawer>-->
    <!-- 二维码弹窗 -->
    <router-view class="router-view"></router-view>
    <div class="weui-tabbar" v-if="!$store.state.hideFooter">
      <a href="javascript:void(0);"
         @click="gotoPage(item.path)"
         v-for="(item,index) in navBarList"
         :class="{'weui-bar__item_on':item.path===$route.path}"
         class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
          <!--<img src="../images/tabbar-find.png" alt=" " />-->
          <img :src="(item.path===$route.path)?item.currentIco:item.ico" alt=" "/>
        </div>
        <p class="weui-tabbar__label"><span>{{item.name}}</span></p>
      </a>

      <!--<a href="javascript:void(0);" class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
          <img src="../../design/images/tabbar-cart.png" alt=" " />
          &lt;!&ndash;<img src="../images/tabbar-cart-current.png" alt=" " />&ndash;&gt;

        </div>
        <p class="weui-tabbar__label"><span>选课培训</span></p>
      </a>


      <a href="javascript:void(0);" class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
          <img src="../../design/images/tabbar-archives.png" alt=" " />
          &lt;!&ndash;<img src="../images/tabbar-archives-current.png" alt=" " />&ndash;&gt;
        </div>
        <p class="weui-tabbar__label"><span>学习中心</span></p>
      </a>-->
    </div>
    <!--<div class="js_dialog" id="iosDialog1" style="opacity: 1" v-if="showCode">
      <div class="weui-mask"></div>
      <div class="weui-dialog weui-dialog-1">
        <div class="weui-dialog__bd weui-dialog__bd-1">
          <p>请 <span class="cb b">长按保存</span> 小程序二维码，扫码，进入学习。或者进入小程序搜索“<span class="cb b">福建华博课程超市+</span>”</p>
          <img class="xcq-img mt40" src="../../design/images/xcx.jpg" />
        </div>
      </div>
      <a class="btn-close button-close" @click="closeDialog">
        <img style="width:100%;height:100%" src="../../design/images/icon-close.png" />
      </a>
    </div>-->
  </div>
</template>

<style lang="less">
  .button-close {
    position: absolute;
    top: 50%;
    left: 50%;
    width: .88rem;
    height: .88rem;
    z-index: 9999;
    transform: translate(-50%, 450%)
  }
</style>

<script>
  import * as storeTypes from '../store/types'
  //  import AppUtil from '../common/util/AppUtil'
  import {
    Group,
    Cell,
    Drawer
  } from 'vux'
  import AppConstant from '../global/constants/AppConstant'

  export default {
    data () {
      return {
        showCode: false,
        showMenu: false,
        showMode: 'push',
        showModeValue: 'push',
        showPlacement: 'left',
        showPlacementValue: 'left',
        ringhtOptionShowMore: false,
        direction: this.$store.state.direction,
//        imgUserHeader: this.$store.state.accountModule.userInfo.displayPhotoUrl === undefined ? this.$store.state.accountModule.userInfo.displayPhotoUrl : require('../../design/images/default-user-img.jpg'),
        userInfo: this.$store.state.accountModule.userInfo,
        bottomNavList: [
          {
            name: '我的学习',
            ico: require('../../design/images/tabbar-learning.png'),
            currentIco: require('../../design/images/tabbar-learning-current.png'),
            path: '/refundLog'
          },
          {
            name: '发现培训',
            ico: require('../../design/images/tabbar-find.png'),
            currentIco: require('../../design/images/tabbar-find-current.png'),
            path: '/demo/home'
          },
          {
            name: '首页',
            ico: require('../../design/images/tabbar-find.png'),
            currentIco: require('../../design/images/tabbar-find-current.png'),
            path: '/demo/newHome'
          },
          {
            name: '购物车',
            ico: require('../../design/images/tabbar-cart.png'),
            currentIco: require('../../design/images/tabbar-cart-current.png'),
            path: '/demo/shoppingCart'
          },
          {
            name: '学习档案',
            ico: require('../../design/images/tabbar-archives.png'),
            currentIco: require('../../design/images/tabbar-archives-current.png'),
            path: ''
          },
          {
            name: '我的',
            ico: require('../../design/images/tabbar-mine.png'),
            currentIco: require('../../design/images/tabbar-mine-current.png'),
            path: ''
          }],
        navBarList: [
          {
            name: '首页',
            ico: require('../../design/images/tabbar-find.png'),
            currentIco: require('../../design/images/tabbar-find-current.png'),
            path: '/demo/newHome'
          },
          {
            name: '选课培训',
            ico: require('../../design/images/tabbar-cart.png'),
            currentIco: require('../../design/images/tabbar-cart-current.png'),
            path: '/demo/courseSelectionTrain'
          },
          {
            name: '学习中心',
            ico: require('../../design/images/tabbar-archives.png'),
            currentIco: require('../../design/images/tabbar-archives-current.png'),
            path: '/demo/studyCenter'
          }
        ]
      }
    },
    computed: {
      imgUserHeader () {
        let user = this.$store.getters.userInfo
        if (user && user.displayPhotoUrl) {
          if (user.displayPhotoUrl.trim() !== '') {
            return user.displayPhotoUrl
          }
        }
        let wxUserHeadImage = this.getCookie(AppConstant.cookie.wxUserHeadImage)
        return wxUserHeadImage
      }
    },
    components: {
      Group,
      Cell,
      Drawer
    },
    methods: {
      /**
       * 侧滑隐藏事件
       */
      drawerVisibilityEvent () {
        this.$store.commit(storeTypes.GLOBAL_SET_DRAWER, false)
      },
      /**
       * 菜单点击跳转事件
       * @param path
       */
      gotoPage (path) {
//        this.drawerVisibilityEvent()
        if (path === '/demo/studyCenter' || path === '/demo/courseSelectionTrain') {
          var haslogin = this.$store.getters.hasLogin
//          haslogin = false;
          if (!haslogin) {
            var context = this
            this.$vux.confirm.show({
              title: '提示',
              content: `请先登录平台帐号，方可学习！`,
              cancelText: '取消',
              confirmText: '前往登录',
              onConfirm () {
                //去登录页面
                context.push({
                  path: '/loginByPassword'
                })
              }
            })
            return
          }
        }
        this.$router.push(path)
      },
      /**
       * 登录事件
       */
      loginEvent () {
        this.push('/loginByPassword')
      },
      /**
       * 退出事件
       */
      exitAppEvent () {
        this.$store.dispatch(storeTypes.ACCIYBT_EXIT, '').then(data => {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.removeCookie(AppConstant.cookie.beforeLoginUrl)
            this.drawerVisibilityEvent()
            this.replace('/loginByPassword')
          }
        }).catch(e => {
          console.log(e)
        })
      },
      itemStyle (path) {
        if (this.$route.path === path) {
          return ['menu-items', 'current']
        } else {
          return ['menu-items']
        }
      },
      openApp () {
        window.location.href = 'https://kccs.59iedu.com/app/openAppFail.html'
      },
      closeDialog () {
        this.showCode = false
      }
    }
  }
</script>

