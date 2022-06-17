<template>
  <card-view-container>
    <consulting-card-view
      class="consulting-card-view-list"
      :key="card.id"
      v-for="card in cards"
      :card="card"
    />
  </card-view-container>
</template>
<script lang="ts">
import { onMounted, ref } from 'vue';
import { URL_LISTS } from '@/constants/constants';
import CardViewContainerVue from '@/components/CardViewContainer.vue';
import ConsultingCardView from './ConsultingCardView.vue';
import { IConsultingCard } from '../type';

export default {
  components: {
    'consulting-card-view': ConsultingCardView,
    'card-view-container': CardViewContainerVue,
  },
  setup() {
    const cards = ref<IConsultingCard[]>([]);

    onMounted(() => {
      cards.value = URL_LISTS;
    });

    return { cards };
  },
};
</script>
<style lang="scss" scoped>
.consulting-card-view-list {
  cursor: pointer;
}
</style>
