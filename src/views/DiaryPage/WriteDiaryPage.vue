<template>
  <div>
    <form @submit.prevent="handleWriteDiary(title, contents)">
      <a-input-container>
        <a-input
          placeholder="일기제목"
          title="타이틀"
          id="title"
          type="text"
          :inputData="title"
          @handleInput="handleInput($event)"
        ></a-input>
        <a-input
          :isTextArea="true"
          :rows="10"
          placeholder="일기내용"
          type="text"
          title="내용"
          id="contents"
          :inputData="contents"
          @handleInput="handleInput($event)"
        ></a-input>
        <a-button type="submit">일기쓰기</a-button>
      </a-input-container>
    </form>
  </div>
</template>
<script lang="ts">
import AInputVue from "@/components/AInput.vue";
import AInputContainerVue from "@/components/AInputContainer.vue";
import useFirestore from "@/hooks/useFirestore";
import { defineComponent, ref } from "vue";
import AButton from "@/components/AButton.vue";
import { useRouter } from "vue-router";
import { DIARY } from "@/constants/urls";

export default defineComponent({
  components: {
    "a-input": AInputVue,
    "a-input-container": AInputContainerVue,
    "a-button": AButton,
  },
  setup() {
    const router = useRouter();
    const title = ref("");
    const contents = ref("");
    const { postMyDiary } = useFirestore();

    function handleInput(event: { target: { id: string; value: string } }) {
      if (event.target.id === "title") {
        title.value = event.target.value;
      } else {
        contents.value = event.target.value;
      }
    }

    function handleWriteDiary(titleString: string, contentsString: string) {
      postMyDiary(titleString, contentsString);
      router.push(`/${DIARY}`);
    }

    return {
      title,
      contents,
      postMyDiary,
      handleWriteDiary,
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
