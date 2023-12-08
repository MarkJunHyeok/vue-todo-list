<script setup lang="ts">
import {TodoType} from "~/enum/todo/TodoType";
import ControlMenu from "~/components/common/ControlMenu.vue";
import ColorButton from "~/components/common/ColorButton.vue";
import {ColorButtonType} from "~/enum/ColorButtonType";
import {createTodo, deleteTodo, updateTodo} from "~/api/todo.api";
import useAxios from "~/composables/useAxios";
import type {PropType} from "@vue/runtime-core";
import type {ITodo} from "~/models/todo.model";

const types = [{
  name: '매우 중요',
  value: TodoType[TodoType.VERY_IMPORTANT]
}, {
  name: '중요',
  value: TodoType[TodoType.IMPORTANT]
}, {
  name: '그럭저럭',
  value: TodoType[TodoType.SO_SO]
}, {
  name: '여유',
  value: TodoType[TodoType.IMPORTANT]
}, {
  name: '매우 여유',
  value: TodoType[TodoType.VERY_LEISURELY]
}]

const props = defineProps({
  todo: {type: Object as PropType<ITodo>, required: true},
  showModal: {type: Boolean, required: true},
  setShowModal: {type: Function as PropType<(value: boolean) => void>, required: true},
});

const {execute, isLoading} = useAxios();

const description = ref<string>(props.todo.description);
const type = ref<string>(TodoType[props.todo.type]);

const doUpdateTodo = () => {
  props.setShowModal(false)

  execute(updateTodo(props.todo.id!, {
    description: description.value!,
    type: type.value
  }))
}

const doDeleteTodo = () => {
  props.setShowModal(false)

  execute(deleteTodo(props.todo.id!))
}

const closeModal = (event: MouseEvent) => {
  const clickedElement = event.target as HTMLElement;

  if (clickedElement.classList.contains("todo-create-modal")) {
    props.setShowModal(false);
  }
};
</script>

<template>
  <div>
    <div v-if="showModal" class="todo-create-modal" @click="closeModal">
      <div class="todo-create-modal-content">
        <h2>TODO 수정</h2>
        <form @submit.prevent="doUpdateTodo">
          <div class="todo-create-form-group">
            <label for="taskDescription">TODO Text</label>
            <input v-model="description" type="text" id="taskDescription" required>
          </div>
          <div class="todo-create-form-group">
            <label for="taskType">TODO Type</label>
            <ControlMenu id="taskType"
                         :set-default-option="value => type = value"
                         :default-option="type"
                         :sort-options="types"
            />
          </div>
          <div class="todo-create-form-group">
            <div class="todo-create-modal-button-group">
              <ColorButton
                  :type="ColorButtonType.POSITIVE"
                  text="수정"
              />
              <ColorButton
                  @click="doDeleteTodo"
                  :type="ColorButtonType.NEGATIVE"
                  text="삭제"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
a{}
</style>