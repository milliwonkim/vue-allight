<template>
  <p
    :class="[
      'label',
      { fontWeightStyle: !!fontWeightStyle },
      { colorStyle: !!colorStyle },
      { fontSizeStyle: !!fontSizeStyle },
    ]"
  >
    <slot />
  </p>
</template>
<script>
import { defineComponent, toRefs } from "vue";

const FONT_WEIGHT_CSS = "fontWeight";
const COLOR_CSS = "color";
const FONT_SIZE_CSS = "fontSize";

export default defineComponent({
  props: ["fontWeight", "color", "fontSize"],
  setup(props) {
    const styleProps = toRefs(props);

    const getCss = (selector) => {
      if (!styleProps[selector]) return "";
      return `${selector}__${styleProps[selector].value}`;
    };

    const fontWeightStyle = getCss(FONT_WEIGHT_CSS);
    const colorStyle = getCss(COLOR_CSS);
    const fontSizeStyle = getCss(FONT_SIZE_CSS);

    return { fontWeightStyle, colorStyle, fontSizeStyle };
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
  color: #424242;

  &__black {
    color: #000000;
  }

  &__sub-default {
    color: $sub-default-color;
  }

  &__red {
    color: red;
  }
}
</style>
