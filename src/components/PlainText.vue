<template>
  <p :class="['label', fontWeightStyle, colorStyle]">
    <slot />
  </p>
</template>
<script>
import { defineComponent, toRefs } from "vue";

const FONT_WEIGHT_CSS = "fontWeight";
const COLOR_CSS = "color";

export default defineComponent({
  props: ["fontWeight", "color"],
  setup(props) {
    const styleProps = toRefs(props);
    const getCss = (selector) => {
      if (!styleProps[selector].value) return "";
      return `${selector}__${styleProps[selector].value}`;
    };
    const fontWeightStyle = getCss(FONT_WEIGHT_CSS);
    const colorStyle = getCss(COLOR_CSS);

    console.log("colorStyle: ", colorStyle);

    return { fontWeightStyle, colorStyle };
  },
});
</script>
<style lang="scss" scoped>
.label {
  display: flex;
  box-sizing: border-box;
  border-radius: 8px;
}

.fontWeight {
  &__500 {
    font-weight: 500;
  }

  &__600 {
    font-weight: 600;
  }

  &__700 {
    font-weight: 700;
  }
}

.color {
  &__7a7a7a {
    color: #7a7a7a;
  }

  &__red {
    color: red;
  }
}
</style>
