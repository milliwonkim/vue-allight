import { mount } from '@vue/test-utils';
import ConsultingPage from '../ConsultingPage.vue';

describe('상담 페이지', () => {
  it('상담 카드가 잘 렌더링 됐는지 확인', () => {
    const wrapper = mount(ConsultingPage);

    expect(wrapper.attributes('class')).toBe('card-view-wrapper');
  });
});
