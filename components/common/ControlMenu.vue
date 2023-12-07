<script setup lang="ts">
import type {PropType} from "@vue/runtime-core";

const props = defineProps({
  sortOptions: {type: Array as PropType<{ value: string, name: string }[]>, required: true},
  defaultOption: {type: String, required: true},
  setDefaultOption: {type: Function as PropType<(defaultOption: string) => void>, required: true}
});


</script>

<template>
  <select class="control_menu" v-model="props.defaultOption" @change="props.setDefaultOption?.($event.target.value)">
    <option v-for="sortOption in props.sortOptions" :value="sortOption.value">
      {{ sortOption.name }}
    </option>
  </select>
</template>
