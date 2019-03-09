import Global from '@/global/global'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: function () {
        let isWeixin = Global.isWeiXin()
        if (isWeixin) {
          return '/authLogin'
        } else {
          return '/authLoginH5'
        }
      }
    },
    {
      path: '/demo',
      component: () => import('@/views/Base.vue'),
      children: [
        // {path: 'home', name: 'Home', component: () => import(Home, meta: { keepAlive: true }},
        {
          path: 'newHome',
          name: 'newHome',
          component: () => import('../views/home/NewHome.vue')
        },
        {
          path: 'category',
          component: () => import('@/views/category/Category')
        },
        {
          path: 'center',
          component: () => import('@/views/center/Center')
        },
        // {path: 'myClass', component: () => import(MyClass},
        {
          path: 'mine',
          component: () => import('@/views/account/Mine')
        },
        {
          path: 'cerList',
          component: () => import('../views/certificate/TrainingCertificate')
        },
        {
          path: 'shoppingCart',
          component: () => import('@/views/shoppingCart/shoppingCartNew.vue')
        },
        {
          path: 'courseSelectionTrain',
          component: () => import('@/views/courseSelectionTrain/courseSelectionTrain')
        },
        {
          path: 'studyCenter',
          component: () => import('@/views/studyCenter/studyCenter')
        }
      ]
    },
    {path: '/noticeList', component: () => import('../views/home/Notice.vue')},
    {path: '/coursePlay', component: () => import('../views/cousePlay/CoursePlay.vue')},
    {path: '/noticeDetail', component: () => import('../views/home/NoticeDetail.vue')},
    {path: '/test/PulldownPullup', component: () => import('@/views/home/PulldownPullup')},
    // OrderModule
    {path: '/moreSubOrderList', name: 'moreSubOrderList', component: () => import('@/views/order/MoreSubOrderList')},
    {path: '/orderDetail', component: () => import('@/views/order/OrderDetail')},
    {path: '/refundSubmit', component: () => import('@/views/order/refundSubmit')},
    {path: '/refundDetail', component: () => import('@/views/order/refundDetail')},
    {path: '/confirmPayOrder', component: () => import('../views/order/ConfirmPayOrder')},
    {path: '/orderPaidSuccess', component: () => import('@/views/order/OrderPaidSuccess')},
    {path: '/H5OrderPagePaidSuccess', component: () => import('@/views/order/H5OrderPagePaidSuccess')},
    {path: '/refundLog', component: () => import('@/views/order/RefundLog')},
    {path: '/statusChange', component: () => import('@/views/order/StatusChangeLog')},
    {path: '/statusChangeRefund', component: () => import('@/views/order/refundDetailStatus')},
    {path: '/trainingChangeLog', component: () => import('@/views/order/TrainingChangeLog')},
    {path: '/createOrder', name: 'createOrder', component: () => import('../views/order/CreateOrder/CreateOrder')},
    {path: '/orderPay', name: 'orderPay', component: () => import('../views/order/CreateOrder/OrderPay')},
    {path: '/configInvoiceInfo', component: () => import('../views/order/CreateOrder/ConfigInvoiceInfo')},
    {path: '/configInvoiceDeliver', component: () => import('../views/order/CreateOrder/ConfigInvoiceDeliver')},
    // {path: '/configCerDeliver', component: () => import(ConfigCerDeliver},
    {path: '/completeOrder', component: () => import('../views/order/CompleteOrder/CompleteOrder')},
    {
      path: '/configCompleteInvoiceInfo',
      component: () => import('../views/order/CompleteOrder/ConfigCompleteInvoiceInfo')
    },
    {
      path: '/configCompleteInvoiceDeliver',
      component: () => import('../views/order/CompleteOrder/ConfigCompleteInvoiceDeliver')
    },
    // {path: '/configCompleteCerDeliver', component: () => import(ConfigCompleteCerDeliver},
    // OtherModule
    {path: '/login', name: 'Login', component: () => import('../views/account/Login')},
    {path: '/loginByPassword', name: 'LoginByPassword', component: () => import('../views/account/LoginByPassword')},
    {path: '/regiter', component: () => import('../views/account/Register.vue'), meta: {keepAlive: false}},
    {path: '/classDetail', name: 'classDetail', component: () => import('../views/home/classDetail/ClassDetail.vue')},
    {path: '/myClassDetail', component: () => import('../views/my-class/MyClassDetail.vue')},
    {path: '/forgotPassword', component: () => import('../views/account/ForgotPassword.vue')},
    {path: '/forgotPasswordSuccessful', component: () => import('../views/account/ForgotPassword_successful.vue')},
    {path: '/authLogin', component: () => import('../views/common/AuthLogin.vue')},
    {path: '/authLoginH5', component: () => import('../views/common/AuthLoginH5.vue')},
    {path: '/personalInfo', component: () => import('@/views/account/PersonalInfo')},
    {path: '/changePassword', component: () => import('@/views/account/ChangePassword')},
    {path: '/receiptInformation', component: () => import('@/views/account/ReceiptInformation')},
    {path: '/receiptInformationEdit', component: () => import('@/views/account/ReceiptInformationEdit')},
    {path: '/certificateDetail', component: () => import('../views/certificate/CertificateDetail.vue')},
    {path: '/agreement', component: () => import('../views/Account/Agreement.vue'), meta: {keepAlive: false}},
    {path: '/newAgreement', component: () => import('../views/Account/NewAgreement.vue')},
    {path: '/setNewPassword', component: () => import('../views/Account/SetNewPassword')},
    {path: '/perfectInfomation', component: () => import('@/views/Account/PerfectInfomation')},
    {path: '/changeTelephoneNum', component: () => import('@/views/account/ChangeTelephoneNum')},
    {path: '/echartsTest', component: () => import('@/views/echarts-test/echarts-test')},
    {path: '/courseYearSituation', component: () => import('../views/account/PersonalCenter_Situation.vue')},
    {
      path: '/selfSelectCourse',
      component: () => import('@/views/courseSelectionTrain/selfSelectCourse/selfSelectCourse'),
      meta: { keepAlive: true }
    },
    {
      path: '/helpMeSelectCourse',
      component: () => import('@/views/courseSelectionTrain/helpMeSelectCourse/helpMeSelectCourse')
    },
    {path: '/selectCourseRecord', component: () => import('@/views/selectCourseRecord/selectCourseRecord')},
    {path: '/compulsoryCourseList', component: () => import('@/views/compulsoryCourse/Compulsory_course_view.vue')},
    {path: '/orderList', component: () => import('@/views/order/OrderList.vue')},
    {path: '/saveOrderInvoice', component: () => import('@/views/order/CreateOrder/SaveOrderInvoice')},
    {path: '/applyRefund', component: () => import('@/views/refund/applyRefund.vue')},
    {path: '/refundDetail', component: () => import('@/views/refund/refundDetail.vue')},
    {path: '/refundSituation', component: () => import('@/views/refund/refundSituation.vue')}
  ]
})

export default router
