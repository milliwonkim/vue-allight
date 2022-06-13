<template>
  <header class="header" ref="refs">
    <div class="logo-title-box">
      <p class="logo-title">ALLIGHT</p>
    </div>
    <nav class="nav-list">
      <v-app-bar-nav-icon v-if="show"></v-app-bar-nav-icon>
      <a-button v-else :key="headerButton" v-for="headerButton in headerList">
        {{ headerButton }}
      </a-button>
    </nav>
  </header>
</template>

<script>
import { ref } from '@vue/composition-api';
import AButton from './AButton.vue';
import useResize from '../utils/useResize';

export default {
  name: 'a-header',
  components: {
    'a-button': AButton,
  },
  setup() {
    const BUTTONS = ['상담받기', '피드', '나의 일기장', '로그인', '회원가입'];
    const headerList = ref(BUTTONS);

    const refs = ref(null);
    const show = ref(false);

    useResize(refs, show);

    return {
      refs,
      show,
      headerList,
    };
  },
};
</script>
<style lang="scss">
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 24px 0;

  @media (max-width: 625px) {
    margin: 24px 0;
  }
}

.nav-list {
  display: flex;
  justify-content: space-evenly;
  gap: 16px;
  align-items: center;
}

.logo-title-box {
  display: flex;
  align-items: center;
}

.logo-title {
  display: inline-block;
  font-size: 24px;
  font-weight: 600;
}
</style>
