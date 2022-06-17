<template>
  <div
    :class="[
      'card-container',
      isFixedHeight ? '' : 'no-fixed-height',
      displayFlexDirectionColumn ? 'display__flex__direction__column' : '',
    ]"
  >
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["isFixedHeight", "displayFlexDirectionColumn"],
});
</script>
<style lang="scss" scoped>
.card-container {
  max-height: 160px;
  height: 100%;
  width: 100%;
  word-break: keep-all;

  padding: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  @media (max-width: 920px) {
    max-width: 400px;
    box-sizing: border-box;
  }

  @media (max-width: 625px) {
    min-width: 0;
    width: 100%;
  }
}

.no-fixed-height {
  max-height: 100%;
}

.display {
  &__flex {
    &__direction {
      &__column {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }
  }
}
</style>
