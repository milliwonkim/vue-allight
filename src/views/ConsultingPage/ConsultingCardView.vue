<template>
  <card-view>
    <teacher-card
      :isFixedWidth="false"
      :teacherInfo="card"
      @handleClick="handleRoute"
    />
  </card-view>
</template>
<script lang="ts">
import { defineComponent, toRef } from 'vue';
import CardView from '@/components/CardView.vue';
import { useRouter } from 'vue-router';
import { CONSULTING } from '@/constants/urls';
import TeacherCard from '@/views/TeacherPage/TeacherCard.vue';

export default defineComponent({
  components: {
    'card-view': CardView,
    'teacher-card': TeacherCard,
  },
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
<style lang="scss" module>
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
