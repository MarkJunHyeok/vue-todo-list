import type {TodoType} from "~/enum/todo/TodoType";
import type {TodoStatus} from "~/enum/todo/TodoStatus";
import type {IListResponse} from "~/api/common.api";

export interface IGetTodoList extends IListResponse<ITodoRes[]> {
}

export interface ITodo {
    id: number | undefined
    description: string
    type: TodoType
    status: TodoStatus
    createdAt: Date | undefined
}

export interface ITodoRes {
    id: number
    description: string
    type: string
    status: string
    createdAt: string
}

export interface IGetTodoListParams {
    type: string | null
    status: string | null
    date: string
}
