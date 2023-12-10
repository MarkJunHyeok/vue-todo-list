import { AxiosError } from "axios"
import {storeToRefs} from "pinia";
import useAuthStore from "~/stores/auth";

interface IErrorData {
  message: string
  data: string
  error: string
}

const useErrorHandler = (
  error: AxiosError,
  options?: {
    badRequestMessage?: string
    unauthorizedMessage?: string
    ignoreNotFound?: boolean
    notFoundMessage?: string
    conflictMessage?: string
  },
) => {
  const { logout} = useAuthStore();


  const warningNotification = (message: string) => alert(message)

  const errorNotification = (message: string) => alert(message)
  
  const getErrorMessage = (errorData: IErrorData) => {
    return errorData.message || errorData.data || errorData.error || '오류가 발생하였습니다.'
  }
  
  if (!error?.response?.status) {
    if (error?.message) {
      errorNotification(error.message)
    }
    return
  }

  const errorData = error.response?.data as IErrorData

  switch (error.response.status) {
    case 400:
      warningNotification(
        options?.badRequestMessage ||
        getErrorMessage(errorData)
      )
      break
    case 401:
      warningNotification('권한이 없습니다.');
      logout()
      break
    case 403:
      warningNotification('권한이 없습니다.');
      logout()
      break
    case 404:
      if (!options?.ignoreNotFound) {
        warningNotification(
          options?.notFoundMessage ||
          '데이터가 없습니다.'
        )
      }
      break
    case 409:
      warningNotification(
        options?.conflictMessage ||
        getErrorMessage(errorData)
      )
      break
    default:
      errorNotification(
        getErrorMessage(errorData)
      )
  }
}

export default useErrorHandler