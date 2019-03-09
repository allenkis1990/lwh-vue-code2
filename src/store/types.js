// --------------------------------------------------------------------------
// 网络常量
export const BASEURL = 'http://192.168.29.253:3000/'

// --------------------------------------------------------------------------

export const NETWORK_RESULT_SUCCESS = 200  // 请求成功
export const NETWORK_RESULT_FAIL = 600 // 请求失败

// 定义 getter、action、和 mutation 的名称为常量，以模块名  为前缀
// export const DEMO_SET_SERVERHOST = 'demo/setServerHost'
export const SHOW_OR_HIDE_FOOTTER_NAV = 'SHOW_OR_HIDE_FOOTTER_NAV'
export const GLOBAL_CHANGENAV = 'global/changeNav'
export const GLOBAL_SET_CURRENTUSER = 'global/setCurrentUser' // 设置用户信息
export const GLOBAL_UPDATE_LOADING = 'global/updateLoadingStatus' // 更新加载状态
export const GLOBAL_SET_TITLE = 'global/setTitle' // 设置标题栏内容
export const GLOBAL_SET_DRAWER = 'global/setDrawer' // 设置菜单栏是否显示
export const CATEGORY_TEST_REQUIRE = 'category/test'
export const GLOBAL_ADD_LOADING = 'global/addLoading'
export const GLOBAL_REMOVE_LOADING = 'global/removeLoading'
export const GLOBAL_GET_AREA_INFO = 'global/getAreaInfo' // 获取地区信息
export const GLOBAR_LOGIN_SET = 'global/setLogin'

export const GLOBAR_GET_SERVE_CONTEXT = 'global/getServeContext' // 获取能力层参数
export const GLOBAR_SET_SERVE_CONTEXT = 'global/setServeContext' // 获取能力层参数
// =======订单模块===============
export const ORDER_UNCOMPLETED_ORDER_REQUEST = 'order/unCompletedOrder'  // 请求是否有未完善的订单
export const ORDER_UNCOMPLETED_ORDER_STATE = 'order/umCompletedOrderState' // 赋值未完善的订单状态
export const ORDER_GET_ORDERLIST = 'order/getOrderList' // 获取订单列表
export const ORDER_SET_ORDERLIST = 'order/setOrderList' // 设置订单列表
export const ORDER_GET_ORDERLIST_REFUNDE = 'order/getOrderListRefunde' // 获取退款订单列表
export const ORDER_SET_ORDERLIST_REFUNDE = 'order/setOrderListRefunde' // 设置退款订单列表
export const ORDER_GET_JUDGE_REFUNDE = 'order/getJudgeRefunde' // 获取该订单是否能退款
export const ORDER_GET_SUBMIT_REFUNDE = 'order/getSubmitRefunde' // 获取该订单退款
export const ORDER_GET_REASON_LIST = 'order/getReasonList' // 获取退款理由
export const ORDER_GET_SUBMIT_CANCEL_REFUNDE = 'order/getSubmitCancelRefunde' // 取消申请退款
export const ORDER_SET_ISREFEASHCLOSEORDERLISTDATA = 'order/isRefreshCloseOrderListData' // 是否重新刷新订单关闭页数据
export const ORDER_CLEAR_LISTDATA = 'order/clearListData' // 清空列表数据
export const ORDER_CLEAR_LISTDATA_REFUNDE = 'order/clearListDataRefunde' // 清空退款数据
export const ORDER_CANCEL_ORDER = 'order/cancelOrder'     // 取消订单
export const ORDER_GET_ORDER_DETAIL = 'order/getOrderDetail'  // 获取订单详情
export const ORDER_SET_ORDER_DETAIL = 'order/setOrderDetail'  // 设置订单详情
export const ORDER_GET_ORDER_REFUND_ETAIL = 'order/getOrderRefundDetail'  // 获取订单详情
export const ORDER_SET_ORDER_REFUND_ETAIL = 'order/setOrderRefundDetail'  // 获取订单详情
export const ORDER_SET_CURRENT_ORDER = 'order/setCurrentOrder' // 设置当前订单信息
export const ORDER_GET_REFUND_LOG = 'order/getRefundLog' // 获取订单退款记录
export const ORDER_SET_REFUND_LOG = 'order/setRefundLog' // 设置订单退款记录
export const ORDER_GET_CHANGE_LOG = 'order/getTrainingChangeLog' // 获取换班记录
export const ORDER_SET_CHANGE_LOG = 'order/setTrainingChangeLog' // 设置换班记录
export const ORDER_GET_NEED_COMPLETE_ORDER_LIST = 'order/getNeedCompleteOrderList'      // 获取未完善配送信息订单列表
export const ORDER_SET_NEED_COMPLETE_ORDER_LIST = 'order/setNeedCompleteOrderList'      // 设置未完善配送信息订单列表
export const ORDER_SET_ORDEREMAIL = 'order/setOrderEmail'      // 设置订单的邮箱
export const ORDER_INVOICE_TEXT = 'order/orderInvoiceText'
export const ORDER_INVOICE_DER_TEXT = 'order/orderInvoiceDerText'
// 创建订单信息
export const ORDER_GET_CREATE_CONFIG_SETTING = 'order/getCreateConfigSetting'                        // 获取创建/完善订单前配置信息
export const ORDER_CREATE_ORDER = 'order/createOrder'                                   // 创建订单
export const ORDER_SET_CREATE_TEMP_INVOICE_INFO = 'order/setCreateTempInvoiceInfo'      // 设置创建订单时发票内容及配送临时信息
export const ORDER_SET_CREATE_TEMP_CER_INFO = 'order/setCreateTempCerInfo'              // 设置创建订单时证书内容及配送临时信息
export const GET_STUDENT_ORDER_TIP_INFO = 'GET_STUDENT_ORDER_TIP_INFO'                  // 登录成功后订单信息判断

