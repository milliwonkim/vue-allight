<template>
  <card-view-box>
    <teacher-card :isFixedWidth="false" :teacherInfo="card" @handleClick="handleRoute" />
  </card-view-box>
</template>
<script lang="ts">
import { defineComponent, toRef } from "vue";
import { useRouter } from "vue-router";
import { CONSULTING } from "@/constants/urls";
import TeacherCard from "@/views/TeacherPage/TeacherCard.vue";
import CardViewBox from "@/components/CardViewBox.vue";

export default defineComponent({
  components: {
    "card-view-box": CardViewBox,
    "teacher-card": TeacherCard,
    CardViewBox,
  },
  props: ["card"],
  setup(props) {
    const router = useRouter();
    const card = toRef(props, "card");
    const cardId = Object.keys(card).length > 0 ? card.value.id : 0;

    const handleRoute = () => {
      router.push(`/${CONSULTING}/teacher/${cardId}`);
    };

    return { handleRoute };
  },
});
</script>
<style lang="scss"></style>
