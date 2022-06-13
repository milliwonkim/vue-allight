<template>
  <card-view>
    <div class="card-view-box">
      <img class="card-view-image" :src="card.image" alt="card-view-image" />
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
      <v-icon @click="handleRoute">{{ icons.mdiChevronRight }}</v-icon>
    </div>
  </card-view>
</template>
<script lang="ts">
import CardView from '@/components/CardView.vue';
import { onMounted, ref } from '@vue/composition-api';
import { mdiChevronRight } from '@mdi/js';
import router from '@/router';

const ICONS = {
  mdiChevronRight,
};

export default {
  components: {
    'card-view': CardView,
  },
  props: ['card'],
  setup() {
    const icons = ref({});
    // const router = useRoute();

    const handleRoute = () => {
      router.push('/diary');
    };

    onMounted(() => {
      icons.value = ICONS;
    });

    return {
      icons,
      handleRoute,
    };
  },
};
</script>
<style lang="scss">
.card-view-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  box-sizing: border-box;
  margin: 24px 0;

  @media (max-width: 1760px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1210px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 890px) {
    grid-template-columns: repeat(1, 1fr);
    margin: 24px 0;
  }
}

.card-view-box {
  display: flex;
  gap: 16px;
  justify-content: space-between;
}

.card-view-image {
  display: flex;
  border-radius: 16px;
  width: 128px;
  height: 128px;
}

.teacher-info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
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
</style>
