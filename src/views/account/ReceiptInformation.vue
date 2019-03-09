<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left" @click="goBack()">
        <a href="javascript:void(0);" class="hb-ico ico-return"></a>
      </div>
      <div class="header-tit">收货地址</div>
      <div class="header-right">
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-box-bd">
      <div class="hb-warm-tips hb-warm-tips-1">
        <img class="ico-tips" src="../../../design//images/icon-tips.png"/>
        <span class="tips-txt">请正确填写您的收件地址，以便下一次报名培训班级时作为发票/证书的邮寄地址，感谢您的配合！</span>
      </div>
      <div class="weui-panel hb-panel" v-if="mode === 'show'" style="margin-top:0">
        <div class="weui-cells">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">收件人</span></div>
            <div class="weui-cell__bd">{{recipient.receiverName}}</div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">手机号</span></div>
            <div class="weui-cell__bd">{{recipient.mobileNo}}</div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">收件地区</span></div>
            <div class="weui-cell__bd">{{recipient.provinceName + '-' + recipient.cityName + '-' +
              recipient.districtName}}
            </div>
          </div>
          <div class="weui-cell weui-cell_access weui-cell-start">
            <div class="weui-cell__hd"><span class="tit-2">详细地址</span></div>
            <div class="weui-cell__bd">{{recipient.addressDetails}}</div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">邮政编码</span></div>
            <div class="weui-cell__bd">{{recipient.postCode}}</div>
          </div>
        </div>
      </div>

      <!--编辑-->
      <div class="weui-panel hb-panel" v-if="mode === 'edit'" style="margin-top:0">
        <div class="weui-cells weui-cells_form" style="margin-top:0">
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <div class="tit-2">姓名</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请填写收货人姓名" v-model="recipient.receiverName"/>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <div class="tit-2">手机号</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请填写收货人11位手机号" v-model="recipient.mobileNo"/>
            </div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd">
              <div class="tit-2">收件地区</div>
            </div>
            <div class="weui-cell__bd">
              <popup-picker class="gray-color poppicker-no-padding" placeholder="请选择地区信息" value-text-align='left'
                            style='flex:1' :data='areaArray' :columns='3' v-model='areaValue' show-name></popup-picker>
            </div>
          </div>
          <div class="weui-cell weui-cell-start">
            <div class="weui-cell__hd">
              <div class="tit-2">详细地址</div>
            </div>
            <div class="weui-cell__bd">
              <textarea class="weui-textarea textarea-ios" style="top:0" placeholder="请输入收货详细地址"
                        v-model="recipient.addressDetails"></textarea>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <div class="tit-2">邮政编码</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请填写邮政编码" v-model="recipient.postCode"/>
            </div>
          </div>
        </div>
      </div>
      <!--/编辑-->
    </div>
    <div class="hb-tabbar">
      <div class="hb-btn hb-btn-3" style="width:100%;position:absolute;left:0;bottom:0" @click="toggleMode"
           v-show="mode === 'show'">编辑收货地址
      </div>
      <div :class="buttonStyle" style="width:100%;position:absolute;left:0;bottom:0" @click="submit"
           v-show="mode === 'edit'">保存
      </div>
    </div>
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;" v-if="success">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">
          <img class="d-icon-success" src="../../../design/images/icon-success.png"/>
          <p class="mt20">保存成功</p>
        </div>
        <!-- <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">返回个人中心</a>
        </div> -->
      </div>
    </div>
  </div>
</template>
<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

  .hb-disabled {
    background-color: #bbb !important;
    color: #666 !important;
  }
