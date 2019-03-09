<template>
  <div class="contain">
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <!-- Swiper -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="images/step1.jpg"></div>
          <div class="swiper-slide"><img src="images/step2.jpg"></div>
          <div class="swiper-slide"><img src="images/step3.jpg"></div>
          <div class="swiper-slide"><img src="images/step4.jpg"></div>
          <div class="swiper-slide"><img src="images/step5.jpg"></div>
          <div class="swiper-slide"><img src="images/step6.jpg"></div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less');
  //  import Swiper from '../dist/js/swiper.min.js';
  //  import '../dist/css/swiper.css';
  export default {
    mounted() {
//      var mySwiper = new Swiper('.swiper-container', {
//        autoplay:true,
//        loop:true,
//        pagination: {
//          el: '.swiper-pagination',
//        },
//      })
    }
  }
</script>
