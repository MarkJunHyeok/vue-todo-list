<script setup lang="ts">
import {TodoType} from "~/enum/todo/TodoType";
import ControlMenu from "~/components/common/ControlMenu.vue";
import ColorButton from "~/components/common/ColorButton.vue";
import {ColorButtonType} from "~/enum/ColorButtonType";
import {createTodo} from "~/api/todo.api";
import useAxios from "~/composables/useAxios";
import type {PropType} from "@vue/runtime-core";

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
  showModal: {type: Boolean, required: true},
  setShowModal: {type: Function as PropType<(value: boolean) => void>, required: true},
});

const emit = defineEmits(['todoCreated']);

const {execute, isLoading} = useAxios();

const description = ref<string>();
const type = ref<string>(TodoType[TodoType.SO_SO]);

const doCreateTodo = () => {
  props.setShowModal(false)

  execute(createTodo({
    description: description.value!,
    type: type.value
  }))

  description.value = undefined
  type.value = 'SO_SO'

  emit('todoCreated')
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
        <h2>TODO 생성</h2>
        <form @submit.prevent="doCreateTodo">
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
                  text="할일 추가"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
a {
}
</style>