<template>
  <p :class="[$style.label, fontWeight, color]">
    <slot />
  </p>
</template>
<script>
import { defineComponent, toRefs } from 'vue';
import useGetCssModule from '../hooks/useGetCssModule';

export default defineComponent({
  props: ['cssModuleProps'],
  setup(props) {
    const cssModuleProps = toRefs(props);
    const { cssModules } = useGetCssModule(cssModuleProps);
    const { fontWeight, color } = cssModules;

    return { fontWeight, color };
  },
});
</script>
<style lang="scss" module>
.label {
  display: flex;
  box-sizing: border-box;
  border-radius: 8px;
}

.fontWeight500 {
  font-weight: 500;
}

.fontWeight600 {
  font-weight: 600;
}

.fontWeight700 {
  font-weight: 700;
}

.colorRed {
  color: red;
}

.colorBlue {
  color: blue;
}
</style>
