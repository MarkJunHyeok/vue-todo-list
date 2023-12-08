<script setup lang="ts">
import type {PropType} from "@vue/runtime-core";
import type {ITodo} from "~/models/todo.model";
import TodoTypeBox from "~/components/common/TodoTypeBox.vue";
import ColorButton from "~/components/common/ColorButton.vue";
import {ColorButtonType} from "~/enum/ColorButtonType";
import {TodoStatus} from "~/enum/todo/TodoStatus";
import useAxios from "~/composables/useAxios";
import {completeTodo, unCompleteTodo} from "~/api/todo.api";
import TodoUpdateModal from "./TodoUpdateModal.vue";

const props = defineProps({
  todo: {type : Object as PropType<ITodo>, required: true},
  setTodo: {type: Function as PropType<(todo: ITodo) => void>, required: true},
  deleteTodo: {type: Function as PropType<(todo: ITodo) => void>, required: true},
});

const {execute, isLoading} = useAxios();

const showTodoUpdateModal = ref(false);

const doCompleteTodo = () => {
  execute(completeTodo(props.todo.id!))

  props.setTodo({...props.todo, status : TodoStatus.COMPLETED})
}

const doUnCompleteTodo = () => {
  execute(unCompleteTodo(props.todo.id!))

  props.setTodo({...props.todo, status : TodoStatus.IN_PROGRESS})
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
          :set-todo="props.setTodo!"
          :delete-todo="props.deleteTodo!"
          :show-modal="showTodoUpdateModal"
          :set-show-modal="value => showTodoUpdateModal = value"
      />
    </div>
</template>