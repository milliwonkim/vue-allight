<template>
  <div>
    <img
      v-bind:class="[
        dynamicShow ? 'card-view-image-show-true' : 'card-view-image-show-false',
      ]"
      :src="imageUrl"
      alt="card-view-image"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({ props: ["imageUrl", "dynamicShow"] });
</script>
<style lang="scss">
.card-view-image-show-true {
  display: flex;
  border-radius: $default-border-radius;
  width: 128px;
  height: 128px;

  @media (max-width: 450px) {
    display: none;
  }
}

.card-view-image-show-false {
  display: flex;
  border-radius: $default-border-radius;
  width: 128px;
  height: 128px;
}
</style>
