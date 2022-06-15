<template>
  <div>
    <header class="header" ref="refs">
      <div
        class="logo-title-box"
        @click="handleRoute(LOGO_BUTTON)"
        @keydown="handleRoute(LOGO_BUTTON)"
      >
        <p class="logo-title">ALLIGHT</p>
      </div>
      <nav class="nav-list">
        <font-awesome-icon
          class="hamburger-button"
          v-if="show"
          icon="fa-solid fa-bars"
          @click="handleShowDrawer"
        />
        <a-button
          class="navigation-button"
          v-else
          :key="headerButton.id"
          v-for="headerButton in headerList"
          @clickHandler="handleRoute(headerButton.link)"
        >
          {{ headerButton.name }}
        </a-button>
      </nav>
    </header>
    <div v-if="isDrawerShow" class="drawer-box">
      <font-awesome-icon
        class="drawer-cancel-button"
        @click="handleCancelDrawer"
        icon="fa-solid fa-xmark"
      />
      <div class="drawer-contents-box">
        <a-button
          class="mobile-navigation-button"
          :key="headerButton.id"
          v-for="headerButton in headerList"
          @clickHandler="handleRoute(headerButton.link)"
        >
          {{ headerButton.name }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { HEADER_BUTTONS } from '@/constants/constants';
import { LOGO_BUTTON } from '@/constants/urls';
import { A_HEADER_COMPONENT, A_BUTTON_COMPONENT } from '@/constants/components';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import AButton from '../AButton.vue';
import useResize from '../../hooks/useResize';
import useDrawer from './useDrawer';

// this is must have
const ICONS = [faBars, faXmark];
ICONS.forEach((icon) => {
  library.add(icon);
});

export default defineComponent({
  name: A_HEADER_COMPONENT,
  components: { [A_BUTTON_COMPONENT]: AButton },
  setup() {
    const headerList = ref(HEADER_BUTTONS);

    const refs = ref(null);
    const show = ref(false);

    useResize(refs, show);
    const { isDrawerShow, handleRoute, handleShowDrawer, handleCancelDrawer } =
      useDrawer();

    return {
      refs,
      show,
      headerList,
      handleRoute,
      LOGO_BUTTON,
      handleShowDrawer,
      isDrawerShow,
      handleCancelDrawer,
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

.drawer-box {
  display: none;
  height: 100vh;
  background: #ffffff;
  @media (max-width: 890px) {
    display: flex;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
  }
}

.hamburger-button {
  cursor: pointer;
}

.drawer-cancel-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.drawer-contents-box {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mobile-navigation-button {
  display: flex;
}
</style>
