<template>
  <div id="app">
    <a-header />
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import AHeader from './components/AHeader.vue';
import './App.scss';

export default defineComponent({
  name: 'App',
  components: { 'a-header': AHeader },
});
</script>

<style lang="scss">
#app {
  max-width: 1600px;
  width: 80vw;
  height: 100vh;
  margin: 0 auto;
}
</style>
