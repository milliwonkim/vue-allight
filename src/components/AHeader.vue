<template lang="">
  <header class="header">
    <div class="logo-title-box">
      <p class="logo-title">

      ALLIGHT
      </p>
    </div>
    <nav class="nav-list">
      <a-button :key="headerButton" v-for="headerButton in headerList">
        {{ headerButton }}
      </a-button>
    </nav>
  </header>
</template>
<script>
import { ref } from '@vue/composition-api';
import AButton from './AButton.vue';

export default {
  name: 'a-header',
  components: {
    'a-button': AButton,
  },
  setup() {
    const BUTTONS = ['상담받기', '피드', '나의 일기장', '로그인', '회원가입'];
    const headerList = ref(BUTTONS);

    return {
      headerList,
    };
  },
};
</script>
<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  margin: 24px 48px;
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
