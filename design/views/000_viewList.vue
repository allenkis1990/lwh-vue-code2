<template>
  <div class="contain">
    <div class="view-list">
      <a href="http://127.0.0.1:9002/?page=viewList2">会计H5页面导航</a>
      <a href="http://127.0.0.1:9002/?page=login_fail">001-登录失败</a>
      <a href="http://127.0.0.1:9002/?page=home">001-首页</a>
      <a href="http://127.0.0.1:9002/?page=home_tel_dialog">001-首页-电话弹窗</a>
      <a href="http://127.0.0.1:9002/?page=guide">001-引导</a>
      <a href="http://127.0.0.1:9002/?page=guide2">001-引导-培训流程</a>
      <a href="http://127.0.0.1:9002/?page=notice">002-培训通知</a>
      <a href="http://127.0.0.1:9002/?page=notice_nodata">002-培训通知-无数据</a>
      <a href="http://127.0.0.1:9002/?page=notice_detail">002-培训通知-详情</a>
      <a href="http://127.0.0.1:9002/?page=kj_login">003-登录</a>
      <a href="http://127.0.0.1:9002/?page=kj_registered">003-注册</a>
      <a href="http://127.0.0.1:9002/?page=kj_registered_info">003-帐号信息</a>
      <a href="http://127.0.0.1:9002/?page=kj_registered_dialog1">003-注册弹窗1</a>
      <a href="http://127.0.0.1:9002/?page=kj_registered_dialog2">003-注册弹窗2</a>
      <a href="http://127.0.0.1:9002/?page=kj_registered_dialog3">003-注册弹窗3</a>
      <a href="http://127.0.0.1:9002/?page=kj_registered_dialog4">003-注册弹窗4</a>
      <a href="http://127.0.0.1:9002/?page=kj_password01">003-忘记密码01</a>
      <a href="http://127.0.0.1:9002/?page=kj_password02">003-忘记密码02</a>
      <a href="http://127.0.0.1:9002/?page=kj_password_dialog1">003-设置密码弹窗1</a>
      <a href="http://127.0.0.1:9002/?page=kj_password_dialog2">003-设置密码弹窗2</a>
      <a href="http://127.0.0.1:9002/?page=kj_password_dialog3">003-设置密码弹窗3</a>
      <a href="http://127.0.0.1:9002/?page=kj_entry_dialog1">004-登录判断弹窗1</a>
      <a href="http://127.0.0.1:9002/?page=kj_entry_dialog2">004-登录判断弹窗2</a>
      <a href="http://127.0.0.1:9002/?page=kj_entry_dialog3">004-登录判断弹窗3</a>
      <a href="http://127.0.0.1:9002/?page=kj_entry_dialog4">004-登录判断弹窗4</a>
      <a class="bg-red" href="http://127.0.0.1:9002/?page=kj_courseSelectionTraining">005-选课培训</a>
      <a href="http://127.0.0.1:9002/?page=kj_courseSelectionTraining_self">005-自主选课</a>
      <a href="http://127.0.0.1:9002/?page=kj_courseSelectionTraining_quick">005-快速选课弹窗</a>
      <a href="http://127.0.0.1:9002/?page=kj_courseSelectionTraining_helpme">005-帮我快速选课</a>
      <a href="http://127.0.0.1:9002/?page=kj_courseSelectionTraining_helpme_view">005-帮我快速选课-显示</a>
      <a href="http://127.0.0.1:9002/?page=kj_classDetail_directory">005-课程详情-目录</a>
      <a href="http://127.0.0.1:9002/?page=kj_classDetail_info">005-课程详情-介绍</a>
      <a href="http://127.0.0.1:9002/?page=kj_required_course">005-必修课程报名页</a>
      <a href="http://127.0.0.1:9002/?page=kj_required_course_view">005-必修课程报名页-显示</a>
      <a href="http://127.0.0.1:9002/?page=kj_exchange_screening">005-自主兑课-筛选</a>
      <a href="http://127.0.0.1:9002/?page=kj_exchange_study_qrcode">005-自主兑课-进入我的学习-小程序二维码</a>
      <a href="http://127.0.0.1:9002/?page=kj_tryListen_info">005-课程试听-介绍</a>
      <a href="http://127.0.0.1:9002/?page=kj_tryListen_directory">005-课程试听-目录</a>
      <a href="http://127.0.0.1:9002/?page=kj_exchangepool_empty">006-选课清单(空)</a>
      <a href="http://127.0.0.1:9002/?page=kj_exchangepool">006-选课清单</a>
      <a class="bg-red" href="http://127.0.0.1:9002/?page=kj_confirmOrder">007-确认购买订单</a>
      <a href="http://127.0.0.1:9002/?page=kj_confirmOrder_invoice">007-确认购买订单-发票信息</a>
      <a href="http://127.0.0.1:9002/?page=kj_confirmPay">007-确认支付</a>
      <a href="http://127.0.0.1:9002/?page=kj_paySuccess">007-支付成功</a>
      <a href="http://127.0.0.1:9002/?page=kj_signUpList_noPay">008-学分订单-未支付</a>
      <a href="http://127.0.0.1:9002/?page=kj_credit_dialog">008-学分查看</a>
      <a class="bg-red" href="http://127.0.0.1:9002/?page=kj_signUpList_paid">008-学分订单-已支付</a>
      <a href="http://127.0.0.1:9002/?page=kj_signUpList_close">008-学分订单-交易关闭</a>
      <a class="bg-red" href="http://127.0.0.1:9002/?page=kj_signUpList_refund">008-学分订单-退款</a>
      <a class="bg-red" href="http://127.0.0.1:9002/?page=kj_orderDetail">008-订单详情</a>
      <a href="http://127.0.0.1:9002/?page=kj_orderDetail_status">008-订单详情_更多状态</a>
      <a href="http://127.0.0.1:9002/?page=kj_order_qrcode">008-订单发票_二维码</a>
      <a href="http://127.0.0.1:9002/?page=kj_order_invoice">008-订单发票</a>
      <a class="bg-red" href="http://127.0.0.1:9002/?page=kj_refund_submit">008-申请退款</a>
      <a class="bg-red" href="http://127.0.0.1:9002/?page=kj_refundDetail">008-退款详情</a>
      <a class="bg-red" href="http://127.0.0.1:9002/?page=kj_refundDetail_status">008-退款详情-受理情况</a>
      <a class="bg-red" href="http://127.0.0.1:9002/?page=kj_signUpList_changeRecord">009-选课记录</a>
      <a class="bg-red" href="http://127.0.0.1:9002/?page=kj_signUpList_changeRecord_qrcode">009-选课记录-弹窗二维码</a>
      <a href="http://127.0.0.1:9002/?page=kj_personalCenter">010-学习中心</a>
      <a href="http://127.0.0.1:9002/?page=kj_personalCenter_info">010-学习中心_个人信息</a>
      <a href="http://127.0.0.1:9002/?page=kj_personalCenter_changePhone">010-学习中心_修改手机号</a>
      <a href="http://127.0.0.1:9002/?page=kj_personalCenter_password">010-学习中心_密码修改</a>
      <a class="bg-red" href="http://127.0.0.1:9002/?page=kj_personalCenter_situation">010-学习中心_各年度培训情况</a>
      <a href="http://127.0.0.1:9002/?page=kj_personalCenter_situation_dialog">010-学习中心_各年度培训情况_弹窗</a>
      <a href="http://127.0.0.1:9002/?page=kj_mask_select_box">011-弹出层-底部选择框</a>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

  .view-list{
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
  }
  .view-list a{
    display: block;
    background-color: #666;
    color: #fff;
    padding: 8px 10px;
    font-size: 14px;
    margin-bottom: 10px;
    border-radius: 5px;
    min-width: 220px;
    width:100%;
  }
  a.bg-red{
    background:#ff8800;
  }
</style>
<script>
  require('../styles/webstyle.less')
</script>
