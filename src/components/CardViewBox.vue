<template>
  <div class="card-view-container" data-aos="fade-up">
    <card-view :isFixedHeight="true">
      <slot />
    </card-view>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import CardViewVue from "./CardView.vue";

export default defineComponent({ components: { "card-view": CardViewVue } });
</script>
<style lang="scss" scoped>
.card-view-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
