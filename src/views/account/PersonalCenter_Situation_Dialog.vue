<template>
  <div class="contain" v-if="isShow">
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">
          <img class="d-icon-success" src="../../../design/images/icon-warning.png"/>
          <p class="mt20 tl">已获得是指管理系统已认定的学分</p>
          <p class="mt20 tl">正在学习是本培训平台内已选课程但未考核通过的学分</p>
          <p class="mt20 tl">未学习/还差是指学员需完成本年度培训还差的学分</p>

        </div>
        <div class="weui-dialog__ft">
          <a @click="hide()" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">

</style>
<script>
  export default {
    data() {
      return {
        isShow: false
      }
    },
    methods:
  {
    show()
    {
     this.isShow = true;
    },
    hide(){
      this.isShow = false;
    }
  }
  }
</script>
