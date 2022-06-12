<template>
  <div id="app">
    <a-header />
    <router-view />
  </div>
</template>
<script lang="ts">
import AHeader from './components/AHeader.vue';

export default {
  name: 'App',
  components: {
    'a-header': AHeader,
  },
};
</script>

<style lang="scss">
#app {
  max-width: 1200px;
  width: 80vw;
  margin: 0 auto;
}
</style>
