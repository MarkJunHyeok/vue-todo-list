<script setup lang="ts">
import TabBar from "~/components/todo/TabBar.vue";
import ColorButton from "~/components/common/ColorButton.vue";
import {ColorButtonType} from "~/enum/ColorButtonType";
import CalendarModal from "~/components/common/CalendarModal.vue";
import type {IGetTodoList, ITodo} from "~/models/todo.model";
import {TodoType, toTodoType} from "~/enum/todo/TodoType";
import {TodoStatus, toTodoStatus} from "~/enum/todo/TodoStatus";
import ControlMenu from "~/components/common/ControlMenu.vue";
import useAxios from "~/composables/useAxios";
import {getTodoList} from "~/api/todo.api";

const controlMenuLeft = [{
  name: '전체',
  value: 'ALL'
}, {
  name: '완료',
  value: TodoStatus[TodoStatus.COMPLETED]
}, {
  name: '진행중',
  value: TodoStatus[TodoStatus.IN_PROGRESS]
}]

const controlMenuRight = [{
  name: '전체',
  value: 'ALL'
}, {
  name: '중요',
  value: TodoType[TodoType.IMPORTANT]
}, {
  name: '여유',
  value: TodoType[TodoType.LEISURELY]
}]

const {res, isLoading, execute} = useAxios<IGetTodoList>()

const date = ref(new Date())
const showCalendar = ref(false);
const showTodoCreateModal = ref(false);
const todoList = ref<ITodo[]>()
const leftControlMenuDefaultOption = ref<string>('ALL');
const rightControlMenuDefaultOption = ref<string>('ALL');

watch(res,
    () => {
      todoList.value = []
      todoList.value = res.value!.data.map(it => {
        return {
          ...it,
          type: toTodoType(it.type),
          status: toTodoStatus(it.status),
          createdAt: new Date(it.createdAt),
        };
      })
    })

onMounted(() => {
  doGetTodoList();
});

watch([date, leftControlMenuDefaultOption, rightControlMenuDefaultOption], () => {
  doGetTodoList();
})


const handleTodoCreated = () => {
  setTimeout(() => {
    doGetTodoList();
  }, 100);
}

const setTodo = (todo: ITodo) => {
  const todoIndex = todoList.value!.findIndex(it => it.id === todo.id);
  if (todoIndex !== -1) {
    todoList.value![todoIndex] = {...todo};
  }
};

const deleteTodo = (todo: ITodo) => {
  const todoIndex = todoList.value!.findIndex(it => it.id === todo.id);
  if (todoIndex !== -1) {
    todoList.value!.splice(todoIndex, 1);
  }
};

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

const setLeftControlMenuDefaultOption = (value: string) => {
  leftControlMenuDefaultOption.value = value
}

const setRightControlMenuDefaultOption = (value: string) => {
  rightControlMenuDefaultOption.value = value
}

const doGetTodoList = () => {
  let statusString: string | null = leftControlMenuDefaultOption.value
  let typeString: string | null = rightControlMenuDefaultOption.value

  if (statusString === 'ALL') {
    statusString = null
  }
  if (typeString === 'ALL') {
    typeString = null
  }

  const year = date.value.getFullYear();
  const month = String(date.value.getMonth() + 1).padStart(2, '0');
  const day = String(date.value.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;

  execute(getTodoList({
    status: statusString,
    type: typeString,
    date: currentDate
  }))
}
</script>

<template>
  <body>
  <div class="main">
    <div>
      <TabBar :key="date">
        <template v-slot:leftButton>
          <ColorButton :type="ColorButtonType.DEFAULT" text="<" @click="decrementDate"/>
        </template>

        <template v-slot:centerText>
          <div :key="date" @click="onShowCalendar">
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

    <div class="menu_wrapper">
      <div class="left_col">
        <ControlMenu
            :default-option="leftControlMenuDefaultOption"
            :set-default-option="setLeftControlMenuDefaultOption"
            :sort-options="controlMenuLeft"
            :key="leftControlMenuDefaultOption"
        />
        <ControlMenu
            :default-option="rightControlMenuDefaultOption"
            :set-default-option="setRightControlMenuDefaultOption"
            :sort-options="controlMenuRight"
            :key="rightControlMenuDefaultOption"
        />
      </div>

      <div class="right_col">
        <ColorButton
            :type="ColorButtonType.POSITIVE"
            text="할일 추가"
            @click="showTodoCreateModal = true"
        />
        <TodoCreateModal
            :show-modal="showTodoCreateModal"
            :set-show-modal="value => showTodoCreateModal = value"
            @todoCreated="handleTodoCreated"
        />
      </div>
    </div>

    <div class="todo-list" ref="el">
      <div v-for="todo in todoList" :key="todo.id">
        <TodoItem
            :todo="todo"
            :set-todo="setTodo"
            :delete-todo="deleteTodo"
        />
      </div>
    </div>
  </div>
  </body>

  <TodoCreateModal/>
</template>

<style>
a {
}
</style>