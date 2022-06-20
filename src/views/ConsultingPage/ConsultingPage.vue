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
import { onMounted, ref } from "vue";
import { db } from "@/hooks/useFirestore";
import CardViewContainerVue from "@/components/CardViewContainer.vue";
import { doc, getDoc } from "firebase/firestore";
import ConsultingCardView from "./ConsultingCardView.vue";
import { IConsultingCard } from "../type";
import { CONSULTING_TEACHERS_KEY } from "../../hooks/fetch-key";

export default {
  components: {
    "consulting-card-view": ConsultingCardView,
    "card-view-container": CardViewContainerVue,
  },
  setup() {
    const cards = ref<IConsultingCard[]>([]);

    async function getTeachers() {
      try {
        const docRef = doc(db, CONSULTING_TEACHERS_KEY, "JbrVyCpXSitsAcZgPjDD");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          cards.value = docSnap.data().teachers;
        } else {
          console.log("no document");
        }
      } catch (error) {
        console.log("getTeachers error: ", error);
      }
    }

    console.log("cards: ", cards);

    onMounted(() => {
      getTeachers();
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
