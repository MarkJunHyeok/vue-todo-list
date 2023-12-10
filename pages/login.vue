<script setup lang="ts">

import {ColorButtonType} from "~/enum/ColorButtonType";
import ColorButton from "~/components/common/ColorButton.vue";

const loginButton = () => {
  window.location.href = useRuntimeConfig().public['oauthHost'] as string;
}
</script>

<template>
  <div class="auth_container">
    <div class="auth_img_div">
      <img src="~/assets/img/logo.png" style="color:transparent">
      <div class="auth_text_div">
        <h1>오늘을 기록하세요</h1>
        <h2>지금 시작하세요</h2>

        <ColorButton
            :type="ColorButtonType.BLACK"
            text="Login With Github"
            @click="loginButton"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>