// 完善订单信息
export const ORDER_GET_COMPLETE_CONFIG_SETTING = 'order/getCompleteConfigSetting'
export const ORDER_COMPLETE_ORDER = 'order/completeOrder'                               // 完善订单
export const ORDER_SET_COMPLETE_TEMP_INVOICE_INFO = 'order/setCompleteTempInvoiceInfo'  // 设置完善订单时发票内容及配送临时信息
export const ORDER_SET_COMPLETE_TEMP_CER_INFO = 'order/setCompleteTempCerInfo'          // 设置完善订单时证书内容及配送临时信息
// 订单支付
export const ORDER_GET_ORDER_PAY_INFO = 'order/getWeiXinPayInfo'                         // 获取订单微信支付内容
export const ORDER_GET_ORDER_WXH5_PAY_INFO = 'order/getWeiXinH5PayInfo'                  // 获取订单微信H5支付内容
export const ORDER_GET_ORDER_AliH5_PAY_INFO = 'order/getAliH5PayInfo'                     // 获取订单支付宝H5支付内容
export const ORDER_GET_CONFIRM_PAYORDER = 'order/getOrderPayInfo'                       // 获取确认支付订单信息
export const ORDER_SET_ORDER_PAYINFO = 'order/setOrderPayInfo'                          // 设置确认支付订单信息
export const CREATE_ORDER_NEED_INVOICE = 'order/createOrderNeedInvoice'
export const COMPLETE_ORDER_NEED_INVOICE = 'order/completeOrderNeedInvoice'
export const ORDER_GET_ELETRON_INVOICE_URL = 'order/getEletronInvoiceUrl'     // 获取电子发票pdf的url
// =======订单模块之配送===============
export const ORDER_GET_SELF_PICK_ADDRESS = 'order/getSelfPickAddress' // 获取自取地址信息
// =======班级模块分类===============
export const CATEGORY_TEST_REQUEST = 'category/test'
export const CLASS_YEARS_REQUEST = 'class/years'                            // 请求班级年度
export const CLASS_YEARS_SET = 'class/setYears'                             // 赋值班级年度
export const CLASS_MYLIST_REQUEST = 'class/myclassList'                     // 请求我的班级列表
export const CLASS_MYLIST_SET = 'class/setMyClassList'                      // 赋值我的班级列表
export const CLASS_LIST_SEARCH_PROPERTY = 'class/searchProperty'            // 班级列表的请求条件
export const CLASS_INFO_REQUEST = 'class/info'                             // 请求班级信息
export const COURSE_INFO_REQUEST = 'class/courseInfo'                             // 请求课程信息
export const COURSE_POOLLIST_REQUEST = 'class/coursePoolList'                             // 请求课程包信息
export const POOL_COURSE_LIST_REQUEST = 'class/PoolCourseList'                             // 请求课程包下的课程信息
export const COURSE_CHAPTERLIST_REQUEST = 'class/courseChapterList'                             // 请求课程章节信息
export const CLASS_INFO_SET = 'class/setInfo'                               // 赋值班级信息
export const COURSE_INFO_SET = 'class/setCourseInfo'                               // 赋值班级信息
export const CLASS_BUY_JUDGE = 'class/bugJudge'                             // 判断是否可以购买
export const CLASS_ADD_SHOPPING_CART = 'class/addShoppingCart'                             // 加入购物车
export const CLASS_ASSESSMENT_INFO_REQUEST = 'class/assessmentInfo'         // 请求班级考核要求
export const CLASS_ASSESSMENT_INFO_SET = 'class/setAssessmentInfo'          // 赋值班级考核要求
export const CLASS_COURSE_LIST_REQUEST = 'class/courseList'                 // 请求班级课程列表
export const CLASS_COURSE_LIST_SET = 'class/setCourseList'                  // 赋值班级课程列表
export const CLASS_SELECTED_COURSEWRAP_LIST_REQUEST = 'class/selectedCourseWrapList'   // 获取选修包的列表
export const CLASS_SELECTED_COURSEWRAP_LIST_SET = 'class/setSelectedCourseWrapList'    // 赋值选修包的列表
export const CLASS_SELECTED_COURSE_LIST_REQUEST = 'class/selectedCourseList'           // 获取选修课程列表
export const CLASS_OPTION_COURSE_LIST_REQUEST = 'class/optionCourseList'               // 获取选修课程列表信息
export const CLASS_SELECTED_COURSE_LIST_SET = 'class/setSelectedCourseList'            // 赋值选修课程列表
export const CLASS_DETAIL_TRAINING_ITEM = 'class/classDetailTrainingItem'
export const SET_IS_FROM_SHOPCART = 'class/setIsFromShopCart'
export const GET_LINEOFF_CLASS_DETAIL = 'class/getLineOffClassDetail' // 获取面授班详情
export const GET_LINEOFF_CLASS_DIRECTORY = 'class/getLineOffClassDirectory' // 获取面授班目录列表
// ==========商品模块====================
export const PRODUCE_CLASS_YEARS_REQUEST = 'produce/classYears'                       // 请求班级年度
export const PRODUCE_CLASS_YEARS_SET = 'produce/setClassYears'                        // 赋值班级年度
export const PRODUCE_CLASS_LIST_REQUEST = 'produce/classList'                         // 请求班级列表
export const PRODUCE_CLASS_LIST_SET = 'produce/setClassList'                          // 赋值班级的列表
export const PRODUCE_CLASS_LIST_SEARCH_PROPERTY = 'produce/searchProperty'            // 班级列表的请求条件
export const PRODUCT_GET_DETAIL_INFO = 'produce/getDetailInfo'                         // 获取商品详细信息
export const PRODUCT_CLASS_DETAIL_INFO_REQUEST = 'produce/getClassDetailInfo'          // 获取商品班级详情信息
export const PRODUCT_CLASS_DETAIL_INFO_SET = 'produce/setClassDetailInfo'              // 赋值商品班级详情信息
export const PRODUCT_CLASS_COURSEWRAP_LIST_REQUEST = 'produce/getCourseWrapList'       // 获取课程包列表
export const PRODUCT_CLASS_COURSEWRAP_LIST_SET = 'produce/setCourseWrapList'           // 赋值课程包列表
export const PRODUCT_CLASS_COURSELIST_REQUEST = 'produce/getCourseList'               // 获取课程列表
export const PRODUCT_CLASS_COURSELIST_SET = 'produce/setCourseList'                    // 赋值课程列表

