<template>
  <div class="input-container">
    <label class="input-label" for="id">
      <input type="email" class="input" v-model="userInfo.id" id="id" />
    </label>
    <label class="input-label" for="password">
      <input type="password" class="input" v-model="userInfo.password" id="password" />
    </label>
    <a-button @clickHandler="handleSubmit">로그인</a-button>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import AButton from "@/components/AButton.vue";

interface IUserInfo {
  id: string;
  password: string | null;
}

export default defineComponent({
  components: { "a-button": AButton },
  setup() {
    const userInfo = ref<IUserInfo>({
      id: "",
      password: "",
    });

    function handleSubmit() {
      console.log(userInfo.value);
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
