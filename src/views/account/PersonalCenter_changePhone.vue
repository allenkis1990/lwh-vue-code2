<template>
  <div class="contain" v-if="isShow"
       style="position: absolute;top: 0px;left: 0px;right: 0px;bottom: 0px;z-index: 998;background-color: white;">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">修改手机号</div>
      <div class="header-right3" @click="hideComponent">
        <a href="#">返回</a>
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-form-cells pt100">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">手机号</span></div>
          <div class="weui-cell__bd"><input type="number" placeholder="请输入11位手机号" class="weui-input"
                                            v-model="newPhoneNumber"/></div>
        </div>
      </div>
      <div class="btn-primary mt80" @click="changeClick">保存修改</div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

</style>
<script>

  export default {
    props: {},
    data () {
      return {
        isShow: false,
        newPhoneNumber: ''
      }
    },
    methods: {
      show (phone) {
        this.newPhoneNumber = phone
        this.isShow = true
      },

      hideComponent () {
//        this.$emit('backFunc');
        this.isShow = false
      },
      changeClick () {
        this.$emit('changeClick', this.newPhoneNumber)
        this.isShow = false
      }
    }
  }
</script>
