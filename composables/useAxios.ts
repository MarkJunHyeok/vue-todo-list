import { AxiosError, type AxiosPromise } from 'axios'
import useErrorHandler from './useErrorHandler'

const useAxios = <T extends any>(
  ignoreError: boolean = false,
) => {
  const data = ref<T>()
  const dataArr = ref<T[]>([])
  const status = ref<number>()
  const statusArr = ref<number[]>([])
  const isLoading = ref(false)
  const error = ref<AxiosError>()

  const handleError = (e: any) => {
    error.value = e as AxiosError
    if (!ignoreError) {
      useErrorHandler(e)
    }
  }

  const execute = async (promise: AxiosPromise<T>) => {
    data.value = undefined
    status.value = undefined
    isLoading.value = true
    error.value = undefined

    try {
      const res = await promise.catch(e => {
        handleError(e)
      })
      if (res) {
        data.value = res.data
        status.value = res.status
      }
    } catch (e) {
      handleError(e)
    }

    isLoading.value  = false
  };

  const executeArr = async (promise: AxiosPromise<T>[]) => {
    dataArr.value = []
    statusArr.value = []
    isLoading.value = true
    error.value = undefined

    try {
      const newDataArr: any = []
      const newStatusArr: number[] = []
      const results = await Promise.all(promise).catch(e => {
        handleError(e)
      });
      if (results) {
        results.forEach(res => {
          newDataArr.push(res.data)
          newStatusArr.push(res.status)
        });
        dataArr.value = newDataArr
        statusArr.value = newStatusArr
      }
    } catch (e) {
      handleError(e)
    }

    isLoading.value = false
  }

  const clear = () => {
    data.value  = undefined
    dataArr.value = []
    status.value = undefined
    statusArr.value = []
  }

  return {
    res: data,
    resArr: dataArr,
    status,
    statusArr,
    isLoading,
    error,
    execute,
    executeArr,
    clear,
  }
}

export default useAxios