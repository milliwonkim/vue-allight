<template>
  <form @submit.prevent="handleSubmit('general')">
    <a-input-container>
      <a-input
        placeholder="이메일"
        type="email"
        :inputData="userInfo.id"
        @handleInput="handleInput($event)"
        id="id"
      />
      <a-input
        placeholder="비밀번호"
        type="password"
        :inputData="userInfo.password"
        @handleInput="handleInput($event)"
        id="password"
      />
      <a-button type="submit" @clickHandler="handleSubmit('general')">로그인</a-button>
      <a-button type="submit" @clickHandler="handleSubmit('google')"
        >구글 로그인</a-button
      >
    </a-input-container>
  </form>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import AButton from "@/components/AButton.vue";

import useAuth from "@/hooks/useAuth";
import AInputContainerVue from "@/components/AInputContainer.vue";
import AInput from "@/components/AInput.vue";

interface IUserInfo {
  id: string;
  password: string;
}

export default defineComponent({
  components: {
    "a-button": AButton,
    "a-input-container": AInputContainerVue,
    AInput,
  },
  setup() {
    const userInfo = reactive<IUserInfo>({
      id: "",
      password: "",
    });
    const { handleLogin, handleLoginWithGoogle } = useAuth();

    function handleSubmit(provd: string) {
      if (provd === "general") handleLogin(userInfo);
      if (provd === "google") handleLoginWithGoogle();
    }

    function handleInput(event: { target: { id: string; value: string } }) {
      console.log("value", event.target.id, event.target.value);
      if (event.target.id === "id") {
        userInfo.id = event.target.value;
      } else {
        userInfo.password = event.target.value;
      }
    }

    return {
      userInfo,
      handleSubmit,
      handleInput,
    };
  },
});
</script>
<style lang="scss" scoped>
.input {
  display: flex;
  border-radius: $small-border-radius;
  padding: 8px 16px;
  border: 1px solid $default-color;
}

.input-container {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-label {
  display: flex;
  flex-direction: column;
}
</style>
