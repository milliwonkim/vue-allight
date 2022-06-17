<template>
  <div
    :class="['card-view-box', { 'fixed-width': isFixedWidth }]"
    @click="handleClickCard"
    @keypress="handleClickCard"
  >
    <div class="teacher-info-container">
      <teacher-image :dynamicShow="!!card.image" :imageUrl="card.image" />
      <div class="teacher-info-box">
        <p class="teacher-name-label">
          {{ card.name }} <span class="teacher-label">선생님</span>
        </p>
        <p class="current-job-label">{{ card.currentJob }}</p>
        <div class="section-box">
          <plain-text fontWeight="700" color="black">주요분야: </plain-text>
          <plain-text fontWeight="700">{{ card.mainSection }}</plain-text>
        </div>
        <div class="price-box">
          <p>{{ card.price }}</p>
          <p>{{ card.evaluationIndex }} / 10.0</p>
        </div>
      </div>
    </div>
    <font-awesome-icon class="teacher-route-button" icon="fa-solid fa-chevron-right" />
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from "vue";
import TeacherImage from "@/components/TeacherImage.vue";
import PlainText from "@/components/PlainText.vue";

// this is must have
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronRight);

export default defineComponent({
  name: "teacher-card",
  props: ["teacherInfo", "handleClick", "isFixedWidth"],
  components: { "teacher-image": TeacherImage, "plain-text": PlainText },
  setup(props, { emit }) {
    const card = toRefs(props).teacherInfo;
    function handleClickCard() {
      emit("handleClick");
    }

    return { handleClickCard, card };
  },
});
</script>
<style lang="scss" scoped>
.card-view-box {
  display: flex;
  gap: 16px;
  justify-content: space-between;
}

.fixed-width {
  @extend .card-view-box;
  max-width: 400px;
}

.teacher-info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  @media (max-width: 450px) {
    width: 100%;
  }
}

.teacher-name-label {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  color: #000000;
  font-size: 24px;
  font-weight: 800;
}

.teacher-label {
  color: $sub-default-color;
  font-size: 16px;
  font-weight: 600;
}

.current-job-label {
  color: $sub-default-color;
  font-weight: 700;
}

.section-box {
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 600;
  color: $sub-default-color;
}

.price-box {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  color: $sub-default-color;
}

.teacher-route-button {
  display: inline-block;
  margin: auto 0;
}

.teacher-info-container {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
}
</style>
