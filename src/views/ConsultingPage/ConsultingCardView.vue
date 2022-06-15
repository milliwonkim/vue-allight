<template>
  <card-view>
    <div class="card-view-box" @click="handleRoute" @keypress="handleRoute">
      <teacher-image :dynamicShow="true" :imageUrl="card.image" />
      <div class="teacher-info-box">
        <p class="teacher-name-label">
          {{ card.name }} <span class="teacher-label">선생님</span>
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
        class="teacher-route-button"
        icon="fa-solid fa-chevron-right"
      />
    </div>
  </card-view>
</template>
<script lang="ts">
import { defineComponent, toRef } from 'vue';
import CardView from '@/components/CardView.vue';
import { useRouter } from 'vue-router';
import { CONSULTING } from '@/constants/urls';
import TeacherImageVue from '@/components/TeacherImage.vue';

// this is must have
import { library } from '@fortawesome/fontawesome-svg-core';
// import { name of your icon in camelCase } from "@fortawesome/free-solid-svg-icons";
// For example, I want to use fa-enveloper-open-text, then it's faEnvelopeOpenText
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
// Then add it to library
library.add(faChevronRight);

export default defineComponent({
  components: { 'card-view': CardView, 'teacher-image': TeacherImageVue },
  props: ['card'],
  setup(props) {
    const router = useRouter();
    const card = toRef(props, 'card');
    const cardId = Object.keys(card).length > 0 ? card.value.id : 0;

    const handleRoute = () => {
      router.push(`/${CONSULTING}/teacher/${cardId}`);
    };

    return { handleRoute };
  },
});
</script>
<style lang="scss">
.card-view-box {
  display: flex;
  gap: 16px;
  justify-content: space-between;
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

.teacher-route-button {
  display: inline-block;
  margin: auto 0;
}
</style>
