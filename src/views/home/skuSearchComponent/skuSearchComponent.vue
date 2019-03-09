<template>

  <div class="screening-bar-exchange">
    <div class="screening-info" v-if="skuData && skuData.length > 0&&!status">
      <div class="info"><b>筛选条件：</b>{{getSkuModelNameByCode('trainingSubject')}}，{{getSkuModelNameByCode('professionalGrade')}}，<span v-if="ifShowCategory()">{{courseCategoryName}}，</span>{{$parent.hourName}}</div>
    </div>
    <a href="javascript:void(0)"
       v-if="!status"
       @click="toggleStatus"
       class="filter-btn"><img src="../../../../design/images/filter.png" class="filter"> <span>筛选</span></a>
    <!--<div class="select-items-mask" v-show="status" @click="maskClick">
      <div class="cont-box">
        <div  :class="['select-items-cont', index === 0 ? 'select-items-cont-1' : 'select-items-cont-2']" v-for="(item, index) in yearHided ? yearHidedData: skuData" :key="index">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">{{item.name}}</span>
          </div>
          <div class="select-items-bd">
            <div @click="clickSkuItem(item,subItem)"
                 :class="['select-item', item.model === subItem.skuPropertyValueId ? 'current': '']" v-for="(subItem) in item.options" :key="subItem.skuPropertyValueId">{{subItem.skuPropertyValueName}}</div>
          </div>
        </div>
      </div>
      <div class="btn-primary" @click="confirm">确定</div>
    </div>-->
    <div class="select-items-mask-exchange sime"
         style="top:-0.12rem;"
         v-if="status">
      <div class="cont-box">
        <!--<div  class="select-items-cont">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">科目</span>
          </div>
          <div class="select-items-bd">
            <div class="select-item current">公需科目</div>
            <div class="select-item">专业科目</div>
          </div>
        </div>
        <div  class="select-items-cont select-items-cont-1">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">专业技术资格等级</span>
          </div>
          <div class="select-items-bd">
            <div class="select-item">初级</div>
            <div class="select-item">中级</div>
            <div class="select-item current">高级</div>
          </div>
        </div>
        <div  class="select-items-cont select-items-cont-2">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">课程分类</span>
          </div>
          <div class="select-items-bd">
            <div class="select-item current">所有分类</div>
            <div class="select-item">A分类</div>
            <div class="select-item">B分类</div>
            <div class="select-item">C分类</div>
            <div class="select-item">D分类</div>
            <div class="select-item">E分类</div>
            <div class="select-item">F分类</div>
          </div>
        </div>
        <div  class="select-items-cont select-items-cont-3">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">学时区间</span>
          </div>
          <div class="select-items-bd">
            <div class="select-item">全部</div>
            <div class="select-item">0~5</div>
            <div class="select-item current">6~10</div>
            <div class="select-item">11~20</div>
            <div class="select-item">21~30</div>
            <div class="select-item">11~20</div>
            <div class="select-item">21~30</div>
            <div class="select-item">11~20</div>
            <div class="select-item">21~30</div>
            <div class="select-item">11~20</div>
            <div class="select-item">21~30</div>
          </div>
        </div> index === 0 ? 'select-items-cont-1' : 'select-items-cont-2'-->
        <div  :class="['select-items-cont', bindClass(item)]"
              v-if="item.code!=='trainingYear'"
              v-for="(item, index) in skuData"
              :key="index">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">{{item.name}}</span>
          </div>
          <div class="select-items-bd">
            <div @click="clickSkuItem(item,subItem)"
                 :class="['select-item', item.model === subItem.skuPropertyValueId ? 'current': '']" v-for="(subItem) in item.options" :key="subItem.skuPropertyValueId">{{subItem.skuPropertyValueName}}</div>
          </div>
        </div>
        <!--按课程分类搜索-->
        <div  v-if="ifShowCategory()" class="select-items-cont select-items-cont-2">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">课程分类</span>
          </div>
          <div class="select-items-bd">
            <div class="select-item"
                 @click="tabCourseCategory(item)"
                 :class="{'current':item.id===courseCategoryId}"
                 v-for="(item,index) in courseCategoryList">{{item.name}}</div>
          </div>
        </div>
        <!--按学分搜索-->
        <slot name="creditSearch"></slot>
      </div>
      <div class="btn-primary" @click="confirm">确定</div>
    </div>
  </div>
  <!--<div class="screening-bar screening-bar-2">
    <div class="screening-info" v-if="skuData && skuData.length > 0">
      <div class="info"><span class="b"> 科目：</span>{{getSkuModelNameByCode('trainingSubject')}}</div>
      <div class="info" v-if="!yearHided"><span class="b"> 年度：</span>{{getSkuModelNameByCode('trainingYear')}}</div>
    </div>
    <a class="filter-btn" @click="toggleStatus">
      <img class="filter" src="../../../../design/images/filter.png" />
      <span>筛选</span>
    </a>
    <div class="select-items-mask" v-show="status" @click="maskClick">
      <div class="cont-box">
        <div  class="select-items-cont">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">培训机构</span>
          </div>
          <div class="select-items-bd select-items-bd-1">
            <div :class="['select-item', tempOrgan.unitId === organ.unitId ? 'current' : '']" v-for="organ in trainingOrgans" :key="organ.unitId" @click="organChange(organ)">{{organ.unitName}}</div>
          </div>
        </div>
        <div  :class="['select-items-cont', index === 0 ? 'select-items-cont-1' : 'select-items-cont-2']" v-for="(item, index) in yearHided ? yearHidedData: skuData" :key="index">
          <div class="select-items-hd">
            <div class="filter-circle"></div>
            <span class="fs30">{{item.name}}</span>
          </div>
          <div class="select-items-bd">
            <div @click="clickSkuItem(item,subItem)"
               :class="['select-item', item.model === subItem.skuPropertyValueId ? 'current': '']" v-for="(subItem) in item.options" :key="subItem.skuPropertyValueId">{{subItem.skuPropertyValueName}}</div>
          </div>
        </div>
      </div>
      <div class="btn-primary" @click="confirm">确定</div>
    </div>
    &lt;!&ndash;selected&ndash;&gt;
    &lt;!&ndash; <div class="screening-items"
         v-show="!hideYear(item)"
         :class="{'selected':currentSkuTab===item.name}"
         v-for="(item,index) in skuData">
      <div class="items-tit" @click="clickSkuTab(item)">{{item.name}}:{{item.modelName}}</div>
      <div class="select-items-box" v-if="currentSkuTab===item.name">
        <div class="mask"></div>
        <div class="box-bd">
          <div class="select-item"
               @click="clickSkuItem(item,subItem)"
               :class="{'current':item.model===subItem.skuPropertyValueId}"
               v-for="(subItem,subIndex) in item.options">{{subItem.skuPropertyValueName}}</div>
        </div>
        <div class="btn-primary" @click="confirm">确定</div>
      </div>
    </div> &ndash;&gt;
  </div>-->


