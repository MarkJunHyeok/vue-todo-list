<script setup lang="ts">
import TabBar from "~/components/todo/TabBar.vue";
import ColorButton from "~/components/common/ColorButton.vue";
import {ColorButtonType} from "~/enum/ColorButtonType";
import CalendarModal from "~/components/common/CalendarModal.vue";

const date = ref(new Date())
const showCalendar = ref(false);

const onShowCalendar = () => {
  showCalendar.value = true
}
const incrementDate = () => {
  const currentDate = date.value;
  currentDate.setDate(currentDate.getDate() + 1)

  date.value = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  ;
}

const decrementDate = () => {
  const currentDate = date.value;
  currentDate.setDate(currentDate.getDate() - 1)

  date.value = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  ;
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
  </div>
  </body>
</template>

<style>
a {}
</style>