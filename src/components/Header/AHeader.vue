<template>
  <div>
    <header class="header" ref="refs">
      <div
        class="logo-title-box"
        @click="handleRoute(`/${CONSULTING}`, false)"
        @keydown="handleRoute(`/${CONSULTING}`, false)"
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
          @clickHandler="getButtonHandler(headerButton)"
        >
          {{ getButtonName(headerButton) }}
        </a-button>
      </nav>
    </header>
    <fade-box>
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
            @clickHandler="handleRoute(headerButton.link, true)"
          >
            {{ headerButton.name }}
          </a-button>
        </div>
      </div>
    </fade-box>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, unref } from "vue";
import { HEADER_BUTTONS } from "@/constants/constants";
import { CONSULTING } from "@/constants/urls";
import { A_HEADER_COMPONENT, A_BUTTON_COMPONENT } from "@/constants/components";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import useAuth from "@/hooks/useAuth";
import AButton from "../AButton.vue";
import useResize from "../../hooks/useResize";
import useDrawer from "./useDrawer";
import FadeBoxVue from "../animations/FadeBox.vue";

// this is must have
const ICONS = [faBars, faXmark];
ICONS.forEach((icon) => {
  library.add(icon);
});

interface ButtonNameProps {
  id: number;
  name: string;
  link: string;
}

export default defineComponent({
  name: A_HEADER_COMPONENT,
  components: { [A_BUTTON_COMPONENT]: AButton, "fade-box": FadeBoxVue },
  setup() {
    const headerList = ref(HEADER_BUTTONS);

    const refs = ref(null);
    const show = ref(false);

    useResize(refs, show);
    const { authUser, handleLogout, isUserLoggedIn } = useAuth();
    const { email } = toRefs(authUser);

    const {
      isDrawerShow,
      handleRoute,
      handleShowDrawer,
      handleCancelDrawer,
    } = useDrawer();

    onMounted(() => {
      isUserLoggedIn();
    });

    function getButtonName(headerButton: ButtonNameProps) {
      console.log("email: ", email.value);
      if (email.value) {
        if (headerButton.name === "로그인") return email.value;
        if (headerButton.name === "회원가입") return "로그아웃";
      }
      return headerButton.name;
    }

    function getButtonHandler(headerButton: ButtonNameProps) {
      if (email.value) {
        console.log("email 1: ", email.value);
        if (headerButton.name === "로그인") return null;
        if (headerButton.name === "회원가입") return handleLogout();
      }
      console.log("email 2: ", email.value);
      return handleRoute(headerButton.link, false);
    }

    return {
      refs,
      show,
      headerList,
      handleRoute,
      CONSULTING,
      handleShowDrawer,
      isDrawerShow,
      handleCancelDrawer,
      authUser,
      getButtonName,
      getButtonHandler,
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
  cursor: pointer;
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
    z-index: 999;
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
