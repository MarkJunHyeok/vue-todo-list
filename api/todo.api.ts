import axios, {type AxiosPromise } from 'axios'
import type {ICreateTodoReq, IGetTodoList, IGetTodoListParams} from "~/models/todo.model";

const url = '/todo'

export const getTodoList = (params: IGetTodoListParams): AxiosPromise<IGetTodoList> => {
  return axios.get(url, { params })
}

export const createTodo = (req: ICreateTodoReq): AxiosPromise<IGetTodoList> => {
  return axios.post(url, req)
}