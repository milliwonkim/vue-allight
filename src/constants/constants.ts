import { CONSULTING, DIARY, LOGIN, NEW_FEEDS, SIGN_UP } from './urls';

export const URLS = [
  {
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    name: '김기원',
    currentJob: '중앙대학교 사회복지학부 3학년',
    mainSection: '학교폭력 상담',
    price: 3000,
    evaluationIndex: 9.0,
    teacherReview: [
      {
        title: '타이틀 1',
        description: '설명 1',
      },
      {
        title: '타이틀 2',
        description: '설명 2',
      },
      {
        title: '타이틀 3',
        description: '설명 3',
      },
    ],
    teacherReservation: [
      { dates: new Date(2022, 5, 3), highlight: true },
      { dates: new Date(2022, 5, 6), highlight: true },
      { dates: new Date(2022, 5, 21), highlight: true },
    ],
    teacherActivity: [],
  },
  {
    image:
      'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    name: '김기원',
    currentJob: '중앙대학교 사회복지학부 3학년',
    mainSection: '학교폭력 상담',
    price: 3000,
    evaluationIndex: 9.0,
  },
  {
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    name: '김기원',
    currentJob: '중앙대학교 사회복지학부 3학년',
    mainSection: '학교폭력 상담',
    price: 3000,
    evaluationIndex: 9.0,
  },
  {
    image:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    name: '김기원',
    currentJob: '중앙대학교 사회복지학부 3학년',
    mainSection: '학교폭력 상담',
    price: 3000,
    evaluationIndex: 9.0,
  },
  {
    image:
      'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80',
    name: '김기원',
    currentJob: '중앙대학교 사회복지학부 3학년',
    mainSection: '학교폭력 상담',
    price: 3000,
    evaluationIndex: 9.0,
  },
  {
    image:
      'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: '김기원',
    currentJob: '중앙대학교 사회복지학부 3학년',
    mainSection: '학교폭력 상담',
    price: 3000,
    evaluationIndex: 9.0,
  },
];

export const URL_LISTS = URLS.map((el, i) => ({
  ...el,
  id: i,
}));

export const HEADER_BUTTONS = [
  {
    id: 1,
    name: '상담받기',
    link: `/${CONSULTING}`,
  },
  {
    id: 2,
    name: '피드',
    link: `/${NEW_FEEDS}`,
  },
  {
    id: 3,
    name: '나의 일기장',
    link: `/${DIARY}`,
  },
  { id: 4, name: '로그인', link: `/${LOGIN}` },
  { id: 5, name: '회원가입', link: `/${SIGN_UP}` },
];

export default { URL_LISTS };
