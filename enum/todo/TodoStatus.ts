export enum TodoStatus {
    IN_PROGRESS,
    COMPLETED
}

export function toTodoStatus(text: string) {
    if (!(text in TodoStatus)) {
        throw new Error(`LegalPersonNameType must be one of 'LEGL'..... `);
    }

    return TodoStatus[text as keyof typeof TodoStatus];
}