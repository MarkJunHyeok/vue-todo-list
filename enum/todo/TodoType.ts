import {TodoStatus} from "~/enum/todo/TodoStatus";

export enum TodoType {
    VERY_IMPORTANT,
    IMPORTANT,
    SO_SO,
    LEISURELY,
    VERY_LEISURELY
}

export function toTodoType(text: string) {
    if (!(text in TodoType)) {
        throw new Error(`LegalPersonNameType must be one of 'LEGL'..... `);
    }

    return TodoType[text as keyof typeof TodoType];
}