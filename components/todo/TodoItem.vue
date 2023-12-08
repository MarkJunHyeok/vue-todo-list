<script setup lang="ts">
import type {PropType} from "@vue/runtime-core";
import type {ITodo} from "~/models/todo.model";
import TodoTypeBox from "~/components/common/TodoTypeBox.vue";
import ColorButton from "~/components/common/ColorButton.vue";
import {ColorButtonType} from "~/enum/ColorButtonType";
import {TodoStatus} from "~/enum/todo/TodoStatus";
import useAxios from "~/composables/useAxios";
import {TodoType} from "~/enum/todo/TodoType";
import {completeTodo, unCompleteTodo, updateTodo} from "~/api/todo.api";

const props = defineProps({
  todo: {type : Object as PropType<ITodo>, required: true},
  todoChange: {type: Function as PropType<() => void>, required: true}
});

const {execute, isLoading} = useAxios();

const showTodoUpdateModal = ref(false);

watch(showTodoUpdateModal, () => {
  props.todoChange()
})

const doCompleteTodo = () => {
  execute(completeTodo(props.todo.id!))

  props.todoChange()
}

const doUnCompleteTodo = () => {
  execute(unCompleteTodo(props.todo.id!))

  props.todoChange()
}
</script>

<template>
    <div class="todo_item">
      <TodoTypeBox :type="todo.type" />
      <div class="todo_wrapper">
        <div class="todo_date">
          {{ props.todo.createdAt.toTimeString().split(" ")[0]}}
        </div>
        <div class="todo_description">
          {{ props.todo.description }}
        </div>
      </div>
      <div class="todo_btn_wrapper">
        <ColorButton
            v-if="todo.status === TodoStatus.IN_PROGRESS"
            :type="ColorButtonType.PINK"
            text="완료"
            @click="doCompleteTodo"
        />
        <ColorButton
            v-else
            :type="ColorButtonType.NEGATIVE"
            text="취소"
            @click="doUnCompleteTodo"
        />
        <ColorButton
            @click="showTodoUpdateModal = true"
            :type="ColorButtonType.DEFAULT"
            text="수정"
        />
      </div>
      <TodoUpdateModal
          :todo="todo"
          :show-modal="showTodoUpdateModal"
          :set-show-modal="value => showTodoUpdateModal = value"
      />
    </div>
</template>