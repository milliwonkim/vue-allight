import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import {
  CONSULTING,
  DIARY,
  NEW_FEEDS,
  TEACHER,
  LOGIN,
  SIGN_UP,
} from '../constants/urls';

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${CONSULTING}`,
    name: CONSULTING,
    component: () => import('@/views/ConsultingPage/ConsultingPage.vue'),
  },
  {
    path: `/${CONSULTING}/teacher/:id`,
    name: TEACHER,
    component: () => import('@/views/TeacherPage.vue'),
  },
  {
    path: `/${NEW_FEEDS}`,
    name: NEW_FEEDS,
    component: () => import('@/views/NewFeedsPage.vue'),
  },
  {
    path: `/${DIARY}`,
    name: DIARY,
    component: () => import('@/views/MyDiaryPage.vue'),
  },
  {
    path: `/${LOGIN}`,
    name: LOGIN,
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: `/${SIGN_UP}`,
    name: SIGN_UP,
    component: () => import('@/views/SignUpPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