// ==========账户模块====================
export const ACCOUNT_WX_HASBIND_REQUEST = 'account/wxHasBind'                // 获取是否绑定微信
export const SET_FROM_REGIST = 'SET_FROM_REGIST'                // 是从注册成功后登录过来的
export const ACCOUNT_GET_EDUCATION_YEAR = 'account/getEducationYear' //获取继续教育年度
export const ACCOUNT_GET_EDUCATION_CREDIT_SITUATION = 'account/getEducationCreditYear'//获取年度学分情况
export const ACCOUNT_WX_INFO_REQUEST = 'account/wxInfo'                     // 获取微信openId和unionId
export const ACCOUNT_WX_APPID_REQUEST = 'account/wxAppId'                   // 获取微信appId
export const ACCOUNT_WX_APPID_SET = 'account/setWxAppId'                    // 赋值微信appId
export const ACCOUNT_WX_INFO_SET = 'account/setWxInfo'                      // 赋值微信openId和unionId
export const ACCOUNT_GET_USERINFO = 'account/getUserInfo'                   // 获取用户信息
export const ACCOUNT_IS_LOGIN = 'ACCOUNT_IS_LOGIN'                   // 是否登录
export const ACCOUNT_SET_USERINFO = 'account/setUserInfo'                   // 赋值用户信息
export const ACCOUNT_UPDATE_USERINFO = 'account/upfateUserInfo'             // 更新用户信息
export const ACCOUNT_BIND_WX = 'account/bindWX'                             // 绑定微信号
export const ACCOUNT_GET_IMAGEVALIDATECODE = 'account/getImageValidateCode' // 获取图形验证码
export const ACCOUNT_SET_VALIDATEIMAGEURL = 'account/setValidateImageUrl'   // 保存图形验证码图片地址
export const ACCOUNT_GET_SMSVALIDATECODE = 'account/getSmsValidateCode'     // 获取手机验证码
export const ACCOUNT_CHANGE_PASSWORD = 'account/changePassword'             // 修改手机密码
export const ACCOUNT_RESET_PASSWORD = 'account/resetPassword'               // 修改手机密码
export const ACCOUNT_CHANGE_TELEPHONENUM = 'account/changeTelephone'        // 换绑手机号
export const ACCOUNT_TEL_VARLIDATECODE_REQUEST = 'account/telVarlidateCode '// 获取手机验证码
export const ACCOUNT_REGISTER_REQUEST = 'account/register'                  // 注册
export const ACCOUNT_VALIDATACODE_IMG_REQUEST = 'account/validataCodeImg'   // 请求图形验证
export const ACCOUNT_VALIDATACODE_IMG_SET = 'account/setValidataCodeImg'    // 赋值图形验证
export const ACCOUNT_RESET_PASSWORD_REQUEST = 'account/resetPassword'       // 重置密码
export const SET_NEW_PASSWORD = 'account/setNewPassword'       // 设置新密码
export const ACCOUNT_GET_RECEIPTINFO = 'account/getReceiptInfo'             // 获取收货地址信息
export const ACCOUNT_SET_RECEIPTINFO = 'account/setReceiptInfo'             // 保存用户收货地址信息
export const ACCOUNT_UPDATE_RECEIPTINFO = 'account/updateReceiptInfo'       // 修改收货地址信息
export const ACCOUNT_GET_REGIONDATA = 'account/getRegionData'               // 获取省市县数据
export const ACCOUNT_SET_REGIONDATA = 'account/setRegionData'               // 保存省市县数据
export const ACCOUNT_HASBIND_WEIXIN_REQUEST = 'account/hasBindWeiXin'       // 请求微信公众号是否已绑定
export const ACCOUNT_CHECK_REGISTE_REQUEST = 'account/checkRegiste'         // 请求账号是否可用
export const ACCOUNT_HAS_BIND_WX = 'account/haveBindWx'                     // 账号是否绑定微信
export const CHECK_ACCOUNT = 'account/checkAccount'                     // 校验账号合法性
export const ACCIYBT_EXIT = 'account/exit'                                  // 账号退出
export const IDCART_TEL_VALIDATE = 'account/idcardTelValidate'
export const UPDATE_USER_HAS_SEE_AGREEMENT = 'account/updateHasSeeNewAgreement' // 修改是否查看过新协议字段
export const GET_ALL_ORGAN = 'account/getAllOrgan' // 获取所有培训机构
export const SET_ALL_ORGAN = 'account/setAllOrgan' // 储存所有培训机构
export const GET_SMS_CODE = 'account/getSmsCode' // 获取短信验证码
// ==========微信模块====================
export const GLOBAR_WEIXIN_CALLBACK_URL_SET = 'weixin/setWeiXinCallBackUrl'   // 赋值微信的回调地址
export const GLOBAL_WEIXIN_ACCESS_TOKEN_REQUEST = 'weixin/weixin/accessToken' // 请求access_token
export const GLOBAL_WEIXIN_ACCESS_TOKEN_SET = 'weixin/weixin/setAccessToken'  // 赋值access_token
export const GLOBAL_WEIXIN_USER_INFO_REQUEST = 'weixin/weixin/userInfo'       // 请求微信用户信息
export const GLOBAL_WEIXIN_USER_INFO_SET = 'weixin/setUserInfo'               // 赋值微信用户信息

