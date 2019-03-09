<template>
  <div class="contain" v-if="isShow">
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="weui-dialog weui-dialog-3">
        <img class="inner-icon" src="../../../design/images/icon-tel2.png" />
        <div class="weui-dialog__bd">
          <p class="fs40">968823</p>
        </div>
        <div class="weui-dialog__ft">
          <a @click="hide()" class="weui-dialog__btn weui-dialog__btn_gray">取消</a>
          <a @click="clickTel()"  class="weui-dialog__btn weui-dialog__btn_primary">拨打</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">

</style>
<script>
export default {
  data(){
    return{
      isShow:false
    }
  },
  methods:{
    clickTel(){
      this.giveRing(968823)
      this.hide();
    },
     show(){
       this.isShow = true;
     },
    hide(){
       this.isShow = false;
    }
  }
}
</script>
