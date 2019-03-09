<template>
  <div class="contain">
    <div class="hb-form-cells">
      <div class="tit-box-1">
        <div class="fs44 tc">完善信息后，<br/>更好的为您的继续教育服务！</div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">姓名</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请填写真实姓名" class="weui-input"
                                            v-model="userInfo.userName"/></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">身份证号</span></div>
          <div class="weui-cell__bd"><span style="font-size: .28rem">{{userInfo.account}}</span></div>
        </div>
        <div class="weui-cell weui-cell_access sex">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">性别</span></div>
          <div class="weui-cell__bd">
            <popup-picker class="gray-color" confirm-text="确定" placeholder="请选择性别" value-text-align="left"
                          :data="sexList" :columns="1" v-model="sex" show-name></popup-picker>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">手机号</span></div>
          <div class="weui-cell__bd"><span style="font-size: .28rem">{{userInfo.phoneNumber}}</span></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">单位名称</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请填写单位名称" class="weui-input"
                                            v-model="userInfo.unitName"/></div>
        </div>
      </div>
      <div class="btn-primary mt80" @click="submit">提交</div>
    </div>
  </div>
</template>
<script>
  import AppConstant from '../../global/constants/AppConstant'
  import * as storeTypes from '../../store/types'
  import { PopupPicker } from 'vux'

  export default {
    components: { PopupPicker },
    data () {
      return {
        userInfo: this.$store.getters.userInfo,
        sexList: [{
          name: '男',
          value: '1'
        }, {
          name: '女',
          value: '2'
        }],
        sex: [this.getCookie(AppConstant.cookie.wxUserSex)]
      }
    },
    methods: {
      checkAndToast () {
        if (!this.userInfo.userName || !this.userInfo.userName.length) {
          this.toast('真实姓名不能为空')
          return false
        }
        if (!this.sex[0]) {
          this.toast('请选择性别')
          return false
        }
        if (!this.userInfo.unitName || !this.userInfo.unitName.length) {
          this.toast('单位名称不能为空')
          return false
        }
        return true
      },
      submit () {
        if (this.checkAndToast()) {
          this.userInfo.sex = parseInt(this.sex[0])
          let params = {
            userInfo: this.userInfo
          }
          this.showLoading()
          this.$store.dispatch(storeTypes.ACCOUNT_UPDATE_USERINFO, params).then((data) => {
            this.hideLoading()
            if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
              this.replace(this.pages.Home)
            } else {
              this.toast(data.head.message)
            }
          })
        }
      }
    }
  }
</script>
