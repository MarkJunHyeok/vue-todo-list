<script setup lang="ts">
import {storeToRefs} from "pinia";
import useAuthStore from "~/stores/auth";

const route = useRoute();
const router = useRouter();

const {authFlag} = storeToRefs(useAuthStore())


onMounted(() => {
  const accessToken = route.query.accessToken as string;
  const refreshToken = route.query.refreshToken as string;

  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  const storedAccessToken = localStorage.getItem('accessToken');
  const storedRefreshToken = localStorage.getItem('refreshToken');

  if (storedAccessToken && storedRefreshToken) {
    authFlag.value = true

    router.push("/")
  } else {
    alert("로그인 중 에러가 발생했습니다.")

    authFlag.value = false

    router.push("/")
  }
});
</script>
