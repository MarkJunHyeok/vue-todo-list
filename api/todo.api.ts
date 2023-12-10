import axios, {type AxiosPromise} from 'axios'
import type {ICreateTodoReq, IGetTodoList, IGetTodoListParams, IUpdateTodoReq} from "~/models/todo.model";
import {accessHeader} from "~/api/common.api";

const url = '/todo'

export const getTodoList = (params: IGetTodoListParams): AxiosPromise<IGetTodoList> => {
    return axios.get(url, {
        params, headers: accessHeader()
    })
}

export const createTodo = (req: ICreateTodoReq): AxiosPromise => {
    return axios.post(url, req, {headers: accessHeader()})
}

export const updateTodo = (id: number, req: IUpdateTodoReq): AxiosPromise => {
    return axios.put(`${url}/${id}`, req, {headers: accessHeader()})
}

export const deleteTodo = (id: number): AxiosPromise => {
    return axios.delete(`${url}/${id}`, {headers: accessHeader()})
}

export const completeTodo = (id: number): AxiosPromise => {
    return axios.patch(`${url}/complete/${id}`, null, {headers: accessHeader()})
}

export const unCompleteTodo = (id: number): AxiosPromise => {
    return axios.patch(`${url}/un-complete/${id}`, null, {headers: accessHeader()})
}