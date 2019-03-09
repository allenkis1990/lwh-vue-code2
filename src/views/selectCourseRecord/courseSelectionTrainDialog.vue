<template>
  <div class="contain">
    <div class="js_dialog" id="iosDialog1" v-if="showGoStudyDialog" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="weui-dialog weui-dialog-1">
        <div class="weui-dialog__bd weui-dialog__bd-1">
          <div class="tl fs28">
            <p class="b fs32">进入学习方式方法如下：</p>
            <p class="mt10">1.进入微信->发现->进入小程序,搜索<span class="cb"> “{{appName}}”</span>，<span class="cb" @click="copyName()">点我复制名称</span></p>
            <p class="mt10">2.进入我的->换课记录</p>
          </div>
          <img class="xcq-img-1 mt20" :src="getImageXCX()"/>
          <div class="mt20" v-show="isShowUI()">长按识别小程序</div>
          <a class="btn-close" @click="$emit('hide')"><img src="../../../design/images/icon-close.png" /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  import Global from '@/global/global'
  export default {
    data: function () {
      return {
        appName: '福建省会计继续教育',
        showGoStudyDialog: false
      }
    },
    props: {
      show: {
        type: Boolean
      }
    },
    created () {
      let href = window.location.href
      if (href.indexOf('h5test')) {
        this.appName = '会计专业技术人员继续教育'
      }
    },
    methods: {
      isShowUI () {
        if (Global.isWeiXin()) return true
        return false
      },
      getImageXCX () {
        let href = window.location.href
        if (href.indexOf('h5test')) {
          return require('../../../design/images/xcxtest.jpg')
        } else {
          return require('../../../design/images/xcx.jpg')
        }

      },
      copyName () {
          this.copyArticle("福建省会计继续教育")
        }
    },
    mounted: function () {
    },
    watch: {
      show: function (nv) {
        console.log(nv)
        if (nv !== undefined) {
          this.showGoStudyDialog = nv
        }
      }
    }
  }
</script>
