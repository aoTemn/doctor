import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { useAccountStore } from '@/store/account';
import { useApplyStore } from '@/store/apply';
// import disclaimers from "@/pages/home/disclaimers.vue";
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/index.vue'),
  },
  {
    path: '/disclaimers',
    name: 'home-disclaimers',
    component: () => import('@/pages/home/disclaimers.vue'),
  },
  {
    path: '/account',
    name: 'account',
    meta: {
      requiresAuth: true,
    },
    component: () => import('@/pages/account/index.vue'),
  },
  {
    path: '/account/register',
    name: 'account-register',
    component: () => import('@/pages/account/register/index.vue'),
  },
  {
    path: '/account/register/code',
    name: 'account-register-code',
    component: () => import('@/pages/account/register/code.vue'),
  },
  {
    path: '/account/register/password',
    name: 'account-register-password',
    component: () => import('@/pages/account/register/password.vue'),
  },
  {
    path: '/account/login',
    name: 'account-login',
    component: () => import('@/pages/account/login.vue'),
  },
  {
    path: '/account/user',
    name: 'account-user',
    component: () => import('@/pages/account/user/index.vue'),
  },
  {
    path: '/account/user/name',
    name: 'account-user-name',
    component: () => import('@/pages/account/user/name.vue'),
  },
  {
    path: '/account/user/id-card',
    name: 'account-user-id-card',
    component: () => import('@/pages/account/user/idCard.vue'),
  },
  {
    path: '/account/user/phone',
    name: 'account-user-phone',
    component: () => import('@/pages/account/user/phone.vue'),
  },
  {
    path: '/account/password',
    name: 'account-password',
    component: () => import('@/pages/account/password.vue'),
  },
  {
    path: '/account/apply',
    name: 'account-apply-record',
    component: () => import('@/pages/account/apply/index.vue'),
  },
  {
    path: '/account/apply/:id',
    name: 'account-apply-record-id',
    component: () => import('@/pages/account/apply/detail.vue'),
  },
  {
    path: '/apply',
    name: 'apply',
    component: () => import('@/pages/apply/index.vue'),
  },
  {
    path: '/apply/nologin',
    name: 'apply-nologin',
    component: () => import('@/pages/apply/nologin/index.vue'),
  },
  {
    path: '/apply/nologin-phone',
    name: 'apply-nologin-phone',
    component: () => import('@/pages/apply/nologin/phone.vue'),
  },

  {
    path: '/apply/personal-data',
    name: 'apply-personal-data',
    component: () => import('@/pages/apply/personalData.vue'),
  },
  {
    path: '/apply/contact-data',
    name: 'apply-contact-data',
    component: () => import('@/pages/apply/contactData.vue'),
  },
  {
    path: '/apply/file-data',
    name: 'apply-file-data',
    component: () => import('@/pages/apply/fileData.vue'),
  },
  {
    path: '/apply/success',
    name: 'apply-success',
    component: () => import('@/pages/apply/success.vue'),
  },
  {
    path: '/apply/selfie',
    name: 'apply-selfie',
    component: () => import('@/pages/apply/selfie.vue'),
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/pages/setting/index.vue'),
  },
  {
    path: '/setting/notice',
    name: 'setting-notice',
    component: () => import('@/pages/setting/notice.vue'),
  },
  {
    path: '/setting/language',
    name: 'setting-language',
    component: () => import('@/pages/setting/language.vue'),
  },
  {
    path: '/setting/about',
    name: 'setting-about',
    component: () => import('@/pages/setting/about.vue'),
  },
  {
    path: '/setting/native',
    name: 'setting-native',
    component: () => import('@/pages/setting/native.vue'),
  },
  {
    name: 'notice',
    path: '/notice',
    component: () => import('@/pages/notice/index.vue'),
  },
  {
    name: 'notice-id',
    path: '/notice/:id',
    component: () => import('@/pages/notice/detail.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const store = useAccountStore();
  const applyStore = useApplyStore();

  console.log(1234);
  // 在这里进行路由拦截的逻辑判断

  // 如果需要拦截，可以通过调用 next(false) 来取消导航
  // 如果需要继续导航，可以调用 next() 或者 next('/path') 来进行下一步导航

  // 示例：检查用户是否登录
  const isAuthenticated = store.userInfo.name;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 如果需要登录权限并且用户未登录，则取消导航
    next('/account/login');
  } else {
    // 允许导航
    const guestForm = applyStore.guestForm || {};
    if (to.path === '/apply' && !isAuthenticated && !guestForm.isSuccessVerify) {
      console.log(to, 'path123');
      next('/apply/nologin');
    } else {
      next();
    }
  }
});
export default router;
