<template>
  <div class="weui-panel hb-panel">
    <div class="hb-media-box hb-media-box-1" v-for="subItem in subOrderList" :key="subItem.subOrderNo">
      <div class="hb-media-box-hd">
        <img class="hb-media-box-thumb" :src="subItem.photoPath"/>
        <div class="label">{{getClassTypeInSkuList(subItem.skuPropertyNameList) === 0 ? '面授班' : '网络班'}}</div>
      </div>
      <div class="hb-media-box-bd">
        <div class="hb-media-box-title">{{subItem.skuName}}</div>
        <div class="hb-media-box-desc">年度：{{getSkuPropertyValueNameByKeyName('年度', subItem)}}年</div>
        <div class="hb-media-box-desc">科目：{{getSkuPropertyValueNameByKeyName('科目', subItem)}}</div>
        <div class="hb-media-box-desc">学时：{{subItem.trainingPeriod}}</div>
      </div>
      <div>
        <div class="price" style="color:#fcb032">￥
          <span class="num">{{subItem.originalPrice}}元</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        subOrderList: this.$route.params.subOrderList
      }
    },
    methods: {
      getClassTypeInSkuList (skuList) {
        // 返回0：面授班，1：网授班
        for (let i = 0; i < skuList.length; i++) {
          if (skuList[i].skuPropertyCode === 'trainingType') {
            if (skuList[i].skuPropertyValueName === '面授班') {
              return 0
            } else {
              return 1
            }
          }
        }
      },
      /** 通过keyname获取对应的sku值 */
      getSkuPropertyValueNameByKeyName (keyName, item) {
        if (item === undefined || item.skuPropertyNameList === undefined) {
          return ''
        }
        if (item.skuPropertyNameList.length === 0) {
          return ''
        }
        let propertyName = ''
        for (let i = 0; i < item.skuPropertyNameList.length; i++) {
          let skuPropertyObject = item.skuPropertyNameList[i]
          if (skuPropertyObject.skuPropertyName === keyName) {
            propertyName = skuPropertyObject.skuPropertyValueName
          }
        }
        return propertyName
      }
    }
  }
</script>
