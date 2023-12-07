<script setup lang="ts">
import type {PropType} from "@vue/runtime-core";

const props = defineProps({
  showCalendar: {type: Boolean, required: true},
  setShowCalendar: {type: Function as PropType<(showCalendar: Boolean) => void>, required: true},
  date: {type: Date, required: true},
  setDate: {type: Function as PropType<(date: Date) => void>, required: true}
});

const currentDate = ref(props.date)

const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth());
const calendar = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  const weeks: (Date | undefined)[][] = [];
  let currentWeek: (Date | undefined)[] = [];

  for (let i = -1; i < firstDay.getDay() - 1; i++) {
    currentWeek.push(undefined);
  }

  for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(new Date(day));
  }

  while (currentWeek.length < 7) {
    currentWeek.push(undefined);
  }

  weeks.push(currentWeek);
  return weeks;
});


const prevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
};

const applyDate = (date: Date) => {
  props.setDate(date)
  props.setShowCalendar(false)
}

const closeModal = (event: MouseEvent) => {
  const clickedElement = event.target as HTMLElement;

  if (clickedElement.classList.contains("modal")) {
    props.setShowCalendar(false);
  }
};

watchEffect(() => {
  if (props.showCalendar) {
    currentDate.value = props.date;
  }
});
</script>

<template>
  <div v-if="props.showCalendar" class="modal" @click="closeModal">
    <div class="modal-content">
      <div class="calendar">

        <div class="calendar-header">
          <button @click="prevMonth">&lt;</button>
          {{ currentYear }}년 {{ currentMonth + 1 }}월
          <button @click="nextMonth">&gt;</button>
        </div>
        <table>
          <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="week in calendar" :key="week">
            <td v-for="day in week" :key="day">
              <button @click="applyDate(day!)">{{ day?.getDate() }}</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
