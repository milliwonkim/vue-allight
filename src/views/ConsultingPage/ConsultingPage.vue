<template>
  <div class="card-view-wrapper">
    <consulting-card-view :key="card.id" v-for="card in cards" :card="card" />
  </div>
</template>
<script lang="ts">
import { URL_LISTS } from '@/constants/constants';
import { onMounted, ref } from '@vue/composition-api';
import ConsultingCardView from './ConsultingCardView.vue';
import { IConsultingCard } from '../type';

export default {
  components: { 'consulting-card-view': ConsultingCardView },
  setup() {
    const cards = ref<IConsultingCard[]>([]);

    onMounted(() => {
      cards.value = URL_LISTS;
    });

    return { cards };
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
</style>
