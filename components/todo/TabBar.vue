<script setup lang="ts">
</script>

<template>
  <div>
    <header>
      <div class="head_btn_left">
        <slot name="leftButton"/>
      </div>

      <div class="head_text">
        <slot name="centerText"/>
      </div>

      <div class="head_btn_right">
        <slot name="rightButton"/>
      </div>
    </header>
  </div>
</template>
