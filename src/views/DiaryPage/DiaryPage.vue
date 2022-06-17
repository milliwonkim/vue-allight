<template>
  <div>
    <card-view-container>
      <card-view-box :key="diary.id" v-for="diary in diaries">
        <div :class="['card-view-box', { 'fixed-width': isFixedWidth }]">
          <div class="teacher-info-inner-container">
            <div class="teacher-info-box">
              <p class="teacher-name-label">
                {{ diary.title }}
              </p>
              <div class="section-box">
                <plain-text fontWeight="700">{{ diary.contents[0] }}</plain-text>
              </div>
            </div>
          </div>
          <font-awesome-icon
            class="teacher-route-button"
            icon="fa-solid fa-chevron-right"
          />
        </div>
      </card-view-box>
    </card-view-container>
  </div>
</template>
<script lang="ts">
import CardViewContainerVue from "@/components/CardViewContainer.vue";
import { defineComponent, onMounted, ref } from "vue";
import { DIARIES } from "@/constants/constants";
import CardViewBox from "@/components/CardViewBox.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import PlainTextVue from "@/components/PlainText.vue";

library.add(faChevronRight);

interface IDiaries {
  author: string;
  date: Date;
  title: string;
  contents: string[];
  id: number;
}

export default defineComponent({
  components: {
    "card-view-container": CardViewContainerVue,
    "card-view-box": CardViewBox,
    "plain-text": PlainTextVue,
  },
  props: ["isFixedWidth"],
  setup() {
    const diaries = ref<IDiaries[]>([]);

    onMounted(() => {
      diaries.value = DIARIES;
    });

    return { diaries };
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

.teacher-info-inner-container {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
}
</style>
