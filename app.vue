<script setup lang="ts">
import axios from "axios";
import ColorButton from "~/components/common/ColorButton.vue";
import {ColorButtonType} from "~/enum/ColorButtonType";
import {storeToRefs} from "pinia";
import useAuthStore from "~/stores/auth";


axios.defaults.baseURL = useRuntimeConfig().public['axiosHost'] as string

const route = useRoute();
const {logout}= useAuthStore()
const {authFlag}= storeToRefs(useAuthStore())

onMounted(() => {
  const storedAccessToken = localStorage.getItem('accessToken');
  const storedRefreshToken = localStorage.getItem('refreshToken');

  if (route.path === '/token' || (storedAccessToken || storedRefreshToken)) {
    authFlag.value = true
  }
})

const loginButton = () => {
  window.location.href = useRuntimeConfig().public['oauthHost'] as string;
}


</script>

<template>
  <div v-if="authFlag">
    <NuxtPage />
    <ColorButton
        class="logout-button"
        :type="ColorButtonType.NEGATIVE"
        text="EXIT"
        @click="logout"
    />
  </div>
  <div v-else class="auth_container">
    <div class="auth_img_div">
      <img src="~/assets/img/logo.png"  style="color:transparent">
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