//  ==========登录====================
export const LOGIN_LOGIN = 'login/login'
export const LOGIN_REQUEST = 'login/loginRequest'
export const LOGIN_ADD_LOADING = 'login/addLoading'                              // 添加加载状态
export const LOGIN_REMOVE_LOADING = 'login/removeLoading'                        // 减除加载状态
export const INIT_CAS_REQUEST = 'login/initCasRequest'                        // 获取账号密码登录的cas
export const INIT_CAS = 'login/initCas'                        // 获取账号密码登录的cas
//
//  ==========证明模块
export const CER_REQUEST_CER_LIST = 'CER_REQUEST_CER_LIST' // 请求证明列表
export const CER_REQUEST_CER_DETAIL = 'CER_REQUEST_CER_DETAIL'  // 请求证明详情
export const IS_FIRST_SEE_CER = 'IS_FIRST_SEE_CER'  // 请求证明详情
export const CAN_PRINT_CER = 'CHECK_CER_STATE'  // 查看证明状态

//  ==========首页相关口
export const HOME_GET_MSG = 'HOME_GET_MSG' // 请求证明列表
export const HOME_GET_MSG_DETAIL = 'HOME_GET_MSG_DETAIL' //请求证明详情
export const HOME_SAVE_MSGTYPE = 'HOME_SAVE_MSGTYPE' // 保存type
//  ==========选课培训相关口
export const SELECT_TRAIN_HELPLIST = 'SELECT_TRAIN_HELPLIST' // 帮我选课结果列表
export const SELECT_COURSE_RECORD = 'SELECT_COURSE_RECORD' // 获取选课记录列表
export const LIST_SALE_COURSE_CATEGORY = 'LIST_SALE_COURSE_CATEGORY' // 获取课程分类
export const SELECT_COURSE = 'SELECT_COURSE' // 选课
export const SELECT_COURSE_RECOMMEND = 'SELECT_COURSE_RECOMMEND' // 获取快速选课推荐
export const GET_SELF_SKU_LIST = 'GET_SELF_SKU_LIST' // 获取自主选课SKU
export const GET_CREDIT_SITUATION = 'GET_CREDIT_SITUATION' // 获取学分购买情况
export const GET_ALL_ORDER_YEAR = 'GET_ALL_ORDER_YEAR' // 获取学分年度
export const YEAR_LEARN_SITUATION = 'YEAR_LEARN_SITUATION' // 获取学分年度
export const CHECK_OPEN_BUY_CREDIT = 'CHECK_OPEN_BUY_CREDIT' // 校验当前年度是否开放学分购买
export const JUDGE_ENTER_SELFSELECT_COURSE = 'JUDGE_ENTER_SELFSELECT_COURSE' // 进入自主选课的前置判断

