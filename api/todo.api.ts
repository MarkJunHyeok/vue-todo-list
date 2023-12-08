import axios, {type AxiosPromise } from 'axios'
import type {IGetTodoList, IGetTodoListParams} from "~/models/todo.model";

const url = '/todo'

export const getTodoList = (params: IGetTodoListParams): AxiosPromise<IGetTodoList> => {
  return axios.get(url, { params })
}