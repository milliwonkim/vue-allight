<template>
  <form @submit.prevent="handleSubmit('general')">
    <div class="input-container">
      <label class="input-label" for="id">
        <input type="email" class="input" v-model="userInfo.id" id="id" />
      </label>
      <label class="input-label" for="password">
        <input type="password" class="input" v-model="userInfo.password" id="password" />
      </label>
      <a-button type="submit" @clickHandler="handleSubmit('general')">로그인</a-button>
      <a-button type="submit" @clickHandler="handleSubmit('google')"
        >구글 로그인</a-button
      >
    </div>
  </form>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import AButton from "@/components/AButton.vue";

import useAuth from "@/hooks/useAuth";

interface IUserInfo {
  id: string;
  password: string;
}

export default defineComponent({
  components: { "a-button": AButton },
  setup() {
    const userInfo = ref<IUserInfo>({
      id: "",
      password: "",
    });
    const { handleLogin, handleLoginWithGoogle } = useAuth();

    function handleSubmit(provd: string) {
      if (provd === "general") handleLogin(userInfo);
      if (provd === "google") handleLoginWithGoogle();
    }

    return {
      userInfo,
      handleSubmit,
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
