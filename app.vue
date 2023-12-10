<script setup lang="ts">
import axios from "axios";
import ColorButton from "~/components/common/ColorButton.vue";
import {ColorButtonType} from "~/enum/ColorButtonType";
import {storeToRefs} from "pinia";
import useAuthStore from "~/stores/auth";


axios.defaults.baseURL = useRuntimeConfig().public['axiosHost'] as string

const route = useRoute();
const router = useRouter();
const {logout} = useAuthStore()
const {authFlag} = storeToRefs(useAuthStore())

const tokenValidate = () => {
  const storedAccessToken = localStorage.getItem('accessToken');

  if (storedAccessToken) {
    authFlag.value = true
  }
}

const logoutButton = () => {
  const result = confirm("로그아웃 하시겠습니까?");

  if (result) {
    logout()
  }
}

onMounted(tokenValidate)
onUpdated(tokenValidate)

</script>

<template>
  <NuxtPage/>
  <ColorButton v-if="authFlag"
               class="logout-button"
               :type="ColorButtonType.NEGATIVE"
               text="EXIT"
               @click="logoutButton"
  />
</template>