//  ==========选课清单相关
export const GET_SHOPPINGCART_LIST = 'GET_SHOPPINGCART_LIST' // 选课清单列表
export const ADD_SHOPPINGCART = 'ADD_SHOPPINGCART' // 加入选课清单
export const CLEAR_SHOPPINGCART_DISABLED = 'CLEAR_SHOPPINGCART_DISABLED' // 清除失效商品
export const DELETE_SHOPPINGCART_GOODS = 'DELETE_SHOPPINGCART_GOODS' // 删除购物车商品
export const COUNT_SHOPPINGCART_CREDIT = 'COUNT_SHOPPINGCART_CREDIT' // 获取购物车中某个年度选课数据汇总
export const COUNT_SHOPPINGCART_TOTALCREDIT = 'COUNT_SHOPPINGCART_TOTALCREDIT' // 获取购物车中学分汇总
//  ==========课程详情播放相关
export const COURSE_PLAY_COURSE_DETAIL = 'COURSE_PLAY_COURSE_DETAIL' // 请求课程详情
export const COURSE_PLAY_COURSE_Directory_List = 'COURSE_PLAY_COURSE_Directory_List' // 请求课程目录
export const COURSE_PLAY_MSG = 'COURSE_PLAY_MSG' // 请求课程目录//  ==========订单中--必修课============
export const ORDER_GET_COMPULSORY_COURSE_MSG = 'order/compulsoryCourseMsg'                    // 获取必修课程相关信息
export const ORDER_SET_COMPULSORY_COURSE_MSG = 'order/setCompulsoryCourseMsg'                      // 赋值必修课程相关信息
export const ORDER_GET_COMPULSORY_COURSE_TYPE = 'order/compulsoryCourseType'                 //获取必修课程类型口

export const ORDER_CHECK_STUDENT_PAY_ORDER = 'order/checkStudentPayOrder'                    // 校验必修课程学分是否大于购买订单学分（是否能支付）
export const ORDER_GET_COMPULSORY_COURSE_CONFIG = 'order/getCompulsoryCourseConfig'                    // 获取必修课信息
export const ORDER_SET_COMPULSORY_COURSE_CONFIG = 'order/setCompulsoryCourseConfig'                    // 存储必修课信息
export const ORDER_SAVE_SELECT_CREDIT = 'order/saveSelectCredit'                      // 保存选中学分

