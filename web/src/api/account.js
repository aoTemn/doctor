export default [
  {
    name: 'register',
    method: 'POST',
    desc: '注册',
    path: '/member/register',
  },
  {
    name: 'login',
    method: 'POST',
    desc: '登录',
    path: '/member/login',
  },
  {
    name: 'forgetPwd',
    method: 'POST',
    desc: '忘记密码',
    path: '/member/forgot-password',
  },
  {
    name: 'resetPwd',
    method: 'POST',
    desc: '重设密码',
    path: '/member/reset-password',
  },
  {
    name: 'phoneVerify',
    method: 'POST',
    desc: '手机验证',
    path: '/member/phone-verfication',
  },
  {
    name: 'user',
    method: 'GET',
    desc: '用户信息',
    path: '/member/user',
  },
  {
    name: 'updateUser',
    method: 'POST',
    desc: '更新用户姓名',
    path: '/member/update-user',
  },
  {
    name: 'updateHkid',
    method: 'POST',
    desc: '更新用户IDCard',
    path: '/member/update-hkid',
  },
  {
    name: 'updatePhoneNumber',
    method: 'POST',
    desc: '更新用户电话',
    path: '/member/update-phone-number',
  },
  {
    name: 'resetPassword',
    method: 'POST',
    desc: '重置密码',
    path: '/member/reset-password',
  },
  {
    name: 'logout',
    method: 'POST',
    desc: '登出',
    path: '/member/logout',
  },
];
