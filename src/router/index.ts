import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import URLS from '../constants/urls';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: `/${URLS.CONSULTING}`,
    name: URLS.CONSULTING,
    component: () => import('@/views/ConsultingPage.vue'),
  },
  {
    path: `/${URLS.NEW_FEEDS}`,
    name: URLS.NEW_FEEDS,
    component: () => import('@/views/NewFeedsPage.vue'),
  },
  {
    path: `/${URLS.DIARY}`,
    name: URLS.DIARY,
    component: () => import('@/views/MyDiaryPage.vue'),
  },
  {
    path: `/${URLS.LOGIN}`,
    name: URLS.LOGIN,
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: `/${URLS.SIGN_UP}`,
    name: URLS.SIGN_UP,
    component: () => import('@/views/SignUpPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
