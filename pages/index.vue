<script setup lang="ts">
import TabBar from "~/components/todo/TabBar.vue";
import ColorButton from "~/components/common/ColorButton.vue";
import {ColorButtonType} from "~/enum/ColorButtonType";
import CalendarModal from "~/components/common/CalendarModal.vue";
import type {ITodo} from "~/models/todo.model";
import {TodoType} from "~/enum/todo/TodoType";
import {TodoStatus} from "~/enum/todo/TodoStatus";
import InfiniteLoading from "vue-infinite-loading";
import { useInfiniteScroll } from '@vueuse/core'

const date = ref(new Date())
const showCalendar = ref(false);
const todoList = ref<ITodo[]>([
  {
    id: 1,
    number: 1,
    description: '매우 중요한 작업',
    type: TodoType.VERY_IMPORTANT,
    status: TodoStatus.IN_PROGRESS,
    createdAt: new Date()
  },
  {
    id: 2,
    number: 2,
    description: '완료된 작업',
    type: TodoType.SO_SO,
    status: TodoStatus.COMPLETED,
    createdAt: new Date()
  },
  {
    id: 3,
    number: 3,
    description: '중요한 작업',
    type: TodoType.IMPORTANT,
    status: TodoStatus.IN_PROGRESS,
    createdAt: new Date()
  },
  {
    id: 4,
    number: 4,
    description: '보통 작업',
    type: TodoType.SO_SO,
    status: TodoStatus.IN_PROGRESS,
    createdAt: new Date()
  },
  {
    id: 5,
    number: 5,
    description: '한가한 작업',
    type: TodoType.LEISURELY,
    status: TodoStatus.IN_PROGRESS,
    createdAt: new Date()
  },
  {
    id: 6,
    number: 6,
    description: '매우 한가한 작업',
    type: TodoType.VERY_LEISURELY,
    status: TodoStatus.COMPLETED,
    createdAt: new Date()
  },
])

const el = ref<HTMLElement | null>(null)

useInfiniteScroll(
    el,
    () => {
      const newItems: ITodo[] = [
        ...todoList.value
      ];
      todoList.value = [...todoList.value, ...newItems];
    },
    { distance: 10 }
)

const onShowCalendar = () => {
  showCalendar.value = true
}
const incrementDate = () => {
  const currentDate = date.value;
  currentDate.setDate(currentDate.getDate() + 1)

  date.value = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
}

const decrementDate = () => {
  const currentDate = date.value;
  currentDate.setDate(currentDate.getDate() - 1)

  date.value = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
}
</script>

<template>
  <body>
  <div class="main">
    <div>
      <TabBar>
        <template v-slot:leftButton>
          <ColorButton :type="ColorButtonType.DEFAULT" text="<" @click="decrementDate"/>
        </template>

        <template v-slot:centerText>
          <div @click="onShowCalendar">
            {{ date.getFullYear() }}년 {{ date.getMonth() + 1 }}월 {{ date.getDate() }}일
          </div>
        </template>

        <template v-slot:rightButton>
          <ColorButton :type="ColorButtonType.DEFAULT" text=">" @click="incrementDate"/>
        </template>
      </TabBar>
    </div>

    <div>
      <CalendarModal
          :set-date="value => date = value"
          :date="date"
          :show-calendar="showCalendar"
          :set-show-calendar="value => showCalendar = value"
      />
    </div>

    <div class="todo-list" ref="el">
      <div v-for="todo in todoList" :key="todo.id">
        <TodoItem :todo="todo"/>
      </div>
    </div>
  </div>
  </body>
</template>

<style>
a {
}
</style>