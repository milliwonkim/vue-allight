<template>
  <header class="header" ref="refs">
    <div
      class="logo-title-box"
      @click="handleRoute(LOGO_BUTTON)"
      @keydown="handleRoute(LOGO_BUTTON)"
    >
      <p class="logo-title">ALLIGHT</p>
    </div>
    <nav class="nav-list">
      <font-awesome-icon v-if="show" icon="fa-solid fa-bars" />
      <a-button
        v-else
        :key="headerButton.id"
        v-for="headerButton in headerList"
        @clickHandler="handleRoute(headerButton.link)"
      >
        {{ headerButton.name }}
      </a-button>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { HEADER_BUTTONS } from '@/constants/constants';
import { CONSULTING, LOGO_BUTTON } from '@/constants/urls';
import { useRouter } from 'vue-router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import AButton from './AButton.vue';
import useResize from '../hooks/useResize';

// this is must have
library.add(faBars);

export default defineComponent({
  name: 'a-header',
  components: { 'a-button': AButton },
  setup() {
    const router = useRouter();
    const headerList = ref(HEADER_BUTTONS);

    const refs = ref<any>(null);
    const show = ref<boolean>(false);

    useResize(refs, show);
    const handleRoute = (link) => {
      if (window.location.pathname !== link) {
        if (link) {
          router.push(link);
        }
        if (link === LOGO_BUTTON) {
          router.push(`/${CONSULTING}`);
        }
      }
    };

    return {
      refs,
      show,
      headerList,
      handleRoute,
      LOGO_BUTTON,
    };
  },
});
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
