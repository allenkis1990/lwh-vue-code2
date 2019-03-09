<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">[2018年度]自主兑课</div>
      <div class="header-right3">
        <a href="#">进入智能兑课</a>
      </div>
    </div>
    <!--标题栏-->
    <!--筛选-->
    <div class="select-items-mask-exchange">
      <div class="cont-box">
        <div  class="select-items-cont">
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
        </div>
      </div>
      <div class="btn-primary">确定</div>
    </div>
    <!--/筛选-->

  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
