import type {TodoType} from "~/enum/todo/TodoType";
import type {TodoStatus} from "~/enum/todo/TodoStatus";

export interface ITodo {
    id: number | undefined
    number: number
    description: string
    type: TodoType
    status: TodoStatus
    createdAt: Date
}