<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">发票详情</div>
      <div class="header-right3">
        <a href="javascript:void(0);" @click="saveCertificateAction()">保存</a>
      </div>
    </div>
    <!--标题栏-->

    <div class="p20" style="margin-top:.9rem;">
      <div class="pic-invoice"><img :src="pdfPath"/></div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

</style>
<script>
  import * as storeTypes from '@/store/types'

  export default {
    components: {},
    mounted () {
      this.pdfPath = this.$route.query.pdfPath
    },
    data () {
      return {
        pdfPath: '../../../../images/xcx.jpg'
      }
    },
    computed: {},
    methods: {
      saveCertificateAction () {
        this.$vux.alert.show({
          title: '提示',
          content: '请长按图片进行保存发票！',
          onShow () {
          },
          onHide () {
          }
        })
      }
//      savePicture() {
//        // 创建下载任务
//        var picurl = this.pdfPath;
//        //图片保存到手机后的路径
//        picname = "_downloads/erwei.png";
//        var dtask = plus.downloader.createDownload(picurl, {}, function (d, status) {
//          // 下载完成
//          if (status == 200) {
//            //	alert( "Download success: " + d.filename );
//            plus.gallery.save(picname, function () {//保存到相册方法
//              mui.toast('已保存到手机相册');
//            }, function () {
//              mui.toast('保存失败，请重试！');
//            });
//          } else {
//            //	alert( "Download failed: " + status ); 
//          }
//        });
//        //dtask.addEventListener( "statechanged", onStateChanged, false );
//        dtask.start();//开始下载
//      }
    }
  }
</script>
