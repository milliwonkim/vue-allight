import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import ConsultingPage from '../ConsultingPage.vue';

describe('상담 페이지', () => {
  const localVue = createLocalVue();
  let vuetify: Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('상담 카드가 잘 렌더링 됐는지 확인', () => {
    const cards = [
      {
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        name: '이기원',
        currentJob: '중앙대학교 사회복지학부 3학년',
        mainSection: '학교폭력 상담',
        price: 3000,
        evaluationIndex: 9.0,
      },
    ];

    const wrapper = mount(ConsultingPage, {
      localVue,
      vuetify,
      data() {
        return { cards };
      },
    });

    expect(wrapper.attributes('class')).toBe('card-view-wrapper');
  });
});
