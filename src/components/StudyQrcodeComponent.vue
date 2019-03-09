<template>


  <!---->
  <div class="contain " v-if="isShow">
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="weui-dialog weui-dialog-1" style="top: 30%;margin-top: 50px;">
        <div class="weui-dialog__bd weui-dialog__bd-1">
          <div class="tl fs28">
            <p class="b fs32">进入学习方式方法如下：</p>
            <p class="mt10">进入微信->发现->进入小程序,搜索<span class="cb"> “{{appName}}”</span>，<span @click="copyName" class="cb">点我复制名称</span>
            </p>
          </div>
          <img class="xcq-img-1 mt20" :src="getImageXCX()"/>
          <div v-if="isOnWechat()" class="mt20">长按识别小程序</div>
          <a class="btn-close" @click="hide"><img src="../../design/images/icon-close.png"/></a>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    data () {
      return {
        appName: '福建省会计继续教育',
        isShow: false
      }
    },
    created () {
      let href = window.location.href
      if (href.indexOf('h5test')) {
        this.appName = '会计专业技术人员继续教育'
      }
    },
    methods: {
      getImageXCX () {
        let href = window.location.href
        if (href.indexOf('h5test')) {
          return require('../../design/images/xcxtest.jpg')
        } else {
          return require('../../design/images/xcx.jpg')
        }

      },
      copyName () {
        this.copyArticle(this.appName)
//       this.copytext(this.appName)
      },
      copytext (text) {
        debugger
        const input = document.createElement('input')
        input.setAttribute('readonly', 'readonly')
        input.setAttribute('value', text)
        document.body.appendChild(input)
        input.setSelectionRange(0, 9999)
        if (document.execCommand('copy')) {
          document.execCommand('copy')
//         console.log('复制成功');
          this.toast('复制成功')
        }
        document.body.removeChild(input)
      },
      show () {
        this.isShow = true
      },
      hide () {
        this.isShow = false
        this.$emit('closeFunc')
      },
      isOnWechat () {
        var ua = navigator.userAgent.toLowerCase()
        var isWeixin = ua.indexOf('micromessenger') != -1
        debugger
        if (isWeixin) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>
