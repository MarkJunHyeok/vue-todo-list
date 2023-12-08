<script setup lang="ts">
import axios from "axios";

axios.defaults.baseURL = useRuntimeConfig().public['axiosHost'] as string

</script>

<template>
  <NuxtPage />
</template>
