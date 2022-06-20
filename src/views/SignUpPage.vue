<template>
  <a-input-container>
    <a-input :inputData="userInfo.id" id="id" />
    <a-input :inputData="userInfo.password" id="password" />
    <a-button @clickHandler="handleSubmit">회원가입</a-button>
  </a-input-container>
</template>
<script lang="ts">
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, defineComponent } from "vue";
import AButton from "@/components/AButton.vue";
import AInputContainer from "@/components/AInputContainer.vue";
import AInput from "@/components/AInput.vue";
// eslint-disable-next-line import/no-unresolved

interface IUserInfo {
  id: string;
  password: string;
}

export default defineComponent({
  components: { "a-button": AButton, AInputContainer, AInput },
  setup() {
    const userInfo = ref<IUserInfo>({
      id: "",
      password: "",
    });

    async function handleSubmit() {
      console.log("userInfo.value", userInfo.value);
      const auth = getAuth();
      const { password, id } = userInfo.value;
      createUserWithEmailAndPassword(auth, id, password)
        .then((data) => {
          const { user } = data;
          console.log("user: ", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log("errorCode, errorMessage", errorCode, errorMessage);
        });
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
