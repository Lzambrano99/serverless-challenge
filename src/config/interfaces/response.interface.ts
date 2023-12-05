export interface IResponseSuccess {
    status: "success"
    code: number
    data?: object | boolean
}

export interface IResponseError {
    status: "error",
    timestamp?: string
    message: string
}