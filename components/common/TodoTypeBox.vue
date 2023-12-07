<script setup lang="ts">
import type {PropType} from "@vue/runtime-core";
import {TodoType} from "~/enum/todo/TodoType";

const props = defineProps({
  type: {type: Object as PropType<TodoType>, required: true}
});

const todoTypeClass = computed(() => {
  switch (props.type) {
    case TodoType.VERY_IMPORTANT:
      return 'todo_type_wrapper_5';
    case TodoType.IMPORTANT:
      return 'todo_type_wrapper_4';
    case TodoType.SO_SO:
      return 'todo_type_wrapper_3';
    case TodoType.LEISURELY:
      return 'todo_type_wrapper_2';
    case TodoType.VERY_LEISURELY:
      return 'todo_type_wrapper_1';
  }
});

const todoTypeText = computed(() => {
  switch (props.type) {
    case TodoType.VERY_IMPORTANT:
      return '!!!';
    case TodoType.IMPORTANT:
      return '!';
    case TodoType.SO_SO:
      return '-';
    case TodoType.LEISURELY:
      return '~';
    case TodoType.VERY_LEISURELY:
      return '~~';
  }
});
</script>

<template>
  <div class="todo_type_wrapper" :class="todoTypeClass">
    {{ todoTypeText }}
  </div>
</template>

<style scoped>

</style>