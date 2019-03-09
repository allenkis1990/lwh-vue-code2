<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">申请退款</div>
    </div>
    <!--标题栏-->
    <div class="hb-wrap-box hb-wrap-box-5">
      <div class="weui-panel hb-panel bor-b20">
        <div class="hb-media-box">
          <div class="hb-media-box-hd">
            <img class="hb-media-box-thumb" src="../../../design/images/course-score.jpg" />
          </div>
          <div class="hb-media-box-bd">
            <div class="hb-media-box-desc">继续教育年度：2019</div>
            <div class="hb-media-box-desc">每学分：<span class="ci">￥1.00</span></div>
            <div class="hb-media-box-desc">学分：30</div>
          </div>
        </div>
      </div>
      <div class="hb-form-cells" style="padding:0 .3rem;">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell weui-cell_access" @click="showBox">
            <div class="weui-cell__hd">
              <span class="weui-label weui-label-2">退款原因</span>
            </div>
            <div class="weui-cell__bd">
              <div class="tr fs28 c6">请选择</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="weui-label weui-label-2">退款金额</span></div>
            <div class="weui-cell__bd ci">￥40.00</div>
          </div>
        </div>
        <div class="order-tip jcc">
          <img src="../../../design/images/icon-warning.png" />
          <div class="text">退款成功后，款项原路返回原支付账号</div>
        </div>
        <div class="btn-primary">提交</div></div>
    </div>
    <!--以下是退款原因选择-->
    <div style=""
         :class="{'opacity0':!opacity1Box,'opacity1':opacity1Box}"
         class="refund-reson-box">
      <div class="mask500" @click="hideBox"></div>
      <div class="select-box-501">
        <div class="tit">退款原因</div>
        <div class="con">
          <div class="item">
            <div>多买了</div>
            <img class="img" src="../../../design/images/radio-checked.png" />
          </div>
          <div class="item">
            <div>不想学了</div>
            <img class="img" src="../../../design/images/radio.png" />
          </div>
          <div class="item">
            <div>其他原因</div>
            <img class="img" src="../../../design/images/radio.png" />
          </div>
        </div>
        <div class="btn-bottom" @click="hideBox">关闭</div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  .refund-reson-box{transition: all 0.5s;position: fixed}
  .opacity0{opacity:0;z-index:0}
  .opacity1{opacity:1;z-index:100}
</style>

<script>
  export default {
    data () {
      return {
        opacity1Box: false
      }
    },
    mounted () {
    },
    computed: {},
    components: {
    },
    methods: {
      showBox() {
        this.opacity1Box = true
      },
      hideBox() {
        this.opacity1Box = false
      }
    }
  }
</script>