</template>

<style lang="less" scoped>
  .cont-box::-webkit-scrollbar {display:none}
  .sime.select-items-mask-exchange .select-items-bd .select-item{
    overflow:hidden;text-overflow: ellipsis;white-space: nowrap;
  }
</style>

<script>
  import utils from '@/common/util/Utils'
  import constant from '@/global/constants/AppConstant'
  import * as storeTypes from '@/store/types'
//  import * as storeTypes from '../../../store/types'
  export default {
    props: {
      categoryType: {
        type: String
      },
      classType: {
        type: String
      },
      trainingYear: {
        type: String
      }
    },
    data () {
      return {
        isChange: false,
        yearHided: false,
        yearHidedData: [],
        first: true,
        status: false,
        skuData: [],
        currentSkuTab: '',
        // currentOrgan: {},
        skuPropertySearchList: [],
        courseCategoryList: [],
        courseCategoryId: '',
        courseCategoryName: '所有分类'
      }
    },
    computed: {
      isMajorSubject: function () {
        var isMajorSubject = this.skuPropertySearchList.some(function (eachItem, index, arr) {
          return eachItem.valueCode === '专业课'
        })
        return isMajorSubject
      }
    },
    beforeMount () {
      console.log(this,'parent');
      this.getSkuValue()
    },
    methods: {
      bindClass(item){
        if(item.code == "professionalGrade") return "select-items-cont-1"
        if(item.code == "trainingSubject") return ""
        return "select-items-cont-1"
      },
      ifShowCategory() {
        let showCategory = this.skuPropertySearchList.some(function (eachItem, index, arr) {
          return eachItem.valueCode === '专业科目'
        })
        return showCategory
      },
      tabCourseCategory(item) {
        this.courseCategoryName = item.name
        this.courseCategoryId = item.id
      },
//      用SKU来查询课程分类
      getCourseCategoryList (params) {
        this.$store.dispatch(storeTypes.LIST_SALE_COURSE_CATEGORY, params).then((data) => {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.courseCategoryId = ''
            this.courseCategoryName = '所有分类'
            this.courseCategoryList = data.data.list
            if (this.courseCategoryList.length) {
              this.courseCategoryList[0].name = '所有分类'
              this.courseCategoryList[0].id = ''
            }
          } else {
            this.toast('请求失败')
          }
        })
      },
      toggleStatus () {
        this.status = !this.status
      },
      maskClick (e) {
        let targetClass = e.target.getAttribute('class')
        if (targetClass === 'select-items-mask') {
          if (this.isChange) {
            this.getSkuValue()
          }
          this.toggleStatus()
          this.isChange = false
        }
      },
      getSkuModelNameByCode (code) {
        let result
        this.skuPropertySearchList.forEach((data) => {
          if (data.propertyIdCode === code) {
            result = data.valueCode
          }
        })
        return result
      },
      getSkuValue () {
        this.showLoading()
        var that = this
        var type = 'get'
        var url = 'mobile/home/mobileCommodity/listSkuProperty'
        var findClassListUrl = ''
        var param = {
          categoryType: that.categoryType,
          trainingClassType: that.classType,
          propertyQueries: []
        }
        return new Promise((resolve) => {
          utils.getAjaxData(type, param, url).then(function (res) {
            that.hideLoading()
            that.skuData = res.data;
            that.skuPropertySearchList = [];
            let yearPropertyId = utils.findItem(that.skuData, 'code', 'trainingYear') ? utils.findItem(that.skuData, 'code', 'trainingYear').skuPropertyId : ''
//          自主选课SKU
//          年度使用从上一个页面传进来的年度
//          非年度的sku默认选中的是defaultValue为true的那一项如果没有就是选中第一个
            that.skuData.forEach(function (item) {
              let propertyId = ''
              let propertyIdCode = ''
              let model = ''
              let modelName = ''
              if (item.code === 'trainingYear') {
                console.log(that.trainingYear);
                propertyIdCode = 'trainingYear'
                propertyId = yearPropertyId
                let yearItem = utils.findItem(item.options, 'skuPropertyValueName', that.trainingYear)
                model = yearItem === undefined ? '' : yearItem.skuPropertyValueId
                modelName = that.trainingYear
              } else {
                propertyIdCode = item.code
                propertyId = item.skuPropertyId
                let itemDefault = utils.findItem(item.options, 'defaultValue', true)
                if (itemDefault) {
                  model = itemDefault.skuPropertyValueId
                  modelName = itemDefault.skuPropertyValueName
                } else {
                  model = item.options[0] ? item.options[0].skuPropertyValueId : ''
                  modelName = item.options[0] ? item.options[0].skuPropertyValueName : ''
                }
                //              如果URL地址上有传来科目
                if (item.code === 'trainingSubject') {
                  let subjectValue = that.$route.query.subjectValue
                  let subjectName = that.$route.query.subjectName
                  if (subjectValue) {
                    model = subjectValue
                    modelName = subjectName
                  }
                }
                //              如果URL地址上有传来专业等级
                if (item.code === 'professionalGrade') {
                  let majorValue = that.$route.query.majorValue
                  let majorName = that.$route.query.majorName
                  if (majorValue) {
                    model = majorValue
                    modelName = majorName
                  }
                }
              }
              //            动态加进来的要$set
              that.$set(item,'model',model);
              that.$set(item,'modelName',modelName);
              that.skuPropertySearchList.push({
                propertyId: propertyId,
                propertyIdCode: propertyIdCode,
                value: model,
                valueCode: modelName
              });
            })
            console.log(that.skuPropertySearchList,'sku~~');
            that.getCourseCategoryList({skuPropertyList: that.skuPropertySearchList})
            if (that.first) {
              findClassListUrl = constant.apiUrl.classListModule.self
              that.refreshClassList({pageNo: 1, pageSize: 10, skuPropertyList: that.skuPropertySearchList, trainingClassType: that.classType},findClassListUrl)
              that.first = false
            }
            console.log(that.skuData)
            resolve(true)
          }).catch(function (e) {
            resolve(false)
            console.log(e)
          })
        })
      },
      refreshClassList: function (params,url) {
        this.$emit('findClassList', params,url)
      },
      confirm: function () {
        // 当前机构改变时要触发另外两个tab的机构也改变
        this.toggleStatus()
        this.isChange = false
        var url = ''
        var param = {skuPropertyList: this.skuPropertySearchList, pageNo: 1, pageSize: 10, trainingClassType: this.classType}
        if (this.courseCategoryId) {
          param.courseCategoryId = this.courseCategoryId
        }
        this.currentSkuTab = '';
        url = constant.apiUrl.classListModule.self
        this.$emit('findClassList',param,url)
      },
      clickSkuItem: function (item, subItem) {
        if (item.model === subItem.skuPropertyValueId) {
          return false
        }
        item.model = subItem.skuPropertyValueId;
        item.modelName = subItem.skuPropertyValueName;
        var skuPropertyId = item.skuPropertyId;
        var index = utils.findIndex(this.skuPropertySearchList, 'propertyId', skuPropertyId);
        if (index !== null) {
          this.skuPropertySearchList[index].value = subItem.skuPropertyValueId
          this.skuPropertySearchList[index].valueCode = subItem.skuPropertyValueName
        }
        this.getCourseCategoryList({skuPropertyList: this.skuPropertySearchList})
      }
    }
  }
</script>
