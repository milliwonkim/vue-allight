<template>
  <div
    :class="classes.cardViewBox"
    @click="handleClickCard"
    @keypress="handleClickCard"
  >
    <teacher-image :dynamicShow="true" :imageUrl="card.image" />
    <div :class="classes.teacherInfoBox">
      <p :class="classes.teacherNameLabel">
        {{ card.name }} <span :class="classes.teacherLabel">선생님</span>
      </p>
      <p class="current-job-label">{{ card.currentJob }}</p>
      <div class="section-box">
        <p class="section-label">주요분야</p>
        <p>{{ card.mainSection }}</p>
      </div>
      <div class="price-box">
        <p>{{ card.price }}</p>
        <p>{{ card.evaluationIndex }} / 10.0</p>
      </div>
    </div>
    <font-awesome-icon
      :class="classes.teacherRouteButton"
      icon="fa-solid fa-chevron-right"
    />
  </div>
</template>
<script>
import { defineComponent, toRefs } from 'vue';
import TeacherImage from '@/components/TeacherImage.vue';

// this is must have
import { library } from '@fortawesome/fontawesome-svg-core';
// import { name of your icon in camelCase } from "@fortawesome/free-solid-svg-icons";
// For example, I want to use fa-enveloper-open-text, then it's faEnvelopeOpenText
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
// Then add it to library
library.add(faChevronRight);

export default defineComponent({
  name: 'teacher-card',
  props: ['teacherInfo', 'handleClick'],
  components: { 'teacher-image': TeacherImage },
  setup(props, { emit }) {
    const card = toRefs(props).teacherInfo;
    function handleClickCard() {
      emit('handleClick');
    }

    return { handleClickCard, card };
  },
});
</script>
<style lang="scss" module="classes">
.cardViewBox {
  display: flex;
  gap: 16px;
  justify-content: space-between;
}

.teacherInfoBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  @media (max-width: 450px) {
    width: 100%;
  }
}

.teacherNameLabel {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  color: #000000;
  font-size: 24px;
  font-weight: 800;
}

.teacherLabel {
  color: #7a7a7a;
  font-size: 16px;
  font-weight: 600;
}

.current-job-label {
  color: #7a7a7a;
  font-weight: 700;
}

.section-box {
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 700;
  color: #7a7a7a;
}

.section-label {
  display: flex;
  box-sizing: border-box;
  padding: 8px;
  color: #ffffff;
  background: #000000;
  border-radius: 8px;
}

.price-box {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  color: #7a7a7a;
}

.teacherRouteButton {
  display: inline-block;
  margin: auto 0;
}
</style>
