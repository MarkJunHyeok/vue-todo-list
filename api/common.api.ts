interface IResponseBase {
    code: string
    message: string
}

export interface IListResponse<T> extends IResponseBase {
    data: T
}