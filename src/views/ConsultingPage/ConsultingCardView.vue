<template>
  <div class="card-view-container" data-aos="fade-up">
    <card-view :isFixedHeight="true">
      <teacher-card
        :isFixedWidth="false"
        :teacherInfo="card"
        @handleClick="handleRoute"
      />
    </card-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRef } from "vue";
import CardView from "@/components/CardView.vue";
import { useRouter } from "vue-router";
import { CONSULTING } from "@/constants/urls";
import TeacherCard from "@/views/TeacherPage/TeacherCard.vue";

export default defineComponent({
  components: {
    "card-view": CardView,
    "teacher-card": TeacherCard,
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
<style lang="scss">
.card-view-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
