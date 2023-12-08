import axios, {type AxiosPromise } from 'axios'
import type {ICreateTodoReq, IGetTodoList, IGetTodoListParams, IUpdateTodoReq} from "~/models/todo.model";

const url = '/todo'

export const getTodoList = (params: IGetTodoListParams): AxiosPromise<IGetTodoList> => {
  return axios.get(url, { params })
}

export const createTodo = (req: ICreateTodoReq): AxiosPromise => {
  return axios.post(url, req)
}

export const updateTodo = (id: number, req: IUpdateTodoReq): AxiosPromise => {
  return axios.put(`${url}/${id}`, req)
}

export const deleteTodo = (id: number): AxiosPromise => {
  return axios.delete(`${url}/${id}`)
}

export const completeTodo = (id: number): AxiosPromise => {
  return axios.patch(`${url}/complete/${id}`)
}

export const unCompleteTodo = (id: number): AxiosPromise => {
  return axios.patch(`${url}/un-complete/${id}`)
}