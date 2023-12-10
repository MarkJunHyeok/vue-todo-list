import {defineStore} from "pinia";
import {useRouter} from "#app";

const useAuthStore = defineStore('auth', () => {
    const router = useRouter();

    const authFlag = ref(false)

    const logout = () => {
        authFlag.value = false

        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')

        window.location.href = '/login'
    }

    return {
        authFlag, logout
    };
})

export default useAuthStore