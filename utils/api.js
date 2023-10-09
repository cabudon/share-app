// 后端接口基础地址
export const BASE_API_URL ='http://localhost:8000';

// 各服务基础地址
export const USER_URL=BASE_API_URL+'/user-service/user';
export const SHARE_URL =BASE_API_URL+'/content-service/share';

// 首页相关接口
// 分享列表
export const SHARE_LIST_URL=SHARE_URL+'/list';
// 最新公告
export const LATEST_NOTICE_URL=SHARE_URL+'/notice';

// 投稿相关接口


// 我的相关接口
// 登录
export const LOGIN_URL=USER_URL+'/login';