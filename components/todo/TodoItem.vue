<script setup lang="ts">
import type {PropType} from "@vue/runtime-core";
import type {ITodo} from "~/models/todo.model";
import TodoTypeBox from "~/components/common/TodoTypeBox.vue";
import ColorButton from "~/components/common/ColorButton.vue";
import {ColorButtonType} from "~/enum/ColorButtonType";
import {TodoStatus} from "~/enum/todo/TodoStatus";

const props = defineProps({
  todo: {type : Object as PropType<ITodo>, required: true}
});



</script>

<template>
    <div class="todo_item">
      <TodoTypeBox :type="todo.type" />
      <div class="todo_wrapper">
        <div class="todo_date">
          {{ props.todo.createdAt.toLocaleString().split(' ')[3]
        + ' ' + props.todo.createdAt.toLocaleString().split(' ')[4] }}
        </div>
        <div class="todo_description">
          {{ props.todo.description }}
        </div>
      </div>
      <div class="todo_btn_wrapper">
        <ColorButton
            v-if="todo.status === TodoStatus.IN_PROGRESS"
            :type="ColorButtonType.POSITIVE"
            text="완료"
        />
        <ColorButton
            v-else
            :type="ColorButtonType.NEGATIVE"
            text="취소"
        />
        <ColorButton
            :type="ColorButtonType.DEFAULT"
            text="수정"
        />
      </div>
    </div>
</template>