</style>
<script>

  import { PopupPicker } from 'vux'
  import * as storeTypes from '../../store/types'

  export default {
    components: { PopupPicker },
    data () {
      return {
        initInfo: {},
        success: false,
        mode: 'show',
        recipient: this.$store.getters.userReceiptInfo || {},
        areaArray: [],
        areaValue: []
      }
    },
    computed: {
      buttonStyle () {
        if (!this.recipient.receiverName || !this.recipient.mobileNo || !this.recipient.addressDetails || !this.recipient.postCode || !this.areaValue[0]) {
          return ['hb-btn hb-btn-3 hb-disabled']
        } else {
          return ['hb-btn hb-btn-3']
        }
      }
    },
    created () {
      this.initInfo = JSON.parse(JSON.stringify(this.recipient))
      this.requestAreaInfo()
    },
    mounted () {
      if (this.isEmpty(this.recipient)) {
        this.mode = 'edit'
      }
    },
    methods: {
      goBack () {
        if (this.mode !== 'edit') {
          this.back()
          return
        }
        let that = this
        let info = this.recipient
        for (let key in info) {
          if (info[key] !== this.initInfo[key]) {
            this.$vux.confirm.show({
              title: '提示',
              content: `确定要放弃此次编辑`,
              cancelText: '取消',
              confirmText: '确定',
              onConfirm () {
                that.back()
              }
            })
            return
          }
        }
        this.back()
      },
      toggleMode () {
        if (this.mode === 'edit') {
          this.mode = 'show'
        } else {
          this.mode = 'edit'
          this.initInfo = JSON.parse(JSON.stringify(this.recipient))
          this.recipient = this.$store.getters.userReceiptInfo
          if (this.recipient.provinceId) {
            this.areaValue = [this.recipient.provinceId, this.recipient.cityId, this.recipient.districtId]
          }
        }
      },
      isEmpty (obj) {
        let flag = true
        for (let key in obj) {
          if (obj[key]) {
            flag = false
          }
        }
        return flag
      },
      requestAreaInfo: function () {
        this.$store.dispatch(storeTypes.GLOBAL_GET_AREA_INFO).then(data => {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            let areaInfo = data.data.provinces
            this.changeAreaInfoToAreaArray(areaInfo)
          } else {
            console.log(JSON.stringify(data))
          }
        })
      },
      changeAreaInfoToAreaArray: function (areaInfo) {
        for (let i = 0; i < areaInfo.length; i++) {
          let province = areaInfo[i]
          let tempProvince = {
            name: province.provinceName,
            value: province.provinceCode,
            parent: 0
          }
          this.areaArray.push(tempProvince)
          for (let j = 0; j < province.cities.length; j++) {
            let city = province.cities[j]
            let tempCity = {
              name: city.cityName,
              value: city.cityCode,
              parent: province.provinceCode
            }
            this.areaArray.push(tempCity)
            for (let k = 0; k < city.districts.length; k++) {
              let district = city.districts[k]
              let tempDistrict = {
                name: district.districtName,
                value: district.districtCode,
                parent: city.cityCode
              }
              this.areaArray.push(tempDistrict)
            }
          }
        }
      },
      isPoneAvailable (str) {
        if (!str.length || str.length !== 11) {
          return false
        }
        return true
      },
      isPostalCodeAvailable (str) {
        let myreg = /^[0-9]{6}$/
        if (myreg.test(str)) {
          return true
        } else {
          return false
        }
      },
      checkAndToast () {
        if (!this.recipient.receiverName) {
          this.toast('请填写姓名')
          return false
        }
        if (!this.recipient.mobileNo) {
          this.toast('请填写手机号')
          return false
        }
        if (!this.areaValue[0]) {
          this.toast('请填写收件地区')
          return false
        }
        if (!this.recipient.addressDetails.length) {
          this.toast('请填写详细地址')
          return false
        }
        if (!this.recipient.postCode) {
          this.toast('请填写邮政编码')
          return false
        }
        if (this.recipient.mobileNo.length !== 11) {
          this.toast('请输入11位手机号')
          return false
        }
        if (this.recipient.postCode.length !== 6) {
          this.toast('请输入6位邮政编码')
          return false
        }
        return true
      },
      addAddressCode () {
        if (this.areaValue[0]) {
          this.recipient.provinceId = this.areaValue[0]
          this.recipient.cityId = this.areaValue[1]
          this.recipient.districtId = this.areaValue[2]
        }
      },
      submit () {
        if (this.checkAndToast()) {
          this.addAddressCode()
          this.$store
            .dispatch(storeTypes.ACCOUNT_UPDATE_RECEIPTINFO, this.recipient)
            .then(data => {
              if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
                this.toast(data.head.message)
              } else {
                // this.toast('修改成功!');
                this.success = true
                setTimeout(() => {
                  this.success = false
                }, 1000)
                this.recipient = data.data
                this.toggleMode()
              }
            })
            .catch(e => {
              console.log('>>' + e)
            })
        }
      }
    }
  }
</script>
