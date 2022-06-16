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
    let fontWeight = '';
    let color = '';
    const cssModuleProp = toRefs(props);

    if (
      cssModuleProp.cssModuleProps.value &&
      Object.keys(cssModuleProp.cssModuleProps.value).length > 0
    ) {
      const cssModules = useGetCssModule(cssModuleProp);
      const { fontWeights, colors } = cssModules.cssModules;
      fontWeight = fontWeights;
      color = colors;
    }
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

.color_7a7a7a {
  color: #7a7a7a;
}

.colorBlue {
  color: blue;
}
</style>
