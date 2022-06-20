import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  CONSULTING,
  DIARY,
  NEW_FEEDS,
  TEACHER,
  LOGIN,
  SIGN_UP,
  DIARY_DETAIL,
  WRITE_MY_DIARY,
} from '../constants/urls';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: `/${CONSULTING}` },
  {
    path: `/${CONSULTING}`,
    name: CONSULTING,
    component: () => import('@/views/ConsultingPage/ConsultingPage.vue'),
  },
  {
    path: `/${CONSULTING}/teacher/:id`,
    name: TEACHER,
    component: () => import('@/views/TeacherPage/TeacherPage.vue'),
  },
  {
    path: `/${NEW_FEEDS}`,
    name: NEW_FEEDS,
    meta: {
      requireAuth: true,
    },
    component: () => import('@/views/NewFeedsPage.vue'),
  },
  {
    path: `/${DIARY}`,
    name: DIARY,
    meta: {
      requireAuth: true,
    },
    component: () => import('@/views/DiaryPage/DiaryPage.vue'),
  },
  {
    path: `/${DIARY}/${WRITE_MY_DIARY}`,
    name: WRITE_MY_DIARY,
    meta: {
      requireAuth: true,
    },
    component: () => import('@/views/DiaryPage/WriteDiaryPage.vue'),
  },
  {
    path: `/${DIARY_DETAIL}/:id`,
    name: DIARY_DETAIL,
    meta: {
      requireAuth: true,
    },
    component: () => import('@/views/DiaryPage/DiaryDetailPage.vue'),
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
  {
    path: '/:pathMatch(.*)*',
    redirect: `/${CONSULTING}`,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  if (to.meta.requireAuth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next();
      } else {
        next('/consulting');
      }
    });
  } else {
    next();
  }
});

export default router;
