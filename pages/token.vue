<script setup lang="ts">
const route = useRoute();

const router = useRouter();

onMounted(() => {
  const accessToken = route.query.accessToken as string;
  const refreshToken = route.query.refreshToken as string;

  // 쿼리 파라미터를 로컬 스토리지에 저장
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  const storedAccessToken = localStorage.getItem('accessToken');
  const storedRefreshToken = localStorage.getItem('refreshToken');

  if(storedAccessToken && storedRefreshToken) {
    router.push("/")
  } else {
    alert("로그인 중 에러가 발생했습니다.")

    router.push("/")
  }
});
</script>
