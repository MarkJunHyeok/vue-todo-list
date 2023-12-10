import {defineStore} from "pinia";

const useAuthStore = defineStore('auth', () => {
    const authFlag = ref(false)

    const logout = () => {
        const result = confirm("로그아웃 하시겠습니까?");

        if(result){
            authFlag.value = false

            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }

    return {
        authFlag, logout
    };
})

export default useAuthStore