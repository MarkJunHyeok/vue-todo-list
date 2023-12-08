<script setup lang="ts">
import type {PropType} from "@vue/runtime-core";
import {ColorButtonType} from "~/enum/ColorButtonType";

const props = defineProps({
  text: {type: String, required: true},
  type: {type: Object as PropType<ColorButtonType>, required: true}
});

const getColorButtonClass = () => {
  switch (props.type) {
    case ColorButtonType.DEFAULT:
      return "default-button"
    case ColorButtonType.POSITIVE:
      return "positive-button"
    case ColorButtonType.NEGATIVE:
      return "negative-button"
    case ColorButtonType.PURPLE:
      return "purple-button"
    case ColorButtonType.PINK:
      return "pink-button"
  }
}

</script>

<template>
  <button class="color-button" :class="getColorButtonClass()">
    {{ text }}
  </button>
</template>

