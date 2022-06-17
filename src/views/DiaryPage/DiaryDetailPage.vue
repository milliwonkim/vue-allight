<template>
  <div class="diary-detail-container">
    <plain-text fontWeight="700" color="black" fontSize="large">
      {{ diary.title }}
    </plain-text>
    <plain-text color="sub-default" fontSize="small" class="diary-detail-contents">
      {{ getDate(diary.date) }}
    </plain-text>
    <div class="diary-detail-contents">
      <plain-text
        :key="content.id"
        v-for="content in diary.contents"
        fontWeight="500"
        color="sub-default"
        fontSize="medium"
      >
        {{ content }}
      </plain-text>
    </div>
  </div>
</template>
<script>
import PlainTextVue from "@/components/PlainText.vue";
import { DIARIES } from "@/constants/constants";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getDate } from "../../utils/getDate";

export default defineComponent({
  components: {
    "plain-text": PlainTextVue,
  },
  setup() {
    const diary = ref({});
    const router = useRouter();
    const currentParams = Number(router.currentRoute.value.params.id);

    onMounted(() => {
      diary.value = DIARIES[currentParams];
    });

    return {
      diary,
      getDate,
    };
  },
});
</script>
<style lang="scss" scoped>
.diary-detail-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.diary-detail-contents {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
